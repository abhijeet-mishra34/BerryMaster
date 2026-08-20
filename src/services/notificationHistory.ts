import { STORAGE_KEYS } from "../constants/storageKeys";

const STORAGE_KEY = STORAGE_KEYS.SHOWN_NOTIFICATIONS;

function loadShownNotifications(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return new Set(parsed);
      }
    }
  } catch {
    // fallback to empty set
  }
  return new Set();
}

function saveShownNotifications(set: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // ignore storage write errors
  }
}

const shownNotifications = loadShownNotifications();

/**
 * Returns whether a browser notification
 * has already been shown.
 */
export function hasShownNotification(id: string): boolean {
  return shownNotifications.has(id);
}

/**
 * Marks a notification as shown.
 */
export function markNotificationShown(id: string) {
  shownNotifications.add(id);
  saveShownNotifications(shownNotifications);
}

/**
 * Removes a notification from the shown history.
 */
export function clearNotification(id: string) {
  if (shownNotifications.has(id)) {
    shownNotifications.delete(id);
    saveShownNotifications(shownNotifications);
  }
}

/**
 * Clears the entire notification history.
 */
export function clearAllNotifications() {
  shownNotifications.clear();
  saveShownNotifications(shownNotifications);
}

/**
 * Returns the internal notification history.
 * Used by browserNotificationService to keep
 * the shown notification history synchronized
 * with the currently active notifications.
 */
export function getShownNotifications(): Set<string> {
  return shownNotifications;
}