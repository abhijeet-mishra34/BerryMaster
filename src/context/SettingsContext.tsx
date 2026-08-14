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

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        showDeveloperBerries,
        theme,
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
  }, [showDeveloperBerries, theme]);

  return (
    <SettingsContext.Provider
      value={{
        showDeveloperBerries,
        setShowDeveloperBerries,
        theme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettings must be used within a SettingsProvider"
    );
  }
  return context;
}