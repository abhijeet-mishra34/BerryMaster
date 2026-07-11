import type { Berry } from "../types/Berry";

export interface PlantTimers {
  plantedAt: string;
  nextWaterAt: string;
  harvestAt: string;
}

export function calculatePlantTimers(
  berry: Berry
): PlantTimers {
  const plantedAt = new Date();

  const nextWaterAt = new Date(plantedAt);

  /*
    Current temporary watering rule.

    We'll replace this in Sprint 9 with the
    official watering schedule.
  */
  nextWaterAt.setHours(
    nextWaterAt.getHours() + 6
  );

  const harvestAt = new Date(plantedAt);

  harvestAt.setHours(
    harvestAt.getHours() + berry.growthTime
  );

 return {
 plantedAt: plantedAt.toISOString(),
 nextWaterAt: nextWaterAt.toISOString(),
 harvestAt: harvestAt.toISOString(),
};
}