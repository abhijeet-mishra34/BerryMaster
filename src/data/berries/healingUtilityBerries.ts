import type { Berry } from "../../types/Berry";
import { BerryCategories } from "../../types/BerryCategories";
import { berrySprites } from "../berrySprites";

export const healingUtilityBerries: Berry[] = [
  {
    id: "oran",
    name: "Oran Berry",
    image: berrySprites.oran,
    description: "Restores 10 HP when consumed.",

    categories: [BerryCategories.HEALING],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "plainDry", quantity: 1 },
          { seedType: "plainBitter", quantity: 1 },
          { seedType: "plainSour", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "plainDry" },
      { seedType: "plainBitter" },
      { seedType: "plainSour" },
    ],
  },

  {
    id: "sitrus",
    name: "Sitrus Berry",
    image: berrySprites.sitrus,
    description: "Restores 25% of maximum HP.",

    categories: [BerryCategories.HEALING],

    growthTime: 44,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 10,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySweet", quantity: 1 },
          { seedType: "veryBitter", quantity: 1 },
          { seedType: "verySour", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySweet" },
      { seedType: "veryBitter" },
      { seedType: "verySour" },
    ],
  },

  {
    id: "leppa",
    name: "Leppa Berry",
    image: berrySprites.leppa,
    description: "Restores 10 PP of a move.",

    categories: [
      BerryCategories.HEALING,
      BerryCategories.PP_RECOVERY,
    ],

    growthTime: 20,
    harvestWindow: 8,

    minYield: 5,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySpicy", quantity: 1 },
          { seedType: "plainSweet", quantity: 1 },
          { seedType: "plainBitter", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySpicy" },
      { seedType: "plainSweet" },
      { seedType: "plainBitter" },
    ],

    featured: true,

    tags: [
      "pp",
      "recovery",
      "farming",
      "popular",
    ],
  },

  {
    id: "figy",
    name: "Figy Berry",
    image: berrySprites.figy,
    description:
      "Restores HP. May confuse Pokémon with low Spicy preference.",

    categories: [BerryCategories.HEALING],

    growthTime: 20,
    harvestWindow: 8,

    minYield: 5,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySpicy", quantity: 1 },
          { seedType: "plainSweet", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySpicy" },
      { seedType: "plainSweet" },
    ],
  },

  {
    id: "wiki",
    name: "Wiki Berry",
    image: berrySprites.wiki,
    description:
      "Restores HP. May confuse Pokémon with low Dry preference.",

    categories: [BerryCategories.HEALING],

    growthTime: 20,
    harvestWindow: 8,

    minYield: 5,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryDry", quantity: 1 },
          { seedType: "plainBitter", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "veryDry" },
      { seedType: "plainBitter" },
    ],
  },

  {
    id: "mago",
    name: "Mago Berry",
    image: berrySprites.mago,
    description:
      "Restores HP. May confuse Pokémon with low Sweet preference.",

    categories: [BerryCategories.HEALING],

    growthTime: 20,
    harvestWindow: 8,

    minYield: 5,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySweet", quantity: 1 },
          { seedType: "plainSour", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySweet" },
      { seedType: "plainSour" },
    ],
  },

  {
    id: "aguav",
    name: "Aguav Berry",
    image: berrySprites.aguav,
    description:
      "Restores HP. May confuse Pokémon with low Bitter preference.",

    categories: [BerryCategories.HEALING],

    growthTime: 20,
    harvestWindow: 8,

    minYield: 5,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryBitter", quantity: 1 },
          { seedType: "plainSpicy", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "veryBitter" },
      { seedType: "plainSpicy" },
    ],
  },

  {
    id: "iapapa",
    name: "Iapapa Berry",
    image: berrySprites.iapapa,
    description:
      "Restores HP. May confuse Pokémon with low Sour preference.",

    categories: [BerryCategories.HEALING],

    growthTime: 20,
    harvestWindow: 8,

    minYield: 5,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySour", quantity: 1 },
          { seedType: "plainDry", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySour" },
      { seedType: "plainDry" },
    ],
  },
];