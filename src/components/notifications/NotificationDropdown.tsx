import { useEffect, useState } from "react";
import { Bell, CheckCheck, X } from "lucide-react";
import type { Notification } from "../../types/Notification";
import NotificationItem from "./NotificationItem";

type NotificationDropdownProps = {
  notifications: Notification[];
  onClose?: () => void;
};

export default function NotificationDropdown({
  notifications,
  onClose,
}: NotificationDropdownProps) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((value) => value + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        theme-modal
        absolute
        right-0
        mt-3
        w-88
        sm:w-96
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        light:border-slate-200
        bg-slate-950/95
        light:bg-white/95
        backdrop-blur-xl
        shadow-2xl
        z-50
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 light:border-slate-100 p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 light:text-emerald-700">
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white light:text-slate-900 leading-none">
              Notifications
            </h2>
            <p className="mt-1 text-xs text-slate-400 light:text-slate-500">
              {notifications.length} active {notifications.length === 1 ? "alert" : "alerts"}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close notifications"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Content */}
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2.5 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 text-2xl border border-emerald-500/20">
            <CheckCheck className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-white light:text-slate-900">
            All caught up!
          </h3>
          <p className="text-xs text-slate-400 light:text-slate-500 max-w-[240px]">
            Your berry crops are in great shape and don't need attention right now.
          </p>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-800/60 light:divide-slate-100">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </div>
  );
}