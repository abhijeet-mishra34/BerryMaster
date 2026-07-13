import type { Berry } from "../types/Berry";

export function calculateNextWaterTime(
  berry: Berry,
  wateringCount: number,
  now = new Date()
): string | undefined {

  switch (berry.growthTime) {

    // -----------------------------
    // 16 & 20 Hour Berries
    // -----------------------------
    case 16:
    case 20:

      // Only ONE manual watering.
      if (wateringCount >= 1) {
        return undefined;
      }

      return new Date(
        now.getTime() +
        10 * 60 * 60 * 1000
      ).toISOString();

    // -----------------------------
    // 42 & 44 Hour Berries
    // -----------------------------
    case 42:
    case 44:

      // Four manual waterings.
      if (wateringCount >= 4) {
        return undefined;
      }

      // First watering → every future watering
      // is always 12 hours later.
      return new Date(
        now.getTime() +
        12 * 60 * 60 * 1000
      ).toISOString();

    default:
      return undefined;
  }
}