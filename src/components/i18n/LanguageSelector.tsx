import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown, X } from "lucide-react";
import { useTranslation } from "../../context/LanguageContext";
import type { SupportedLanguage } from "../../i18n/types";

interface LanguageSelectorProps {
  variant?: "header" | "compact" | "inline";
}

export default function LanguageSelector({ variant = "header" }: LanguageSelectorProps) {
  const { language, setLanguage, currentLanguageInfo, supportedLanguages, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      {variant === "header" && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          title={t("header.language")}
          aria-label={t("header.language")}
          className="
            flex
            h-9
            items-center
            gap-1.5
            rounded-xl
            border
            border-slate-800
            light:border-slate-200
            bg-slate-900/60
            light:bg-slate-100
            px-2.5
            text-slate-300
            light:text-slate-700
            hover:border-slate-700
            light:hover:border-slate-300
            hover:bg-slate-800
            light:hover:bg-slate-200
            hover:text-emerald-400
            transition-all
            duration-200
            cursor-pointer
            text-xs
            font-semibold
          "
        >
          <Globe className="h-4 w-4 text-emerald-400" />
          <span className="hidden sm:inline text-xs font-medium">
            {currentLanguageInfo.flag} {currentLanguageInfo.name}
          </span>
          <span className="sm:hidden text-xs">
            {currentLanguageInfo.flag}
          </span>
          <ChevronDown className="h-3 w-3 text-slate-400 transition-transform duration-200" />
        </button>
      )}

      {variant === "compact" && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-slate-800
            light:border-slate-200
            bg-slate-900/60
            light:bg-slate-100
            text-slate-300
            hover:text-emerald-400
            transition-colors
            cursor-pointer
          "
          title={t("header.language")}
        >
          <Globe className="h-4 w-4" />
        </button>
      )}

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Glassmorphism Dropdown Menu */}
      {isOpen && (
        <div
          className="
            theme-modal
            fixed
            inset-x-3
            top-16
            max-w-sm
            mx-auto
            sm:inset-x-auto
            sm:absolute
            sm:right-0
            sm:top-11
            sm:w-64
            z-50
            max-h-[75vh]
            overflow-y-auto
            rounded-2xl
            border
            border-white/[0.12]
            light:border-slate-200
            bg-slate-950/95
            light:bg-white/95
            p-2.5
            shadow-2xl
            backdrop-blur-2xl
            animate-in
            fade-in
            zoom-in-95
            duration-150
          "
        >
          <div className="px-3 py-2 border-b border-white/[0.06] light:border-slate-200/60 mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
              {t("header.language")}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 font-mono font-bold">
                {currentLanguageInfo.code}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="sm:hidden flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {supportedLanguages.map((lang) => {
              const isActive = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    px-3
                    py-2
                    text-left
                    transition-all
                    cursor-pointer
                    ${
                      isActive
                        ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 shadow-xs"
                        : "border border-transparent text-slate-300 light:text-slate-700 hover:bg-slate-900/60 light:hover:bg-slate-100 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base leading-none select-none">{lang.flag}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold leading-snug truncate">
                        {lang.name}
                      </span>
                      <span className="text-[10px] text-slate-400 light:text-slate-500 truncate">
                        {lang.englishName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {lang.badge && (
                      <span className="rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                        {lang.badge}
                      </span>
                    )}
                    {isActive && (
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
