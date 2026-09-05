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
import { useSettings } from "./SettingsContext";

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
  const { notifyOnWater, notifyOnHarvest, notifyOnWilt } = useSettings();

  const settings = useMemo(
    () => ({ notifyOnWater, notifyOnHarvest, notifyOnWilt }),
    [notifyOnWater, notifyOnHarvest, notifyOnWilt]
  );

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const prevIdsRef = useRef<string>("");

  // Ask for browser / OS notification permission once on mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Refresh notifications efficiently and pre-schedule OS background alarms
  useEffect(() => {
    const updateNotifications = () => {
      const latestNotifications = generateNotifications(characters, settings);
      const newIds = latestNotifications.map((n) => n.id).join(",");

      // Only update state when notifications actually change
      if (newIds !== prevIdsRef.current) {
        prevIdsRef.current = newIds;
        setNotifications(latestNotifications);
      }

      syncBrowserNotifications(latestNotifications);
      // Pre-schedule future OS alarms for closed-app execution
      scheduleFutureCharacterAlerts(characters, settings);
    };

    // Run immediately
    updateNotifications();

    // Refresh every 5 seconds for efficiency
    const interval = setInterval(updateNotifications, 5000);

    // Also register lifecycle listeners so alarms are always synced when user switches or closes the app
    const handleVisibilityOrUnload = () => {
      scheduleFutureCharacterAlerts(characters, settings);
    };

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityOrUnload);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("pagehide", handleVisibilityOrUnload);
      window.addEventListener("beforeunload", handleVisibilityOrUnload);
    }

    return () => {
      clearInterval(interval);
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", handleVisibilityOrUnload);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("pagehide", handleVisibilityOrUnload);
        window.removeEventListener("beforeunload", handleVisibilityOrUnload);
      }
    };
  }, [characters, settings]);

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