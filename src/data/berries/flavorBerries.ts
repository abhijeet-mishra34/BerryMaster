import type { Berry } from "../../types/Berry";
import { BerryCategories } from "../../types/BerryCategories";

export const flavorBerries: Berry[] = [
  {
    id: "razz",
    name: "Razz Berry",
    description: "A spicy flavored berry.",

    categories: [BerryCategories.FLAVOR],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySpicy", quantity: 1 },
          { seedType: "plainDry", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySpicy" },
      { seedType: "plainDry" },
    ],
  },

  {
    id: "bluk",
    name: "Bluk Berry",
    description: "A sweet flavored berry.",

    categories: [BerryCategories.FLAVOR],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "plainSweet", quantity: 2 },
          { seedType: "plainDry", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "plainSweet" },
      { seedType: "plainDry" },
    ],
  },

  {
    id: "nanab",
    name: "Nanab Berry",
    description: "A sweet and bitter flavored berry.",

    categories: [BerryCategories.FLAVOR],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "plainSweet", quantity: 2 },
          { seedType: "plainBitter", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "plainSweet" },
      { seedType: "plainBitter" },
    ],
  },

  {
    id: "wepear",
    name: "Wepear Berry",
    description: "A sour flavored berry.",

    categories: [BerryCategories.FLAVOR],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "plainSour", quantity: 2 },
          { seedType: "veryBitter", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "plainSour" },
      { seedType: "veryBitter" },
    ],
  },

  {
    id: "pinap",
    name: "Pinap Berry",
    description: "A spicy and sour flavored berry.",

    categories: [BerryCategories.FLAVOR],

    growthTime: 16,
    harvestWindow: 8,

    minYield: 3,
    maxYield: 6,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "plainSpicy", quantity: 1 },
          { seedType: "plainSour", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "plainSpicy" },
      { seedType: "plainSour" },
    ],
  },

  {
    id: "cornn",
    name: "Cornn Berry",
    description: "A dry flavored berry.",

    categories: [BerryCategories.FLAVOR],

    growthTime: 20,
    harvestWindow: 8,

    minYield: 4,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryDry", quantity: 3 },
          { seedType: "plainSweet", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "veryDry" },
      { seedType: "plainSweet" },
    ],
  },

  {
    id: "magost",
    name: "Magost Berry",
    description: "A sweet flavored berry.",

    categories: [BerryCategories.FLAVOR],

    growthTime: 20,
    harvestWindow: 8,

    minYield: 4,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySweet", quantity: 3 },
          { seedType: "plainBitter", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySweet" },
      { seedType: "plainBitter" },
    ],
  },

  {
    id: "rabuta",
    name: "Rabuta Berry",
    description: "A bitter flavored berry.",

    categories: [BerryCategories.FLAVOR],

    growthTime: 20,
    harvestWindow: 8,

    minYield: 4,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryBitter", quantity: 3 },
          { seedType: "plainSour", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "veryBitter" },
      { seedType: "plainSour" },
    ],
  },

  {
    id: "nomel",
    name: "Nomel Berry",
    description: "A sour flavored berry.",

    categories: [BerryCategories.FLAVOR],

    growthTime: 20,
    harvestWindow: 8,

    minYield: 4,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySour", quantity: 3 },
          { seedType: "plainSpicy", quantity: 1 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySour" },
      { seedType: "plainSpicy" },
    ],
  },
];