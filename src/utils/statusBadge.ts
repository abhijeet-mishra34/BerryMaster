import type { PlantStatus } from "../types/PlantStatus";

export function getStatusBadge(status: PlantStatus) {
  switch (status) {
    case "idle":
      return {
        icon: "⚪",
        label: "Idle",
        className:
          "bg-slate-700 text-slate-200",
      };

    case "growing":
      return {
        icon: "🟢",
        label: "Growing",
        className:
          "bg-emerald-500/20 text-emerald-400",
      };

    case "readyToWater":
      return {
        icon: "💧",
        label: "Ready to Water",
        className:
          "bg-sky-500/20 text-sky-400",
      };

    case "readyToHarvest":
      return {
        icon: "🌾",
        label: "Ready to Harvest",
        className:
          "bg-yellow-500/20 text-yellow-400",
      };

    case "harvestOverdue":
      return {
        icon: "🚨",
        label: "Harvest Overdue",
        className:
          "bg-red-500/20 text-red-400",
      };
  }
}