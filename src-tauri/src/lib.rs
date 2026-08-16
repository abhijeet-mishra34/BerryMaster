#[cfg(desktop)]
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager,
};

#[tauri::command]
fn open_external_url(#[allow(unused_variables)] app: tauri::AppHandle, url: String) -> Result<(), String> {
    if url.trim().is_empty() {
        return Ok(());
    }

    #[cfg(target_os = "windows")]
    {
        // 1. Windows cmd /c start "" "<url>"
        if let Ok(_) = std::process::Command::new("cmd")
            .args(["/c", "start", "", &url])
            .spawn()
        {
            return Ok(());
        }

        // 2. Windows rundll32 fallback
        if let Ok(_) = std::process::Command::new("rundll32")
            .args(["url.dll,FileProtocolHandler", &url])
            .spawn()
        {
            return Ok(());
        }
    }

    #[cfg(target_os = "macos")]
    {
        if let Ok(_) = std::process::Command::new("open").arg(&url).spawn() {
            return Ok(());
        }
    }

    #[cfg(target_os = "linux")]
    {
        if let Ok(_) = std::process::Command::new("xdg-open").arg(&url).spawn() {
            return Ok(());
        }
    }

    #[cfg(mobile)]
    {
        use tauri_plugin_opener::OpenerExt;
        if let Err(e) = app.opener().open_url(&url, None::<&str>) {
            return Err(e.to_string());
        }
        return Ok(());
    }

    #[allow(unreachable_code)]
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[allow(unused_mut)]
    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![open_external_url]);

    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_window_state::Builder::default().build());
    }

    builder
        .setup(|app| {
            #[cfg(desktop)]
            {
                // Build System Tray Menu
                let show_i = MenuItem::with_id(app, "show", "Open BerryMaster", true, None::<&str>)?;
                let quit_i = MenuItem::with_id(app, "quit", "Quit BerryMaster", true, None::<&str>)?;
                let menu = Menu::with_items(app, &[&show_i, &quit_i])?;

                // Create System Tray
                let _tray = TrayIconBuilder::new()
                    .tooltip("BerryMaster — PokeMMO Companion")
                    .icon(app.default_window_icon().unwrap().clone())
                    .menu(&menu)
                    .show_menu_on_left_click(false)
                    .on_menu_event(|app, event| match event.id.as_ref() {
                        "show" => {
                            if let Some(window) = app.get_webview_window("main") {
                                let _ = window.show();
                                let _ = window.unminimize();
                                let _ = window.set_focus();
                            }
                        }
                        "quit" => {
                            app.exit(0);
                        }
                        _ => {}
                    })
                    .on_tray_icon_event(|tray, event| {
                        if let TrayIconEvent::Click {
                            button: MouseButton::Left,
                            button_state: MouseButtonState::Up,
                            ..
                        } = event
                        {
                            let app = tray.app_handle();
                            if let Some(window) = app.get_webview_window("main") {
                                let _ = window.show();
                                let _ = window.unminimize();
                                let _ = window.set_focus();
                            }
                        }
                    })
                    .build(app)?;
            }

            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            Ok(())
        })
        .on_window_event(|_window, _event| {
            #[cfg(desktop)]
            {
                if let tauri::WindowEvent::CloseRequested { api, .. } = _event {
                    api.prevent_close();
                    let _ = _window.hide();
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}