export type Character = {
  id: string;
  name: string;

  plantedBerry?: string;

  plantedAt?: Date;

  nextWaterAt?: Date;

  harvestAt?: Date;
};
