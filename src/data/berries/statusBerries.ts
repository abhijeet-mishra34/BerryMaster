import type { Berry } from "../../types/Berry";
import { BerryCategories } from "../../types/BerryCategories";
import { berrySprites } from "../berrySprites";

export const statusBerries: Berry[] = [
  {
    id: "cheri",
    name: "Cheri Berry",
    image: berrySprites.cheri,
    description: "Cures paralysis.",

    categories: [BerryCategories.STATUS],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "plainSpicy", quantity: 3 },
        ],
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
    image: berrySprites.chesto,
    description: "Cures sleep.",

    categories: [BerryCategories.STATUS],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "plainDry", quantity: 3 },
        ],
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
    image: berrySprites.pecha,
    description: "Cures poison.",

    categories: [BerryCategories.STATUS],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "plainSweet", quantity: 3 },
        ],
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
    image: berrySprites.rawst,
    description: "Cures burn.",

    categories: [BerryCategories.STATUS],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "plainBitter", quantity: 3 },
        ],
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
    image: berrySprites.aspear,
    description: "Cures freeze.",

    categories: [BerryCategories.STATUS],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "plainSour", quantity: 3 },
        ],
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
    image: berrySprites.persim,
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
    image: berrySprites.lum,
    description: "Cures all status conditions.",

    categories: [
      BerryCategories.STATUS,
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