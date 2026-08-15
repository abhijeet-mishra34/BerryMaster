import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type AppTheme = "dark" | "light";

type SettingsContextValue = {
  showDeveloperBerries: boolean;
  setShowDeveloperBerries: (value: boolean) => void;
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  desktopMinimizeToTray: boolean;
  setDesktopMinimizeToTray: (value: boolean) => void;
  notifyOnWater: boolean;
  setNotifyOnWater: (value: boolean) => void;
  notifyOnHarvest: boolean;
  setNotifyOnHarvest: (value: boolean) => void;
  notifyOnWilt: boolean;
  setNotifyOnWilt: (value: boolean) => void;
};

const SettingsContext =
  createContext<SettingsContextValue | undefined>(
    undefined
  );

const STORAGE_KEY =
  "berrymaster.settings";

type SettingsProviderProps = {
  children: React.ReactNode;
};

export function SettingsProvider({
  children,
}: SettingsProviderProps) {
  const [showDeveloperBerries, setShowDeveloperBerries] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    try {
      const parsed = JSON.parse(stored);
      return Boolean(parsed.showDeveloperBerries);
    } catch {
      return false;
    }
  });

  const [theme, setTheme] = useState<AppTheme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return "dark";
    try {
      const parsed = JSON.parse(stored);
      return parsed.theme === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });

  const [desktopMinimizeToTray, setDesktopMinimizeToTray] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return true;
    try {
      const parsed = JSON.parse(stored);
      return parsed.desktopMinimizeToTray ?? true;
    } catch {
      return true;
    }
  });

  const [notifyOnWater, setNotifyOnWater] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return true;
    try {
      const parsed = JSON.parse(stored);
      return parsed.notifyOnWater ?? true;
    } catch {
      return true;
    }
  });

  const [notifyOnHarvest, setNotifyOnHarvest] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return true;
    try {
      const parsed = JSON.parse(stored);
      return parsed.notifyOnHarvest ?? true;
    } catch {
      return true;
    }
  });

  const [notifyOnWilt, setNotifyOnWilt] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return true;
    try {
      const parsed = JSON.parse(stored);
      return parsed.notifyOnWilt ?? true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        showDeveloperBerries,
        theme,
        desktopMinimizeToTray,
        notifyOnWater,
        notifyOnHarvest,
        notifyOnWilt,
      })
    );

    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [
    showDeveloperBerries,
    theme,
    desktopMinimizeToTray,
    notifyOnWater,
    notifyOnHarvest,
    notifyOnWilt,
  ]);

  return (
    <SettingsContext.Provider
      value={{
        showDeveloperBerries,
        setShowDeveloperBerries,
        theme,
        setTheme,
        desktopMinimizeToTray,
        setDesktopMinimizeToTray,
        notifyOnWater,
        setNotifyOnWater,
        notifyOnHarvest,
        setNotifyOnHarvest,
        notifyOnWilt,
        setNotifyOnWilt,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

const DEFAULT_SETTINGS: SettingsContextValue = {
  showDeveloperBerries: false,
  setShowDeveloperBerries: () => {},
  theme: "dark",
  setTheme: () => {},
  desktopMinimizeToTray: true,
  setDesktopMinimizeToTray: () => {},
  notifyOnWater: true,
  setNotifyOnWater: () => {},
  notifyOnHarvest: true,
  setNotifyOnHarvest: () => {},
  notifyOnWilt: true,
  setNotifyOnWilt: () => {},
};

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    return DEFAULT_SETTINGS;
  }
  return context;
}