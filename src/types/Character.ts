import type { Berry } from "./Berry";

export interface Character {
  id: string;
  name: string;

  // Currently planted berry
  plantedBerryId?: Berry["id"];

  // Farming lifecycle
  plantedAt?: string;

  lastWateredAt?: string;

  nextWaterAt?: string;

  harvestAt?: string;

  wiltAt?: string;

  wateringCount?: number;
}