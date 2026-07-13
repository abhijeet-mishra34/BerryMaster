const shownNotifications = new Set<string>();

/**
 * Returns whether a browser notification
 * has already been shown.
 */
export function hasShownNotification(id: string) {
  return shownNotifications.has(id);
}

/**
 * Marks a notification as shown.
 */
export function markNotificationShown(id: string) {
  shownNotifications.add(id);
}

/**
 * Removes a notification from the shown history.
 */
export function clearNotification(id: string) {
  shownNotifications.delete(id);
}

/**
 * Clears the entire notification history.
 */
export function clearAllNotifications() {
  shownNotifications.clear();
}

/**
 * Returns the internal notification history.
 * Used by browserNotificationService to keep
 * the shown notification history synchronized
 * with the currently active notifications.
 */
export function getShownNotifications() {
  return shownNotifications;
}