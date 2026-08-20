import type { Notification } from "../../types/Notification";
import { timeAgo } from "../../utils/timeAgo";
import { Droplets, Wheat, AlertTriangle } from "lucide-react";

type NotificationItemProps = {
  notification: Notification;
};

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const configs = {
    water: {
      icon: Droplets,
      wrapperBg: "bg-sky-500/15 text-sky-400 border border-sky-500/30",
      itemBg: "hover:bg-sky-500/5 light:hover:bg-sky-50/50",
      titleColor: "text-sky-300 light:text-sky-900",
    },
    harvest: {
      icon: Wheat,
      wrapperBg: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
      itemBg: "hover:bg-amber-500/5 light:hover:bg-amber-50/50",
      titleColor: "text-amber-300 light:text-amber-900",
    },
    wilt: {
      icon: AlertTriangle,
      wrapperBg: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
      itemBg: "hover:bg-rose-500/5 light:hover:bg-rose-50/50",
      titleColor: "text-rose-300 light:text-rose-900",
    },
  };

  const config = configs[notification.type];
  const IconComponent = config.icon;

  return (
    <div
      className={`p-3.5 transition-colors duration-150 ${config.itemBg}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${config.wrapperBg}`}
        >
          <IconComponent className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className={`text-xs font-bold truncate ${config.titleColor}`}>
              {notification.title}
            </h3>
            <span className="text-[10px] font-medium text-slate-500 shrink-0">
              {timeAgo(notification.createdAt)}
            </span>
          </div>

          <p className="mt-0.5 text-xs text-slate-300 light:text-slate-600 leading-relaxed break-words">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
}