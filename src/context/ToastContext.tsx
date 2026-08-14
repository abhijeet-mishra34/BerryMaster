import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

// ── Types ──────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

// ── Context ────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────

const TOAST_DURATION_MS = 3200;
const MAX_VISIBLE_TOASTS = 3;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = Math.random().toString(36).slice(2, 9);

      setToasts((prev) => {
        // Keep max N toasts — drop oldest if over limit
        const next = [...prev.slice(-(MAX_VISIBLE_TOASTS - 1)), { id, message, type }];
        return next;
      });

      window.setTimeout(() => removeToast(id), TOAST_DURATION_MS);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────

const NOOP = () => {};

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  // Graceful fallback — never throws, so portalled components stay safe
  if (!ctx) return { toasts: [], addToast: NOOP, removeToast: NOOP };
  return ctx;
}
