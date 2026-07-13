import { useEffect, useRef, useState } from "react";

import { useNotifications } from "../../context/NotificationContext";

import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const {
    notifications,
    notificationCount,
  } = useNotifications();

  // Reference to the entire notification area
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded-full bg-slate-800 p-3 transition hover:bg-slate-700"
      >
        🔔

        {notificationCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {notificationCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          notifications={notifications}
        />
      )}
    </div>
  );
}