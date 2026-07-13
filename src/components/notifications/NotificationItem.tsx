import type { Notification } from "../../types/Notification";
import { timeAgo } from "../../utils/timeAgo";
type NotificationItemProps = {
  notification: Notification;
};

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const styles = {
    water: {
      icon: "💧",
      bg: "bg-blue-500/10",
      title: "text-blue-300",
    },

    harvest: {
      icon: "🌾",
      bg: "bg-emerald-500/10",
      title: "text-emerald-300",
    },

    wilt: {
      icon: "🍂",
      bg: "bg-red-500/10",
      title: "text-red-300",
    },
  };

  const style = styles[notification.type];

  return (
    <div
      className={`border-b border-slate-800 p-4 transition-all duration-200 hover:bg-slate-800 ${style.bg}`}
    >

      <div className="flex items-start gap-4">

        <div className="text-2xl">
          {style.icon}
        </div>

        <div className="flex-1">

          <h3 className={`font-semibold ${style.title}`}>
            {notification.title}
          </h3>

          <div className="mt-1">

  <p className="text-sm text-slate-300">
    {notification.message}
  </p>

  <p className="mt-2 text-xs text-slate-500">
    {timeAgo(notification.createdAt)}
  </p>

</div>

        </div>

      </div>

    </div>
  );
}