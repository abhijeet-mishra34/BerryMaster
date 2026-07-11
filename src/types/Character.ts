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

  nextWaterAt?: string;

  harvestAt?: string;
};