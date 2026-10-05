import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import type { SupportedLanguage, LanguageInfo, TranslationDictionary } from "../i18n/types";
import { SUPPORTED_LANGUAGES } from "../i18n/types";
import { en } from "../i18n/locales/en";
import { zhCN } from "../i18n/locales/zh-CN";
import { zhTW } from "../i18n/locales/zh-TW";
import { es } from "../i18n/locales/es";
import { ptBR } from "../i18n/locales/pt-BR";
import { ja } from "../i18n/locales/ja";
import { de } from "../i18n/locales/de";
import { fr } from "../i18n/locales/fr";
import { ru } from "../i18n/locales/ru";
import { ko } from "../i18n/locales/ko";
import { getLocalizedBerryName } from "../i18n/berryNames";
import { getLocalizedSeedName } from "../i18n/seedNames";
import { getLocalizedCategoryName } from "../i18n/categoryNames";
import type { SeedType } from "../types/Berry";

const DICTIONARIES: Record<SupportedLanguage, TranslationDictionary> = {
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  es,
  "pt-BR": ptBR,
  ja,
  de,
  fr,
  ru,
  ko,
};

const STORAGE_KEY = "berrymaster.language";

function detectSystemLanguage(): SupportedLanguage {
  if (typeof navigator === "undefined") return "en";

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language || ""];

  for (const lang of languages) {
    const lower = lang.toLowerCase();
    if (lower.startsWith("zh-tw") || lower.startsWith("zh-hk") || lower.startsWith("zh-hant") || lower.startsWith("zh-mo")) {
      return "zh-TW";
    }
    if (lower.startsWith("zh")) {
      return "zh-CN";
    }
    if (lower.startsWith("es")) {
      return "es";
    }
    if (lower.startsWith("pt")) {
      return "pt-BR";
    }
    if (lower.startsWith("ja")) {
      return "ja";
    }
    if (lower.startsWith("de")) {
      return "de";
    }
    if (lower.startsWith("fr")) {
      return "fr";
    }
    if (lower.startsWith("ru")) {
      return "ru";
    }
    if (lower.startsWith("ko")) {
      return "ko";
    }
    if (lower.startsWith("en")) {
      return "en";
    }
  }

  return "en";
}

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<TranslationDictionary>;

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currentLanguageInfo: LanguageInfo;
  supportedLanguages: LanguageInfo[];
  t: (key: string, params?: Record<string, string | number>) => string;
  getBerryName: (berryId: string, defaultName?: string) => string;
  getSeedName: (seedType: SeedType) => string;
  getCategoryName: (category: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    if (stored && DICTIONARIES[stored]) {
      return stored;
    }
    return detectSystemLanguage();
  });

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    if (DICTIONARIES[lang]) {
      setLanguageState(lang);
      localStorage.setItem(STORAGE_KEY, lang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const currentDict = useMemo(() => DICTIONARIES[language] || en, [language]);
  const fallbackDict = en;

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const parts = key.split(".");
      let val: unknown = currentDict;

      for (const part of parts) {
        if (val && typeof val === "object" && part in val) {
          val = (val as Record<string, unknown>)[part];
        } else {
          val = undefined;
          break;
        }
      }

      // Fallback to English dictionary if key is missing in active locale
      if (typeof val !== "string") {
        let fallbackVal: unknown = fallbackDict;
        for (const part of parts) {
          if (fallbackVal && typeof fallbackVal === "object" && part in fallbackVal) {
            fallbackVal = (fallbackVal as Record<string, unknown>)[part];
          } else {
            fallbackVal = undefined;
            break;
          }
        }
        val = fallbackVal;
      }

      if (typeof val !== "string") {
        return key;
      }

      if (params) {
        return Object.entries(params).reduce((str, [paramKey, paramVal]) => {
          return str.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramVal));
        }, val);
      }

      return val;
    },
    [currentDict, fallbackDict]
  );

  const getBerryName = useCallback(
    (berryId: string, defaultName?: string) => {
      return getLocalizedBerryName(berryId, language, defaultName);
    },
    [language]
  );

  const getSeedName = useCallback(
    (seedType: SeedType) => {
      return getLocalizedSeedName(seedType, language);
    },
    [language]
  );

  const getCategoryName = useCallback(
    (category: string) => {
      return getLocalizedCategoryName(category, language);
    },
    [language]
  );

  const currentLanguageInfo = useMemo(() => {
    return (
      SUPPORTED_LANGUAGES.find((item) => item.code === language) ||
      SUPPORTED_LANGUAGES[0]
    );
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      currentLanguageInfo,
      supportedLanguages: SUPPORTED_LANGUAGES,
      t,
      getBerryName,
      getSeedName,
      getCategoryName,
    }),
    [language, setLanguage, currentLanguageInfo, t, getBerryName, getSeedName, getCategoryName]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Convenience hook alias
export const useTranslation = useLanguage;
