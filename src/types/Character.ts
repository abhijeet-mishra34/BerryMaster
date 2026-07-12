export type Character = {
  id: string;
  name: string;

  /**
   * References Berry.id
   */
  plantedBerryId?: string;

  /**
   * ISO date strings
   */
  plantedAt?: string;

  /**
   * Last time the berry plant was watered.
   *
   * The initial watering happens immediately after planting.
   */
  lastWateredAt?: string;

  /**
   * Number of completed watering actions.
   *
   * 1 = Initial watering at planting
   * 2 = First manual watering
   * 3 = Second manual watering
   * etc.
   */
  wateringCount?: number;

  /**
   * Recommended next watering time.
   */
  nextWaterAt?: string;

  /**
   * Harvest ready time.
   */
  harvestAt?: string;
};