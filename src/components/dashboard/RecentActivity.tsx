import { Sprout, Droplets, Wheat, AlertTriangle, Activity, Clock } from "lucide-react";
import { useActivities } from "../../context/ActivityContext";

export default function RecentActivity() {
  const { activities } = useActivities();

  const recentActivities = activities.slice(0, 5);

  function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();

    const difference = now.getTime() - date.getTime();
    const minutes = Math.floor(difference / (1000 * 60));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";

    return `${days}d ago`;
  }

  function getActivityBadge(type: string) {
    switch (type) {
      case "planted":
        return {
          icon: <Sprout className="h-4 w-4 text-emerald-400" />,
          bg: "bg-emerald-500/10 border-emerald-500/30",
        };
      case "watered":
        return {
          icon: <Droplets className="h-4 w-4 text-sky-400" />,
          bg: "bg-sky-500/10 border-sky-500/30",
        };
      case "harvested":
        return {
          icon: <Wheat className="h-4 w-4 text-amber-400" />,
          bg: "bg-amber-500/10 border-amber-500/30",
        };
      case "wilted":
        return {
          icon: <AlertTriangle className="h-4 w-4 text-red-400" />,
          bg: "bg-red-500/10 border-red-500/30",
        };
      default:
        return {
          icon: <Activity className="h-4 w-4 text-slate-400" />,
          bg: "bg-slate-800 border-slate-700",
        };
    }
  }

  return (
    <div className="space-y-3">
      {recentActivities.length === 0 ? (
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-8 text-center backdrop-blur-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/60 text-slate-400 mx-auto mb-3 border border-slate-700/50">
            <Clock className="h-5 w-5" />
          </div>

          <p className="text-sm font-bold text-white">
            No recent activity logged
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Your farming actions will appear here automatically.
          </p>
        </div>
      ) : (
        <>
          {recentActivities.map((activity) => {
            const badge = getActivityBadge(activity.type);
            return (
              <div
                key={activity.id}
                className="
                  flex
                  items-center
                  gap-3.5
                  rounded-2xl
                  border
                  border-slate-800/80
                  bg-slate-950/60
                  p-3.5
                  backdrop-blur-md
                  transition-all
                  duration-200
                  hover:border-slate-700
                  hover:bg-slate-900/60
                "
              >
                <div
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    ${badge.bg}
                  `}
                >
                  {badge.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white truncate">
                    {activity.message}
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {formatTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
          {activities.length > 5 && (
            <p className="mt-2 text-center text-[11px] text-slate-600">
              Showing 5 of {activities.length} recent actions
            </p>
          )}
        </>
      )}
    </div>
  );
}