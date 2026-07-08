export type Character = {
  id: string;
  name: string;

  plantedBerry?: Berry;

  plantedAt?: Date;

  nextWaterAt?: Date;

  harvestAt?: Date;
};
