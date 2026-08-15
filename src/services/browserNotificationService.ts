import type { Notification } from "../types/Notification";
import {
  requestNotificationPermission as requestNativePermission,
  syncActiveNotifications,
} from "./nativeNotificationService";

export async function requestNotificationPermission() {
  return requestNativePermission();
}

export function syncBrowserNotifications(notifications: Notification[]) {
  syncActiveNotifications(notifications);
}