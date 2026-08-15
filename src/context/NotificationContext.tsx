import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { Notification } from "../types/Notification";
import { generateNotifications } from "../services/notificationService";
import {
  requestNotificationPermission,
  syncBrowserNotifications,
} from "../services/browserNotificationService";
import { scheduleFutureCharacterAlerts } from "../services/nativeNotificationService";
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

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const prevIdsRef = useRef<string>("");

  // Ask for browser / OS notification permission once on mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Pre-schedule future OS alerts whenever characters are updated
  useEffect(() => {
    scheduleFutureCharacterAlerts(characters);
  }, [characters]);

  // Refresh notifications efficiently without redundant React re-renders
  useEffect(() => {
    const updateNotifications = () => {
      const latestNotifications = generateNotifications(characters);
      const newIds = latestNotifications.map((n) => n.id).join(",");

      // Only update state when notifications actually change
      if (newIds !== prevIdsRef.current) {
        prevIdsRef.current = newIds;
        setNotifications(latestNotifications);
      }

      syncBrowserNotifications(latestNotifications);
    };

    // Run immediately
    updateNotifications();

    // Refresh every second
    const interval = setInterval(updateNotifications, 1000);

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
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
}