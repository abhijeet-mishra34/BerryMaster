import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useToast, type ToastType } from "../../context/ToastContext";

// ── Per-type visual config ─────────────────────────────────────────────────

const config: Record<
  ToastType,
  { icon: string; bar: string; text: string; border: string; bg: string }
> = {
  success: {
    icon: "✅",
    bar: "bg-emerald-500",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
  },
  error: {
    icon: "❌",
    bar: "bg-red-500",
    text: "text-red-300",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
  },
  info: {
    icon: "💧",
    bar: "bg-sky-500",
    text: "text-sky-300",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
  },
  warning: {
    icon: "⚠️",
    bar: "bg-amber-500",
    text: "text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
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

  return (
    <div
      className={`toast-slide-in relative flex w-80 items-start gap-3 overflow-hidden rounded-2xl border ${c.border} ${c.bg} px-4 py-3.5 shadow-2xl shadow-black/40 backdrop-blur-xl`}
    >
      {/* Accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${c.bar} rounded-l-2xl`} />

      {/* Progress bar */}
      <div className={`toast-progress absolute bottom-0 left-0 right-0 h-[2px] ${c.bar} opacity-40`} />

      {/* Icon */}
      <span className="mt-0.5 shrink-0 text-base leading-none">{c.icon}</span>

      {/* Message */}
      <p className={`flex-1 text-xs font-semibold leading-relaxed ${c.text}`}>
        {message}
      </p>

      {/* Dismiss */}
      <button
        type="button"
        onClick={() => removeToast(id)}
        className="mt-0.5 shrink-0 rounded-md p-0.5 text-slate-500 transition-colors hover:text-slate-300"
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
      className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3"
    >
      {toasts.map((t) => (
        <Toast key={t.id} {...t} />
      ))}
    </div>,
    document.body
  );
}
