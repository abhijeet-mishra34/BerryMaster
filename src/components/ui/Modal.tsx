import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

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
          theme-modal
          relative
          w-full
          ${maxWidthClasses[maxWidth]}
          overflow-hidden
          rounded-2xl
          backdrop-blur-2xl
        `}
        style={{
          padding: "2.5rem",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Top Gradient Accent Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 opacity-90" />

        {/* Modal Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {icon && (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold shadow-[0_0_20px_-4px_rgba(16,185,129,0.35)]">
                {icon}
              </div>
            )}
            <div>
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white light:text-slate-900"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1.5 text-sm text-slate-400 light:text-slate-600 leading-relaxed max-w-lg">
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
              border-slate-800
              light:border-slate-200
              bg-slate-800/40
              light:bg-slate-100
              text-slate-400
              light:text-slate-600
              transition-all
              duration-200
              hover:border-slate-700
              light:hover:border-slate-300
              hover:bg-slate-800
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