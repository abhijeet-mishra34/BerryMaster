import type { Berry } from "../types/Berry";
import type { Character } from "../types/Character";

import { calculatePlantTimers } from "../utils/timeCalculator";

import { getFarmingProfile } from "../data/farmingProfiles";

/**
 * Returns an updated character after planting a berry.
 * This contains all planting-related game logic.
 */
export function plantBerryOnCharacter(
  character: Character,
  berry: Berry
): Character {
  const timers = calculatePlantTimers(berry);

  const profile = getFarmingProfile(
    berry.growthTime
  );

  return {
    ...character,

    plantedBerryId: berry.id,

    plantedAt: timers.plantedAt,

    lastWateredAt: profile.autoWaterOnPlant
      ? timers.plantedAt
      : undefined,

    wateringCount: profile.autoWaterOnPlant
      ? 1
      : 0,

    nextWaterAt: timers.nextWaterAt,

    harvestAt: timers.harvestAt,

    wiltAt: timers.wiltAt,
  };
}