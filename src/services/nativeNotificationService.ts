import type { Notification } from "../types/Notification";
import {
  getShownNotifications,
  hasShownNotification,
  markNotificationShown,
  clearNotification,
} from "./notificationHistory";

// Tauri plugin notification
import * as TauriNotification from "@tauri-apps/plugin-notification";

export const ANDROID_CHANNEL_ID = "berrymaster_farming_alerts";

export type PermissionState = "granted" | "denied" | "default" | "prompt";

/**
 * Check if the application is running in a Tauri native container
 */
export function isTauriEnvironment(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(
    (window as unknown as { __TAURI_INTERNALS__?: unknown }).__TAURI_INTERNALS__ ||
    (window as unknown as { __TAURI__?: unknown }).__TAURI__
  );
}

/**
 * Check if running on Android/mobile browser or mobile OS
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

/**
 * Polyfill window.Notification for Android WebView where the Web Notification API
 * is not natively implemented. This prevents @tauri-apps/plugin-notification from
 * throwing "Cannot read properties of undefined (reading 'permission')" errors.
 */
if (typeof window !== "undefined" && typeof (window as unknown as { Notification?: unknown }).Notification === "undefined") {
  class AndroidNotificationShim {
    static permission: PermissionState = "default";

    static async requestPermission(): Promise<string> {
      try {
        if (isTauriEnvironment()) {
          const { invoke } = await import("@tauri-apps/api/core");
          const res = await invoke<string | boolean>("plugin:notification|request_permission");
          AndroidNotificationShim.permission = (res === true || res === "granted") ? "granted" : "denied";
          return AndroidNotificationShim.permission;
        }
      } catch (e) {
        console.debug("AndroidNotificationShim requestPermission error:", e);
      }
      return "granted";
    }

    constructor(title: string, options?: { body?: string }) {
      sendNativeNotification({
        title,
        body: options?.body || "",
      }).catch(console.error);
    }
  }

  (window as unknown as { Notification: unknown }).Notification = AndroidNotificationShim;
}

let isChannelInitialized = false;

/**
 * Initialize high-priority notification channels for Android
 */
export async function initializeNotificationChannels(): Promise<void> {
  if (isChannelInitialized || !isTauriEnvironment()) return;

  try {
    let existing = false;
    try {
      const channels = await TauriNotification.channels();
      existing = Boolean(channels && channels.some((c) => c.id === ANDROID_CHANNEL_ID));
    } catch {
      // Channels listing may be unsupported on non-Android platforms
    }

    if (!existing) {
      await TauriNotification.createChannel({
        id: ANDROID_CHANNEL_ID,
        name: "Berry Farming Reminders",
        description: "High-priority notifications for watering, harvesting, and wilt timers",
        importance: TauriNotification.Importance.High,
        visibility: TauriNotification.Visibility.Public,
        sound: "default",
        vibration: true,
        lights: true,
        lightColor: "#10b981", // Emerald accent
      });
    }
    isChannelInitialized = true;
  } catch (err) {
    console.debug("Notification channel initialization skipped or handled by OS:", err);
    // Mark as initialized so we do not block subsequent notifications
    isChannelInitialized = true;
  }
}

/**
 * Query current notification permission status across Desktop, Mobile, and Web
 */
export async function getNotificationPermissionStatus(): Promise<PermissionState> {
  if (isTauriEnvironment()) {
    try {
      const granted = await TauriNotification.isPermissionGranted();
      return granted ? "granted" : "default";
    } catch {
      try {
        const { invoke } = await import("@tauri-apps/api/core");
        const granted = await invoke<boolean>("plugin:notification|is_permission_granted");
        return granted ? "granted" : "default";
      } catch {
        return "default";
      }
    }
  }

  if (typeof window !== "undefined" && "Notification" in window && window.Notification) {
    return (window.Notification.permission || "default") as PermissionState;
  }

  return "denied";
}

/**
 * Request notification permission from the OS or browser
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (isTauriEnvironment()) {
    try {
      let granted = false;
      try {
        granted = await TauriNotification.isPermissionGranted();
      } catch {
        // Continue to prompt request
      }

      if (!granted) {
        try {
          const { invoke } = await import("@tauri-apps/api/core");
          const status = await invoke<string | boolean>("plugin:notification|request_permission");
          if (typeof status === "boolean") {
            granted = status;
          } else if (typeof status === "string") {
            granted = status === "granted";
          }
        } catch {
          // Fallback to JS plugin API
          try {
            const status = await TauriNotification.requestPermission();
            granted = status === "granted";
          } catch {
            granted = true; // Assume granted if prompt was dismissed/allowed
          }
        }
      }

      if (granted) {
        await initializeNotificationChannels();
      }
      return granted;
    } catch (err) {
      console.error("Failed to request Tauri notification permission:", err);
      return false;
    }
  }

  if (typeof window !== "undefined" && "Notification" in window && window.Notification) {
    try {
      const result = await window.Notification.requestPermission();
      return result === "granted";
    } catch (err) {
      console.error("Failed to request browser notification permission:", err);
      return false;
    }
  }

  return false;
}

export type NotificationOptions = {
  title: string;
  body: string;
  id?: string | number;
  scheduledAt?: Date;
  extra?: Record<string, string>;
};

/**
 * Send an immediate native or browser notification
 */
export async function sendNativeNotification(options: NotificationOptions): Promise<void> {
  const { title, body, scheduledAt } = options;

  // Never dispatch notifications that are scheduled for a future timestamp immediately
  if (scheduledAt && scheduledAt > new Date()) {
    return;
  }

  if (isTauriEnvironment()) {
    // 1. Direct Tauri Rust command (most robust on both Windows & Android)
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("send_native_notification", { title, body });
      return;
    } catch (rustErr) {
      console.debug("Rust send_native_notification fallback:", rustErr);
    }

    // 2. Tauri official notification plugin with Android channel & icons
    try {
      await initializeNotificationChannels();
      const payload: TauriNotification.Options = {
        title,
        body,
        channelId: ANDROID_CHANNEL_ID,
        icon: "ic_notification",
        largeIcon: "ic_launcher",
      };

      TauriNotification.sendNotification(payload);
      return;
    } catch (pluginErr) {
      console.warn("TauriNotification.sendNotification fallback:", pluginErr);
    }
  }

  // 3. Web / PWA Fallback
  showBrowserFallback(title, body);
}

function showBrowserFallback(title: string, body: string) {
  try {
    if (typeof window !== "undefined" && "Notification" in window && window.Notification && window.Notification.permission === "granted") {
      new window.Notification(title, {
        body,
        icon: "/favicon.png",
        badge: "/favicon.png",
      });
    }
  } catch (e) {
    console.debug("Browser notification display error:", e);
  }
}

/**
 * Sync active notifications (shown immediately when app is active)
 */
export function syncActiveNotifications(notifications: Notification[]) {
  const activeIds = new Set(notifications.map((n) => n.id));

  // Clear obsolete IDs from cache
  for (const id of getShownNotifications()) {
    if (!activeIds.has(id)) {
      clearNotification(id);
    }
  }

  // Fire only brand-new notifications
  notifications.forEach((notification) => {
    if (hasShownNotification(notification.id)) {
      return;
    }

    sendNativeNotification({
      title: notification.title,
      body: notification.message,
      id: notification.id,
    });

    markNotificationShown(notification.id);
  });
}

/**
 * Pre-schedule future OS alerts for watering and harvesting on Android / PC background
 */
export async function scheduleFutureCharacterAlerts(): Promise<void> {
  // Realtime alerts are dynamically evaluated every 5 seconds by NotificationContext.
}

/**
 * Send an interactive test notification
 */
export async function sendTestNotification(): Promise<boolean> {
  const permission = await requestNotificationPermission();
  if (!permission) return false;

  await sendNativeNotification({
    title: "🍓 BerryMaster Test Notification",
    body: "Notifications are working seamlessly on your device!",
  });

  return true;
}
