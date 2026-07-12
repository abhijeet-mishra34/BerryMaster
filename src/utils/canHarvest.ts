import type { Character } from "../types/Character";

export function canHarvest(
  character: Character,
  now: Date
) {
  if (
    !character.plantedBerryId ||
    !character.harvestAt
  ) {
    return false;
  }

  return new Date(character.harvestAt) <= now;
}