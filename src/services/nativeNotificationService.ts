import type { Notification } from "../types/Notification";
import {
  getShownNotifications,
  hasShownNotification,
  markNotificationShown,
  clearNotification,
} from "./notificationHistory";

// Tauri plugin notification
import * as TauriNotification from "@tauri-apps/plugin-notification";

export const ANDROID_CHANNEL_ID = "berrymaster_alerts_v3";

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
 * Initialize high-priority notification channels for Android.
 * Sets Importance.High (4) to guarantee heads-up pop-up banner, sound, and vibration.
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
        name: "BerryMaster Alerts",
        description: "Heads-up notifications for watering, harvesting, and wilt timers",
        importance: TauriNotification.Importance.High, // 4 = Heads-up banner + sound + vibration
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
 * Simple 32-bit positive integer hash for notification IDs (required by Android AlarmManager/NotificationManager)
 */
function toPositiveInt32(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash) % 2147483647 || Math.floor(Math.random() * 1000000) + 1;
}

/**
 * Send an immediate native or browser notification with heads-up display, sound, vibration, and custom icons.
 */
export async function sendNativeNotification(options: NotificationOptions): Promise<void> {
  const { title, body, scheduledAt, id } = options;

  // Never dispatch notifications that are scheduled for a future timestamp immediately
  if (scheduledAt && scheduledAt > new Date()) {
    return;
  }

  if (isTauriEnvironment()) {
    await initializeNotificationChannels();

    const numericId = typeof id === "number"
      ? id
      : typeof id === "string"
      ? toPositiveInt32(id)
      : Math.floor(Math.random() * 1000000) + 1;

    // 1. Invoke Tauri official notification plugin with full parameters (heads up, sound, vibration, monochrome icon, large launcher icon)
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("plugin:notification|notify", {
        options: {
          id: numericId,
          channelId: ANDROID_CHANNEL_ID,
          title,
          body,
          sound: "default",
          icon: "ic_notification",
          largeIcon: "ic_launcher",
          iconColor: "#10b981",
          autoCancel: true,
          visibility: TauriNotification.Visibility.Public,
        },
      });
      return;
    } catch (pluginErr) {
      console.debug("plugin:notification|notify invocation fallback:", pluginErr);
    }

    // 2. Direct Tauri Rust command fallback
    try {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("send_native_notification", { title, body });
      return;
    } catch (rustErr) {
      console.debug("Rust send_native_notification fallback:", rustErr);
    }

    // 3. Fallback to JS plugin API sendNotification
    try {
      TauriNotification.sendNotification({
        title,
        body,
        channelId: ANDROID_CHANNEL_ID,
        icon: "ic_notification",
        largeIcon: "ic_launcher",
      });
      return;
    } catch (err) {
      console.warn("Tauri sendNotification fallback error:", err);
    }
  }

  // 4. Web / PWA Fallback
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

const SCHEDULED_ALARMS_STORAGE_KEY = "berrymaster_scheduled_alarm_ids";

function loadScheduledAlarmIds(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(SCHEDULED_ALARMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return new Set(parsed);
      }
    }
  } catch {
    // fallback
  }
  return new Set();
}

function saveScheduledAlarmIds(ids: Set<number>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SCHEDULED_ALARMS_STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // ignore write errors
  }
}

/**
 * Deterministic integer ID slots for each character:
 * Slot 1: Water
 * Slot 2: Harvest
 * Slot 3: Wilt
 */
export function getCharacterAlertIds(characterId: string): {
  waterId: number;
  harvestId: number;
  wiltId: number;
} {
  const base = (toPositiveInt32(characterId) % 100000) * 10;
  return {
    waterId: base + 1,
    harvestId: base + 2,
    wiltId: base + 3,
  };
}

let isSchedulingAlarms = false;
let pendingScheduleCharacters: Array<{
  id: string;
  name: string;
  plantedBerryId?: string;
  nextWaterAt?: string;
  harvestAt?: string;
  wiltAt?: string;
}> | null = null;
let pendingScheduleSettings: {
  notifyOnWater?: boolean;
  notifyOnHarvest?: boolean;
  notifyOnWilt?: boolean;
} | undefined = undefined;

/**
 * Pre-schedule future OS alarms for watering, harvesting, and wilting on Android's AlarmManager.
 * This guarantees notifications pop up even when the BerryMaster app is completely closed / killed!
 */
export async function scheduleFutureCharacterAlerts(
  characters: Array<{
    id: string;
    name: string;
    plantedBerryId?: string;
    nextWaterAt?: string;
    harvestAt?: string;
    wiltAt?: string;
  }>,
  settings?: {
    notifyOnWater?: boolean;
    notifyOnHarvest?: boolean;
    notifyOnWilt?: boolean;
  }
): Promise<void> {
  if (!isTauriEnvironment()) return;

  if (isSchedulingAlarms) {
    pendingScheduleCharacters = characters;
    pendingScheduleSettings = settings;
    return;
  }

  isSchedulingAlarms = true;

  try {
    await initializeNotificationChannels();

    const now = new Date();
    const notifyWater = settings?.notifyOnWater ?? true;
    const notifyHarvest = settings?.notifyOnHarvest ?? true;
    const notifyWilt = settings?.notifyOnWilt ?? true;

    const futureAlerts: Array<{
      id: number;
      title: string;
      body: string;
      targetDate: Date;
    }> = [];

    characters.forEach((character) => {
      if (!character.plantedBerryId) return;

      const { waterId, harvestId, wiltId } = getCharacterAlertIds(character.id);

      // 💧 Water alert
      if (notifyWater && character.nextWaterAt) {
        const waterDate = new Date(character.nextWaterAt);
        if (waterDate > now) {
          futureAlerts.push({
            id: waterId,
            title: "💧 Water Needed",
            body: `${character.name} needs watering!`,
            targetDate: waterDate,
          });
        }
      }

      // 🌾 Harvest alert
      if (notifyHarvest && character.harvestAt) {
        const harvestDate = new Date(character.harvestAt);
        if (harvestDate > now) {
          futureAlerts.push({
            id: harvestId,
            title: "🌾 Harvest Ready",
            body: `${character.name}'s berry is ready to harvest!`,
            targetDate: harvestDate,
          });
        }
      }

      // 🍂 Wilt alert
      if (notifyWilt && character.wiltAt) {
        const wiltDate = new Date(character.wiltAt);
        if (wiltDate > now) {
          futureAlerts.push({
            id: wiltId,
            title: "🍂 Berry Wilted",
            body: `${character.name}'s berry has wilted!`,
            targetDate: wiltDate,
          });
        }
      }
    });

    const { invoke } = await import("@tauri-apps/api/core");

    // 1. Cancel obsolete alarms that are no longer needed
    const prevScheduledIds = loadScheduledAlarmIds();
    const newScheduledIds = new Set(futureAlerts.map((a) => a.id));
    const obsoleteIds = Array.from(prevScheduledIds).filter((id) => !newScheduledIds.has(id));

    if (obsoleteIds.length > 0) {
      try {
        await invoke("plugin:notification|cancel", {
          notifications: obsoleteIds,
        });
      } catch (cancelErr) {
        console.debug("Could not cancel obsolete alarms:", cancelErr);
      }
    }

    // 2. Prepare batch notifications payload
    const batchPayload = futureAlerts.map((alert) => ({
      id: alert.id,
      channelId: ANDROID_CHANNEL_ID,
      title: alert.title,
      body: alert.body,
      sound: "default",
      icon: "ic_notification",
      largeIcon: "ic_launcher",
      iconColor: "#10b981",
      autoCancel: true,
      isAutoCancel: true,
      visibility: TauriNotification.Visibility.Public,
      // allowWhileIdle: true allows waking up device in Doze mode when app is closed
      schedule: TauriNotification.Schedule.at(alert.targetDate, false, true),
    }));

    // 3. Dispatch atomic batch to native Android plugin (or parallel fallback)
    if (batchPayload.length > 0) {
      let batchSuccess = false;
      try {
        await invoke("plugin:notification|batch", {
          notifications: batchPayload,
        });
        batchSuccess = true;
      } catch (batchErr) {
        console.debug("plugin:notification|batch fallback to parallel notify:", batchErr);
      }

      if (!batchSuccess) {
        await Promise.all(
          batchPayload.map((notif) =>
            invoke("plugin:notification|notify", { options: notif }).catch((e) =>
              console.warn(`Failed to schedule individual alarm ${notif.id}:`, e)
            )
          )
        );
      }
    }

    // 4. Update stored IDs
    saveScheduledAlarmIds(newScheduledIds);
  } catch (err) {
    console.warn("scheduleFutureCharacterAlerts error:", err);
  } finally {
    isSchedulingAlarms = false;

    if (pendingScheduleCharacters) {
      const nextChars = pendingScheduleCharacters;
      const nextSettings = pendingScheduleSettings;
      pendingScheduleCharacters = null;
      pendingScheduleSettings = undefined;
      scheduleFutureCharacterAlerts(nextChars, nextSettings).catch(console.error);
    }
  }
}

/**
 * Send an interactive test notification with heads-up pop-up banner, sound, vibration, and Berry icon
 */
export async function sendTestNotification(): Promise<boolean> {
  const permission = await requestNotificationPermission();
  if (!permission) return false;

  await sendNativeNotification({
    title: "🍓 BerryMaster Test Notification",
    body: "Notifications are working with pop-up banner, sound & vibration!",
  });

  return true;
}
