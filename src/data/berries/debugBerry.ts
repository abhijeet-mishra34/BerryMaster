import type { Berry } from "../../types/Berry";
import { BerryCategories } from "../../types/BerryCategories";

export const debugBerry: Berry = {
  id: "debug",

  name: "🧪 Debug Berry",

  description:
    "The 'GOD OF BERRIES ☢️',the official fuel of BerryMaster development. Grows faster than your code compiles. Beware ⚠️ : 🛠️ ONLY FOR DEVELOPERS USE,PLANT IT ON YOUR OWN RiSK ⚡",

  categories: [BerryCategories.SPECIAL],

  growthTime: 0.0333,

  harvestWindow: 0.0167,

  minYield: 1,

  maxYield: 1,

  recipes: [
  {
    name: "Developer",
    ingredients: [
      {
        seedType: "plainSpicy",
        quantity: 1,
      },
    ],
  },
],

seedDrops: [
  {
    seedType: "plainSpicy",
    },
],

  tags: [
    "Developer",
    "Testing",
    "Debug",
  ],

  featured: true,

  developerOnly: true,
};