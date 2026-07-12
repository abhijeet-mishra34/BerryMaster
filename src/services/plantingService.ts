import type { Berry } from "../types/Berry";
import type { Character } from "../types/Character";

import { calculatePlantTimers } from "../utils/timeCalculator";

/**
 * Returns an updated character after planting a berry.
 * This contains all planting-related game logic.
 */
export function plantBerryOnCharacter(
  character: Character,
  berry: Berry
): Character {
  const timers = calculatePlantTimers(berry);

  return {
    ...character,

    plantedBerryId: berry.id,

    plantedAt: timers.plantedAt,

    nextWaterAt: timers.nextWaterAt,

    harvestAt: timers.harvestAt,
  };
}