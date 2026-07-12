import type { Character } from "../types/Character";
import type { Berry } from "../types/Berry";

import { calculateNextWaterTime } from "../utils/wateringCalculator";

/**
 * Waters a planted berry and updates
 * the character's farming timers.
 */
export function waterBerryOnCharacter(
  character: Character,
  berry: Berry
): Character {
  const now = new Date();

  const wateringCount =
    (character.wateringCount ?? 0) + 1;

  return {
    ...character,

    lastWateredAt: now.toISOString(),

    wateringCount,

    nextWaterAt: calculateNextWaterTime(
      berry,
      wateringCount,
      now
    ),
  };
}