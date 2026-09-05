#[cfg(desktop)]
use std::sync::atomic::{AtomicBool, Ordering};
#[cfg(desktop)]
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager,
};

#[cfg(desktop)]
static MINIMIZE_TO_TRAY: AtomicBool = AtomicBool::new(true);

#[tauri::command]
fn set_minimize_to_tray(#[allow(unused_variables)] enabled: bool) {
    #[cfg(desktop)]
    {
        MINIMIZE_TO_TRAY.store(enabled, Ordering::Relaxed);
    }
}

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

#[tauri::command]
fn save_backup_file(filename: String, content: String) -> Result<String, String> {
    #[cfg(target_os = "windows")]
    {
        // 1. Try Windows native SaveFileDialog via PowerShell
        let safe_filename = filename.replace('\'', "");
        let ps_script = format!(
            "[System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms') | Out-Null; \
             $d = New-Object System.Windows.Forms.SaveFileDialog; \
             $d.Filter = 'JSON Files (*.json)|*.json|All Files (*.*)|*.*'; \
             $d.FileName = '{}'; \
             $d.Title = 'Save BerryMaster Backup'; \
             if ($d.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {{ $d.FileName }} else {{ 'CANCELLED' }}",
            safe_filename
        );

        if let Ok(output) = std::process::Command::new("powershell")
            .args(["-NoProfile", "-NonInteractive", "-Command", &ps_script])
            .output()
        {
            let path_str = String::from_utf8_lossy(&output.stdout).trim().to_string();
            if path_str == "CANCELLED" {
                return Ok("cancelled".to_string());
            }
            if !path_str.is_empty() && std::fs::write(&path_str, &content).is_ok() {
                return Ok(path_str);
            }
        }

        // 2. Fallback to saving to user's Downloads folder
        if let Ok(userprofile) = std::env::var("USERPROFILE") {
            let download_path = std::path::Path::new(&userprofile).join("Downloads").join(&filename);
            if std::fs::write(&download_path, &content).is_ok() {
                return Ok(download_path.to_string_lossy().to_string());
            }
        }
    }

    #[cfg(not(target_os = "windows"))]
    {
        if let Ok(home) = std::env::var("HOME") {
            let download_path = std::path::Path::new(&home).join("Downloads").join(&filename);
            if std::fs::write(&download_path, &content).is_ok() {
                return Ok(download_path.to_string_lossy().to_string());
            }
        }
    }

    if std::fs::write(&filename, &content).is_ok() {
        return Ok(filename);
    }

    Err("Unable to write backup file to disk".to_string())
}

#[tauri::command]
fn send_native_notification(app: tauri::AppHandle, title: String, body: String) -> Result<(), String> {
    use tauri_plugin_notification::NotificationExt;
    app.notification()
        .builder()
        .title(title)
        .body(body)
        .show()
        .map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[allow(unused_mut)]
    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            open_external_url,
            set_minimize_to_tray,
            save_backup_file,
            send_native_notification
        ]);

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
                    if MINIMIZE_TO_TRAY.load(Ordering::Relaxed) {
                        api.prevent_close();
                        let _ = _window.hide();
                    }
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}