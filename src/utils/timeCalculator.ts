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

  /**
   * Watering Strategy
   *
   * 16h berries
   *  - Water immediately after planting.
   *  - Second watering recommended at 10 hours.
   *  - Maximum safe interval is 12 hours.
   *
   * 20h berries
   *  - Water immediately after planting.
   *  - Second watering recommended at 10 hours.
   *  - Maximum safe interval is 12 hours.
   *
   * 42h berries
   *  - Current strategy: water after 12 hours.
   *  - This can easily be adjusted later as we implement
   *    the full watering engine.
   */

  let waterHours: number;

  switch (berry.growthTime) {
    case 16:
    case 20:
      waterHours = 10;
      break;

    case 42:
      waterHours = 12;
      break;

    default:
      waterHours = Math.floor(berry.growthTime / 2);
      break;
  }

  const nextWaterAt = new Date(
    plantedAt.getTime() +
      waterHours * 60 * 60 * 1000
  );

  const harvestAt = new Date(
    plantedAt.getTime() +
      berry.growthTime * 60 * 60 * 1000
  );

  return {
    plantedAt: plantedAt.toISOString(),
    nextWaterAt: nextWaterAt.toISOString(),
    harvestAt: harvestAt.toISOString(),
  };
}