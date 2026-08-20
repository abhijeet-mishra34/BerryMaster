import { createPortal } from "react-dom";
import { X, CheckCircle2, AlertCircle, Droplets, AlertTriangle } from "lucide-react";
import { useToast, type ToastType } from "../../context/ToastContext";

// ── Per-type visual config ─────────────────────────────────────────────────

const config = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-emerald-400 light:text-emerald-700",
    bar: "bg-emerald-500",
    text: "text-slate-100 light:text-slate-900",
    border: "border-emerald-500/30 light:border-emerald-200",
    bg: "bg-slate-950/90 light:bg-white/95",
    iconBg: "bg-emerald-500/15 light:bg-emerald-50 text-emerald-400 light:text-emerald-700",
  },
  error: {
    icon: AlertCircle,
    iconColor: "text-rose-400 light:text-rose-700",
    bar: "bg-rose-500",
    text: "text-slate-100 light:text-slate-900",
    border: "border-rose-500/30 light:border-rose-200",
    bg: "bg-slate-950/90 light:bg-white/95",
    iconBg: "bg-rose-500/15 light:bg-rose-50 text-rose-400 light:text-rose-700",
  },
  info: {
    icon: Droplets,
    iconColor: "text-sky-400 light:text-sky-700",
    bar: "bg-sky-500",
    text: "text-slate-100 light:text-slate-900",
    border: "border-sky-500/30 light:border-sky-200",
    bg: "bg-slate-950/90 light:bg-white/95",
    iconBg: "bg-sky-500/15 light:bg-sky-50 text-sky-400 light:text-sky-700",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-amber-400 light:text-amber-700",
    bar: "bg-amber-500",
    text: "text-slate-100 light:text-slate-900",
    border: "border-amber-500/30 light:border-amber-200",
    bg: "bg-slate-950/90 light:bg-white/95",
    iconBg: "bg-amber-500/15 light:bg-amber-50 text-amber-400 light:text-amber-700",
  },
};

// ── Single Toast ───────────────────────────────────────────────────────────

function Toast({
  id,
  message,
  type,
}: {
  id: string;
  message: string;
  type: ToastType;
}) {
  const { removeToast } = useToast();
  const c = config[type];
  const IconComponent = c.icon;

  return (
    <div
      className={`
        toast-slide-in
        relative
        flex
        w-84
        sm:w-92
        items-center
        gap-3
        overflow-hidden
        rounded-2xl
        border
        ${c.border}
        ${c.bg}
        px-4
        py-3.5
        shadow-2xl
        shadow-black/30
        light:shadow-slate-300/50
        backdrop-blur-xl
        transition-all
        duration-200
        hover:scale-[1.01]
      `}
    >
      {/* Accent indicator bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${c.bar} rounded-l-2xl`} />

      {/* Progress bar */}
      <div className={`toast-progress absolute bottom-0 left-0 right-0 h-[2px] ${c.bar} opacity-40`} />

      {/* Icon */}
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${c.iconBg}`}>
        <IconComponent className="h-4 w-4" />
      </div>

      {/* Message */}
      <p className={`flex-1 text-xs font-semibold leading-relaxed ${c.text}`}>
        {message}
      </p>

      {/* Dismiss */}
      <button
        type="button"
        onClick={() => removeToast(id)}
        className="shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800/50 light:hover:bg-slate-100 hover:text-white light:hover:text-slate-900 cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ── Container ──────────────────────────────────────────────────────────────

export default function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return createPortal(
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2.5 pointer-events-auto"
    >
      {toasts.map((t) => (
        <Toast key={t.id} {...t} />
      ))}
    </div>,
    document.body
  );
}
