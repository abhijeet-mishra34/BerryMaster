import type { Berry } from "../types/Berry";
import { farmingProfiles } from "../data/farmingProfiles";

export function calculateNextWaterTime(
  berry: Berry,
  wateringCount: number,
  now = new Date()
): string | undefined {
  const profile = farmingProfiles.find(
    (p) => Math.abs(p.growthTime - berry.growthTime) < 0.001
  );

  if (!profile) {
    return undefined;
  }

  // If we have reached or exceeded the total number of allowed waterings
  if (wateringCount >= profile.totalWaterings) {
    return undefined;
  }

  return new Date(
    now.getTime() + profile.repeatWaterEveryHours * 60 * 60 * 1000
  ).toISOString();
}