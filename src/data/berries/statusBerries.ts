import type { Berry } from "../../types/Berry";
import { BerryCategories } from "../../types/BerryCategories";

export const statusBerries: Berry[] = [
  {
    id: "cheri",
    name: "Cheri Berry",
    description: "Cures paralysis.",

    categories: [BerryCategories.STATUS],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [{ seedType: "plainSpicy", quantity: 3 }],
      },
    ],

    seedDrops: [
      { seedType: "plainSpicy" },
      { seedType: "verySpicy" },
    ],
  },

  {
    id: "chesto",
    name: "Chesto Berry",
    description: "Cures sleep.",

    categories: [BerryCategories.STATUS],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [{ seedType: "plainDry", quantity: 3 }],
      },
    ],

    seedDrops: [
      { seedType: "plainDry" },
      { seedType: "veryDry" },
    ],
  },

  {
    id: "pecha",
    name: "Pecha Berry",
    description: "Cures poison.",

    categories: [BerryCategories.STATUS],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [{ seedType: "plainSweet", quantity: 3 }],
      },
    ],

    seedDrops: [
      { seedType: "plainSweet" },
      { seedType: "verySweet" },
    ],
  },

  {
    id: "rawst",
    name: "Rawst Berry",
    description: "Cures burn.",

    categories: [BerryCategories.STATUS],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [{ seedType: "plainBitter", quantity: 3 }],
      },
    ],

    seedDrops: [
      { seedType: "plainBitter" },
      { seedType: "veryBitter" },
    ],
  },

  {
    id: "aspear",
    name: "Aspear Berry",
    description: "Cures freeze.",

    categories: [BerryCategories.STATUS],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [{ seedType: "plainSour", quantity: 3 }],
      },
    ],

    seedDrops: [
      { seedType: "plainSour" },
      { seedType: "verySour" },
    ],
  },

  {
    id: "persim",
    name: "Persim Berry",
    description: "Cures confusion.",

    categories: [BerryCategories.STATUS],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "plainSpicy", quantity: 1 },
          { seedType: "plainDry", quantity: 1 },
          { seedType: "plainSweet", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "plainSpicy" },
      { seedType: "verySpicy" },
      { seedType: "plainDry" },
      { seedType: "veryDry" },
      { seedType: "plainSweet" },
      { seedType: "verySweet" },
    ],
  },

  {
    id: "lum",
    name: "Lum Berry",
    description: "Cures all status conditions.",

    categories: [BerryCategories.STATUS,
                 BerryCategories.SPECIAL,
    ],

    growthTime: 44,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 10,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySpicy", quantity: 1 },
          { seedType: "veryDry", quantity: 1 },
          { seedType: "verySweet", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "plainSpicy" },
      { seedType: "verySpicy" },
      { seedType: "plainDry" },
      { seedType: "veryDry" },
      { seedType: "plainSweet" },
      { seedType: "verySweet" },
    ],
  },
];