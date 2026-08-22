import type { Berry } from "../types/Berry";
import { farmingProfiles } from "../data/farmingProfiles";

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

  const profile = farmingProfiles.find(
    (p) => Math.abs(p.growthTime - berry.growthTime) < 0.001
  );

  const firstWaterHours = profile
    ? profile.autoWaterOnPlant
      ? profile.repeatWaterEveryHours
      : profile.firstWaterAfterHours
    : berry.growthTime >= 1
    ? Math.floor(berry.growthTime / 2)
    : berry.growthTime / 2;

  const nextWaterAt = new Date(
    plantedAt.getTime() +
      firstWaterHours * 60 * 60 * 1000
  );

  const harvestAt = new Date(
    plantedAt.getTime() +
      berry.growthTime * 60 * 60 * 1000
  );

  const wiltAt = new Date(
    harvestAt.getTime() +
      berry.harvestWindow * 60 * 60 * 1000
  );

  return {
    plantedAt: plantedAt.toISOString(),
    nextWaterAt: nextWaterAt.toISOString(),
    harvestAt: harvestAt.toISOString(),
    wiltAt: wiltAt.toISOString(),
  };
}