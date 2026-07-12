import type { Character } from "../types/Character";

export function canWater(
  character: Character,
  now: Date
) {
  if (
    !character.plantedBerryId ||
    !character.nextWaterAt
  ) {
    return false;
  }

  return new Date(character.nextWaterAt) <= now;
}