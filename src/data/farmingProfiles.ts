export interface FarmingProfile {
  growthTime: number;

  autoWaterOnPlant: boolean;

  firstWaterAfterHours: number;

  repeatWaterEveryHours: number;

  totalWaterings: number;

  harvestWindowHours: number;
}

export const farmingProfiles: FarmingProfile[] = [
  {
  growthTime: 0.0333,

  autoWaterOnPlant: false,

  // 1 minute after planting
  firstWaterAfterHours: 0.0167,

  // Every minute afterwards
  repeatWaterEveryHours: 0.0167,

  // One manual watering only
  totalWaterings: 1,

  // 1 minute harvest window
  harvestWindowHours: 0.0167,
},
  {
    growthTime: 16,

    autoWaterOnPlant: true,

    firstWaterAfterHours: 0,

    repeatWaterEveryHours: 10,

    totalWaterings: 2,

    harvestWindowHours: 8,
  },

  {
    growthTime: 20,

    autoWaterOnPlant: true,

    firstWaterAfterHours: 0,

    repeatWaterEveryHours: 10,

    totalWaterings: 2,

    harvestWindowHours: 8,
  },

  {
    growthTime: 42,

    autoWaterOnPlant: false,

    firstWaterAfterHours: 3,

    repeatWaterEveryHours: 12,

    totalWaterings: 3,

    harvestWindowHours: 8,
  },

  {
    growthTime: 44,

    autoWaterOnPlant: false,

    firstWaterAfterHours: 3,

    repeatWaterEveryHours: 12,

    totalWaterings: 3,

    harvestWindowHours: 8,
  },

  {
    growthTime: 67,

    autoWaterOnPlant: false,

    firstWaterAfterHours: 3,

    repeatWaterEveryHours: 12,

    totalWaterings: 6,

    harvestWindowHours: 8,
  },
];

export function getFarmingProfile(
  growthTime: number
) {
  const profile = farmingProfiles.find(
    (p) => p.growthTime === growthTime
  );

  if (!profile) {
    throw new Error(
      `No farming profile found for ${growthTime} hour berries.`
    );
  }

  return profile;
}