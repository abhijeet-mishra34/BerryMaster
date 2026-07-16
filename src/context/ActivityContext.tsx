import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type {
  Activity,
  ActivityType,
} from "../types/Activity";

import { STORAGE_KEYS } from "../constants/storageKeys";

type ActivityContextType = {
  activities: Activity[];

  addActivity: (
    type: ActivityType,
    message: string
  ) => void;

  clearActivities: () => void;
};

const ActivityContext = createContext<
  ActivityContextType | undefined
>(undefined);

export function ActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activities, setActivities] =
    useState<Activity[]>(() => {
      const saved = localStorage.getItem(
        STORAGE_KEYS.ACTIVITIES
      );

      return saved ? JSON.parse(saved) : [];
    });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.ACTIVITIES,
      JSON.stringify(activities)
    );
  }, [activities]);

 function addActivity(
  type: ActivityType,
  message: string
) {
  const newActivity: Activity = {
    id: crypto.randomUUID(),
    type,
    message,
    timestamp: new Date().toISOString(),
  };

  setActivities((current) =>
    [
      newActivity,
      ...current,
    ].slice(0, 100)
  );
}

  function clearActivities() {
    setActivities([]);
  }

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        clearActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error(
      "useActivities must be used inside ActivityProvider"
    );
  }

  return context;
}