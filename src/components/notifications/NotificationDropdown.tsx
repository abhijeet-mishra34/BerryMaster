import { useEffect, useState } from "react";

import type { Notification } from "../../types/Notification";

import NotificationItem from "./NotificationItem";

type NotificationDropdownProps = {
  notifications: Notification[];
};

export default function NotificationDropdown({
  notifications,
}: NotificationDropdownProps) {
  // Used only to trigger a re-render so relative timestamps stay updated.
const [, forceUpdate] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    forceUpdate((value) => value + 1);
  }, 60000); // Refresh every minute

  return () => clearInterval(interval);
}, []);

  return (
    <div className="absolute right-0 mt-3 w-96 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl z-50">

      {/* Header */}

      <div className="border-b border-slate-700 p-4">

        <h2 className="text-lg font-bold text-white">
          🔔 Notifications
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          {notifications.length} Active Alert
          {notifications.length !== 1 && "s"}
        </p>

      </div>

      {/* Content */}

      {notifications.length === 0 ? (

        <div className="flex flex-col items-center gap-3 p-8">

          <div className="text-5xl">
            ✅
          </div>

          <h3 className="text-lg font-semibold text-white">
            All caught up!
          </h3>

          <p className="text-center text-sm text-slate-400">
            Your berry farm doesn't need any attention right now.
          </p>

        </div>

      ) : (

        <div className="max-h-96 overflow-y-auto">

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