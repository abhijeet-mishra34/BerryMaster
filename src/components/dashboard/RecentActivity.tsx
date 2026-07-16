import { useActivities } from "../../context/ActivityContext";

export default function RecentActivity() {
  const { activities } = useActivities();

  const recentActivities = activities.slice(0, 5);

  function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();

    const difference =
      now.getTime() - date.getTime();

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    if (days === 1) {
      return "Yesterday";
    }

    return `${days}d ago`;
  }

  function getActivityIcon(
    type: string
  ) {
    switch (type) {
      case "planted":
        return "🌱";

      case "watered":
        return "💧";

      case "harvested":
        return "🌾";

      case "wilted":
        return "🍂";

      default:
        return "📌";
    }
  }

  return (
    <div className="space-y-4">
      {recentActivities.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
          <div className="text-4xl">
            🕒
          </div>

          <p className="mt-3 font-semibold text-white">
            No recent activity
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Your farming actions will appear here.
          </p>
        </div>
      ) : (
        recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
              p-4
              transition-all
              duration-200
              hover:border-slate-600
              hover:bg-slate-800
            "
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-800 text-2xl">
              {getActivityIcon(
                activity.type
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-medium text-white">
                {activity.message}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {formatTime(
                  activity.timestamp
                )}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}