import type { Character } from "../types/Character";

export type FarmStats = {
  totalCharacters: number;

   planted: number;

  growing: number;
  
  needWater: number;
  
  readyHarvest: number;
  
  wilted: number;
};

export function calculateFarmStats(
  characters: Character[],
): FarmStats {

  const now = Date.now();

  const stats: FarmStats = {
    totalCharacters: characters.length,
    growing: 0,
    planted: 0,
    needWater: 0,
    readyHarvest: 0,
    wilted: 0,
  };

  for (const character of characters) {

    if (!character.plantedBerryId) {
      continue;
    }
  stats.planted++;
    const harvestTime =
      character.harvestAt
        ? new Date(character.harvestAt).getTime()
        : undefined;

    const wiltTime =
      character.wiltAt
        ? new Date(character.wiltAt).getTime()
        : undefined;

    const nextWaterTime =
      character.nextWaterAt
        ? new Date(character.nextWaterAt).getTime()
        : undefined;

    // Wilted
    if (wiltTime && now >= wiltTime) {
      stats.wilted++;
      continue;
    }

    // Ready to Harvest
    if (harvestTime && now >= harvestTime) {
      stats.readyHarvest++;
      continue;
    }

    // Needs Water
    if (nextWaterTime && now >= nextWaterTime) {
      stats.needWater++;
      continue;
    }

    // Otherwise...
    stats.growing++;
  }

  return stats;
}