import { isTauriEnvironment } from "../services/nativeNotificationService";

/**
 * Safely opens an external URL or direct download link in the system's default web browser.
 * Supports Tauri Desktop (Windows/macOS/Linux), Mobile (Android APK), and standard Web browsers.
 */
export async function openExternalUrl(url: string): Promise<void> {
  if (!url || typeof url !== "string") return;

  const targetUrl = url.trim();
  if (!targetUrl) return;

  // 1. Try Tauri Native Commands if inside Tauri environment
  if (isTauriEnvironment()) {
    // 1a. Try our custom native application command (100% reliable on Windows & Android)
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("open_external_url", { url: targetUrl });
      return;
    } catch (cmdErr) {
      console.warn("[BerryMaster] Custom open_external_url invoke failed, trying opener plugin:", cmdErr);
    }

    // 1b. Try official @tauri-apps/plugin-opener openUrl
    try {
      const { openUrl } = await import("@tauri-apps/plugin-opener");
      await openUrl(targetUrl);
      return;
    } catch (pluginErr) {
      console.warn("[BerryMaster] @tauri-apps/plugin-opener openUrl failed, trying direct plugin invoke:", pluginErr);
    }

    // 1c. Try direct IPC invoke to plugin:opener
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("plugin:opener|open_url", { url: targetUrl });
      return;
    } catch (directErr) {
      console.warn("[BerryMaster] plugin:opener|open_url direct invoke failed:", directErr);
    }
  }

  // 2. Web Browser / Dev Server Environment Fallback
  try {
    const w = window.open(targetUrl, "_blank", "noopener,noreferrer");
    if (!w || w.closed || typeof w.closed === "undefined") {
      const a = document.createElement("a");
      a.href = targetUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  } catch (err) {
    console.warn("[BerryMaster] window.open failed, falling back to location.assign:", err);
    try {
      window.location.assign(targetUrl);
    } catch (locErr) {
      console.error("[BerryMaster] Failed to open URL by any method:", locErr);
    }
  }
}
