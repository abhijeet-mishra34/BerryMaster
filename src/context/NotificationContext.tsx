import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Notification } from "../types/Notification";

import { generateNotifications } from "../services/notificationService";
import {
  requestNotificationPermission,
  syncBrowserNotifications,
} from "../services/browserNotificationService";

import { useCharacters } from "./CharacterContext";

type NotificationContextType = {
  notifications: Notification[];
  notificationCount: number;
};

const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { characters } = useCharacters();

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  // Ask for browser notification permission once.
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Refresh notifications continuously.
  useEffect(() => {
    const updateNotifications = () => {
      const latestNotifications =
        generateNotifications(characters);

      setNotifications(latestNotifications);

      syncBrowserNotifications(
        latestNotifications
      );
    };

    // Run immediately.
    updateNotifications();

    // Refresh every second.
    const interval = setInterval(
      updateNotifications,
      1000
    );

    return () => clearInterval(interval);
  }, [characters]);

  const notificationCount = useMemo(
    () => notifications.length,
    [notifications]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notificationCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(
    NotificationContext
  );

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
}