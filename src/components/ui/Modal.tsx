import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useAndroidBackHandler } from "../../hooks/useAndroidBackHandler";

type ModalProps = {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
};

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

export default function Modal({
  isOpen,
  title,
  subtitle,
  icon,
  children,
  onClose,
  maxWidth = "2xl",
}: ModalProps) {
  const previousFocus = useRef<HTMLElement | null>(null);

  // Intercept Android back button / swipe gesture to close modal gracefully
  useAndroidBackHandler(isOpen, onClose);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocus.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocus.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/80
        p-4
        sm:p-8
        backdrop-blur-md
        transition-opacity
      "
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`
          relative
          w-full
          ${maxWidthClasses[maxWidth]}
          max-h-[92vh]
          overflow-y-auto
          rounded-3xl
          border
          border-white/[0.12]
          light:border-slate-200
          bg-gradient-to-b
          from-[#25283c]
          via-[#1a1d2e]
          to-[#121422]
          light:from-white
          light:via-slate-50
          light:to-slate-100
          p-6
          sm:p-8
          md:p-9
          shadow-[0_25px_60px_rgba(0,0,0,0.85)]
          light:shadow-2xl
          backdrop-blur-2xl
        `}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Subtle Top Inset Rim Highlight */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 light:via-slate-300 to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="mb-6 sm:mb-8 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            {icon && (
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-400 font-bold shadow-[0_0_20px_-4px_rgba(52,211,153,0.3)]">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h2
                id="modal-title"
                className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white light:text-slate-900 truncate sm:whitespace-normal"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1.5 text-xs sm:text-sm text-slate-400 light:text-slate-500 leading-relaxed max-w-xl">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              -mr-1
              -mt-1
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              light:border-slate-200
              bg-white/[0.05]
              light:bg-slate-100
              text-slate-400
              light:text-slate-600
              transition-all
              duration-200
              hover:border-white/20
              light:hover:border-slate-300
              hover:bg-white/10
              light:hover:bg-slate-200
              hover:text-white
              light:hover:text-slate-900
              active:scale-95
              cursor-pointer
            "
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        {children}
      </div>
    </div>,
    document.body
  );
}