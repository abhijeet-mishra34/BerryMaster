import type { Character } from "../types/Character";
import type { PlantStatus } from "../types/PlantStatus";

export function getPlantStatus(
  character: Character,
  now = new Date()
): PlantStatus {
  if (
    !character.plantedBerryId ||
    !character.wateringCount
  ) {
    return "idle";
  }

  if (
    character.harvestAt &&
    new Date(character.harvestAt) <= now
  ) {
    return "readyToHarvest";
  }

  if (
    character.nextWaterAt &&
    new Date(character.nextWaterAt) <= now
  ) {
    return "readyToWater";
  }

  return "growing";
}