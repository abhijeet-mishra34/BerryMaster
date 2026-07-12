import type { Character } from "../types/Character";

/**
 * Resets a character after harvesting.
 */
export function harvestBerryOnCharacter(
  character: Character
): Character {
  return {
    ...character,

    plantedBerryId: undefined,
    plantedAt: undefined,

    lastWateredAt: undefined,
    wateringCount: undefined,

    nextWaterAt: undefined,
    harvestAt: undefined,
  };
}