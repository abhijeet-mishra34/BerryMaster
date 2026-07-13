import type { Berry } from "../types/Berry";

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

  /**
   * Watering Strategy
   *
   * 16h / 20h Berries
   * -----------------
   * Initial watering happens while planting.
   * One manual watering is required after 10 hours.
   *
   * 42h / 44h Berries
   * -----------------
   * No watering at planting.
   * First watering after 4 hours.
   * Then every 12 hours.
   */

  let firstWaterHours: number;

  switch (berry.growthTime) {
    case 16:
    case 20:
      firstWaterHours = 10;
      break;

    case 42:
    case 44:
      firstWaterHours = 4;
      break;

    default:
      firstWaterHours = Math.floor(
        berry.growthTime / 2
      );
      break;
  }

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