import type { Berry } from "../types/Berry";

import { calculateWiltTime } from "./calculateWiltTime";

import { getFarmingProfile } from "../data/farmingProfiles";

export interface PlantTimers {
  plantedAt: string;
  nextWaterAt: string;
  harvestAt: string;
  wiltAt: string;
}

export function calculatePlantTimers(
  berry: Berry
): PlantTimers {
  const plantedAt = new Date();

  const profile = getFarmingProfile(
    berry.growthTime
  );

  const nextWaterAt = new Date(
    plantedAt.getTime() +
      profile.firstWaterAfterHours *
        60 *
        60 *
        1000
  );

  const harvestAt = new Date(
    plantedAt.getTime() +
      berry.growthTime *
        60 *
        60 *
        1000
  );

  const wiltAt = calculateWiltTime(
    harvestAt,
    profile.harvestWindowHours
  );

  return {
    plantedAt: plantedAt.toISOString(),

    nextWaterAt: nextWaterAt.toISOString(),

    harvestAt: harvestAt.toISOString(),

    wiltAt,
  };
}