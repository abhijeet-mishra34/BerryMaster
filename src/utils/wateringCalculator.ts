import type { Berry } from "../types/Berry";

export function calculateNextWaterTime(
  berry: Berry,
  wateringCount: number,
  now = new Date()
): string | undefined {

  switch (berry.growthTime) {

    case 16:
    case 20:

      // After the second watering,
      // no more watering is needed.
      if (wateringCount >= 2) {
        return undefined;
      }

      return new Date(
        now.getTime() +
        10 * 60 * 60 * 1000
      ).toISOString();

    case 42:

      // Placeholder.
      return new Date(
        now.getTime() +
        12 * 60 * 60 * 1000
      ).toISOString();

    default:

      return undefined;
  }
}