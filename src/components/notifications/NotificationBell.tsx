import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "../../context/NotificationContext";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { notifications, notificationCount } = useNotifications();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          relative
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
          text-slate-400
          light:text-slate-600
          transition-all
          duration-200
          hover:border-slate-700
          light:hover:border-slate-300
          hover:bg-slate-800
          light:hover:bg-slate-200
          hover:text-emerald-400
          cursor-pointer
        "
        aria-label="Open notifications"
        title="Notifications"
      >
        <Bell className="h-4 w-4" />

        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white ring-2 ring-slate-950 light:ring-white">
            {notificationCount > 99 ? "99+" : notificationCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          notifications={notifications}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}