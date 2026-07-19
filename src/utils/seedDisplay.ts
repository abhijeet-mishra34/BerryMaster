import type { SeedType } from "../types/Berry";
import { seedSprites } from "../data/seedSprites";

export const seedDisplay: Record<
  SeedType,
  {
    name: string;
    icon: string;
    image: string;
  }
> = {
  plainSpicy: {
    name: "Plain Spicy Seed",
    icon: "🌶️",
    image: seedSprites.plainSpicy,
  },

  verySpicy: {
    name: "Very Spicy Seed",
    icon: "🌶️",
    image: seedSprites.verySpicy,
  },

  plainDry: {
    name: "Plain Dry Seed",
    icon: "🌾",
    image: seedSprites.plainDry,
  },

  veryDry: {
    name: "Very Dry Seed",
    icon: "🌾",
    image: seedSprites.veryDry,
  },

  plainSweet: {
    name: "Plain Sweet Seed",
    icon: "🍬",
    image: seedSprites.plainSweet,
  },

  verySweet: {
    name: "Very Sweet Seed",
    icon: "🍬",
    image: seedSprites.verySweet,
  },

  plainBitter: {
    name: "Plain Bitter Seed",
    icon: "🌰",
    image: seedSprites.plainBitter,
  },

  veryBitter: {
    name: "Very Bitter Seed",
    icon: "🌰",
    image: seedSprites.veryBitter,
  },

  plainSour: {
    name: "Plain Sour Seed",
    icon: "🍋",
    image: seedSprites.plainSour,
  },

  verySour: {
    name: "Very Sour Seed",
    icon: "🍋",
    image: seedSprites.verySour,
  },
};