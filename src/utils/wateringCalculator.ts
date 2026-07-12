import type { Berry } from "../types/Berry";

import { getFarmingProfile } from "../data/farmingProfiles";

export function calculateNextWaterTime(
  berry: Berry,
  wateringCount: number,
  now = new Date()
): string | undefined {

  const profile = getFarmingProfile(
    berry.growthTime
  );

  if (
    wateringCount >=
    profile.totalWaterings
  ) {
    return undefined;
  }

  return new Date(
    now.getTime() +
      profile.repeatWaterEveryHours *
        60 *
        60 *
        1000
  ).toISOString();
}