import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SettingsContextValue = {
  showDeveloperBerries: boolean;
  setShowDeveloperBerries: (
    value: boolean
  ) => void;
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
  const [
    showDeveloperBerries,
    setShowDeveloperBerries,
  ] = useState<boolean>(() => {
    const storedSettings =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!storedSettings) {
      return false;
    }

    try {
      const settings = JSON.parse(
        storedSettings
      );

      return Boolean(
        settings.showDeveloperBerries
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        showDeveloperBerries,
      })
    );
  }, [
    showDeveloperBerries,
  ]);

  return (
    <SettingsContext.Provider
      value={{
        showDeveloperBerries,
        setShowDeveloperBerries,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context =
    useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used within a SettingsProvider"
    );
  }

  return context;
}