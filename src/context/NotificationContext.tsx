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

  // 1. Live notification badge & toast polling for active app view (every 5 seconds)
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
    };

    // Run immediately
    updateNotifications();

    const interval = setInterval(updateNotifications, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [characters, settings]);

  // 2. Pre-schedule future OS alarms ONLY when farming timers or settings actually change
  const farmingFingerprint = useMemo(() => {
    return (
      characters
        .map(
          (c) =>
            `${c.id}:${c.plantedBerryId || ""}:${c.nextWaterAt || ""}:${c.harvestAt || ""}:${c.wiltAt || ""}`
        )
        .join("|") +
      `_s_${settings.notifyOnWater}_${settings.notifyOnHarvest}_${settings.notifyOnWilt}`
    );
  }, [characters, settings]);

  const prevFingerprintRef = useRef<string>("");

  useEffect(() => {
    if (farmingFingerprint !== prevFingerprintRef.current) {
      prevFingerprintRef.current = farmingFingerprint;
      scheduleFutureCharacterAlerts(characters, settings);
    }
  }, [farmingFingerprint, characters, settings]);

  // 3. Lifecycle listeners: guarantee alarms are scheduled before app is suspended or closed
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        scheduleFutureCharacterAlerts(characters, settings);
      }
    };

    const handlePageHide = () => {
      scheduleFutureCharacterAlerts(characters, settings);
    };

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibility);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("pagehide", handlePageHide);
      window.addEventListener("beforeunload", handlePageHide);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", handleVisibility);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("pagehide", handlePageHide);
        window.removeEventListener("beforeunload", handlePageHide);
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