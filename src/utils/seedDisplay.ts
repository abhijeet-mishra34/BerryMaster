import type { SeedType } from "../types/Berry";

export const seedDisplay: Record<
  SeedType,
  {
    name: string;
    icon: string;
  }
> = {
  plainSpicy: {
    name: "Plain Spicy Seed",
    icon: "🌶️",
  },

  verySpicy: {
    name: "Very Spicy Seed",
    icon: "🌶️",
  },

  plainDry: {
    name: "Plain Dry Seed",
    icon: "🌾",
  },

  veryDry: {
    name: "Very Dry Seed",
    icon: "🌾",
  },

  plainSweet: {
    name: "Plain Sweet Seed",
    icon: "🍬",
  },

  verySweet: {
    name: "Very Sweet Seed",
    icon: "🍬",
  },

  plainBitter: {
    name: "Plain Bitter Seed",
    icon: "🌰",
  },

  veryBitter: {
    name: "Very Bitter Seed",
    icon: "🌰",
  },

  plainSour: {
    name: "Plain Sour Seed",
    icon: "🍋",
  },

  verySour: {
    name: "Very Sour Seed",
    icon: "🍋",
  },
};