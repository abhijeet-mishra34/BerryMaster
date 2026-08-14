import type { Notification } from "../types/Notification";

import {
  getShownNotifications,
  hasShownNotification,
  markNotificationShown,
  clearNotification,
} from "./notificationHistory";

import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";

export async function requestNotificationPermission() {
  const permissionGranted =
    await isPermissionGranted();

  if (permissionGranted) {
    return;
  }

  await requestPermission();
}

function showNativeNotification(
  notification: Notification
) {
  sendNotification({
    title: notification.title,
    body: notification.message,
  });
}

export function syncBrowserNotifications(
  notifications: Notification[]
) {
  // IDs that are currently active
  const activeIds = new Set(
    notifications.map((n) => n.id)
  );

  // Remove IDs that are no longer active
  for (const id of getShownNotifications()) {
    if (!activeIds.has(id)) {
      clearNotification(id);
    }
  }

  // Show only brand-new notifications
  notifications.forEach((notification) => {
    if (hasShownNotification(notification.id)) {
      return;
    }

    showNativeNotification(notification);

    markNotificationShown(notification.id);
  });
}