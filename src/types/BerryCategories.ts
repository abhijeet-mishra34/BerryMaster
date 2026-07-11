// BerryCategories.ts

export const BerryCategories = {
  STATUS: "Status",
  HEALING: "Healing",
  PP_RECOVERY: "PP Recovery",
  FLAVOR: "Flavor",
  EV: "EV",
  TYPE_RESIST: "Type Resist",
  SPECIAL: "Special",
} as const;

export type BerryCategory =
  (typeof BerryCategories)[keyof typeof BerryCategories];