import type { Character } from "../types/Character";
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

let isChannelInitialized = false;

/**
 * Initialize high-priority notification channels for Android
 */
export async function initializeNotificationChannels(): Promise<void> {
  if (isChannelInitialized || !isTauriEnvironment()) return;

  try {
    const channels = await TauriNotification.channels();
    const existing = channels.find((c) => c.id === ANDROID_CHANNEL_ID);

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
    console.debug("Notification channel initialization skipped or not supported on this platform:", err);
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
      return "default";
    }
  }

  if (typeof window !== "undefined" && "Notification" in window) {
    return window.Notification.permission as PermissionState;
  }

  return "denied";
}

/**
 * Request notification permission from the OS or browser
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (isTauriEnvironment()) {
    try {
      let granted = await TauriNotification.isPermissionGranted();
      if (!granted) {
        const status = await TauriNotification.requestPermission();
        granted = status === "granted";
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

  if (typeof window !== "undefined" && "Notification" in window) {
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
 * Send an immediate or scheduled native notification
 */
export async function sendNativeNotification(options: NotificationOptions): Promise<void> {
  const { title, body, scheduledAt } = options;

  if (isTauriEnvironment()) {
    try {
      await initializeNotificationChannels();
      const payload: TauriNotification.Options = {
        title,
        body,
        channelId: ANDROID_CHANNEL_ID,
      };

      if (scheduledAt && scheduledAt > new Date()) {
        payload.schedule = TauriNotification.Schedule.at(scheduledAt, false, true);
      }

      TauriNotification.sendNotification(payload);
    } catch (err) {
      console.warn("Tauri notification failed, falling back to Web Notification:", err);
      showBrowserFallback(title, body);
    }
    return;
  }

  // Web / PWA Fallback
  if (typeof window !== "undefined" && "Notification" in window) {
    if (window.Notification.permission === "granted") {
      if (scheduledAt && scheduledAt > new Date()) {
        const delay = scheduledAt.getTime() - Date.now();
        if (delay < 2147483647) {
          setTimeout(() => showBrowserFallback(title, body), delay);
        }
      } else {
        showBrowserFallback(title, body);
      }
    }
  }
}

function showBrowserFallback(title: string, body: string) {
  try {
    if (typeof window !== "undefined" && "Notification" in window && window.Notification.permission === "granted") {
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
export async function scheduleFutureCharacterAlerts(
  characters: Character[],
  settings?: { notifyOnWater?: boolean; notifyOnHarvest?: boolean; notifyOnWilt?: boolean }
): Promise<void> {
  const now = new Date();
  const notifyWater = settings?.notifyOnWater ?? true;
  const notifyHarvest = settings?.notifyOnHarvest ?? true;
  const notifyWilt = settings?.notifyOnWilt ?? true;

  for (const char of characters) {
    if (!char.plantedBerryId || !char.plantedAt) continue;

    // 💧 Next Water schedule
    if (notifyWater && char.nextWaterAt) {
      const waterDate = new Date(char.nextWaterAt);
      if (waterDate > now) {
        sendNativeNotification({
          title: "💧 Water Needed!",
          body: `${char.name}'s berry needs watering now.`,
          scheduledAt: waterDate,
          id: `${char.id}-water-${char.plantedAt}`,
        });
      }
    }

    // 🌾 Harvest schedule
    if (notifyHarvest && char.harvestAt) {
      const harvestDate = new Date(char.harvestAt);
      if (harvestDate > now) {
        sendNativeNotification({
          title: "🌾 Harvest Ready!",
          body: `${char.name}'s crop is ripe and ready to pick!`,
          scheduledAt: harvestDate,
          id: `${char.id}-harvest-${char.plantedAt}`,
        });
      }
    }

    // 🍂 Wilt schedule
    if (notifyWilt && char.wiltAt) {
      const wiltDate = new Date(char.wiltAt);
      if (wiltDate > now) {
        sendNativeNotification({
          title: "🍂 Berry Wilted",
          body: `${char.name}'s crop has wilted.`,
          scheduledAt: wiltDate,
          id: `${char.id}-wilt-${char.plantedAt}`,
        });
      }
    }
  }
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
