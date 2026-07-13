import type { Notification } from "../types/Notification";

import {
  getShownNotifications,
  hasShownNotification,
  markNotificationShown,
  clearNotification,
} from "./notificationHistory";

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.warn(
      "This browser does not support notifications."
    );
    return;
  }

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
}

function showBrowserNotification(
  notification: Notification
) {
  if (Notification.permission !== "granted") {
    return;
  }

  new Notification(notification.title, {
    body: notification.message,
    icon: "/vite.svg",
    tag: notification.id,
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

    showBrowserNotification(notification);

    markNotificationShown(notification.id);
  });
}