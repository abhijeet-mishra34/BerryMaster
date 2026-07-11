import type { Berry } from "../../types/Berry";
import { BerryCategories } from "../../types/BerryCategories";

export const typeResistanceBerries: Berry[] = [
  {
    id: "occa",
    name: "Occa Berry",
    description: "Weakens a super effective Fire-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySpicy", quantity: 3 },
          { seedType: "verySweet", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySpicy" },
      { seedType: "verySweet" },
    ],
  },

  {
    id: "passho",
    name: "Passho Berry",
    description: "Weakens a super effective Water-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryDry", quantity: 3 },
          { seedType: "veryBitter", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "veryDry" },
      { seedType: "veryBitter" },
    ],
  },

  {
    id: "wacan",
    name: "Wacan Berry",
    description: "Weakens a super effective Electric-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySweet", quantity: 3 },
          { seedType: "verySour", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySweet" },
      { seedType: "verySour" },
    ],
  },

  {
    id: "rindo",
    name: "Rindo Berry",
    description: "Weakens a super effective Grass-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryBitter", quantity: 3 },
          { seedType: "verySpicy", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "veryBitter" },
      { seedType: "verySpicy" },
    ],
  },

  {
    id: "yache",
    name: "Yache Berry",
    description: "Weakens a super effective Ice-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySour", quantity: 3 },
          { seedType: "veryDry", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySour" },
      { seedType: "veryDry" },
    ],
  },

  {
    id: "chople",
    name: "Chople Berry",
    description: "Weakens a super effective Fighting-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySpicy", quantity: 3 },
          { seedType: "veryBitter", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySpicy" },
      { seedType: "veryBitter" },
    ],
  },

  {
    id: "kebia",
    name: "Kebia Berry",
    description: "Weakens a super effective Poison-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryDry", quantity: 3 },
          { seedType: "verySour", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "veryDry" },
      { seedType: "verySour" },
    ],
  },

  {
    id: "shuca",
    name: "Shuca Berry",
    description: "Weakens a super effective Ground-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySweet", quantity: 3 },
          { seedType: "verySpicy", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySweet" },
      { seedType: "verySpicy" },
    ],
  },

  {
    id: "coba",
    name: "Coba Berry",
    description: "Weakens a super effective Flying-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySpicy", quantity: 3 },
          { seedType: "veryDry", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySpicy" },
      { seedType: "veryDry" },
    ],
  },

  {
    id: "payapa",
    name: "Payapa Berry",
    description: "Weakens a super effective Psychic-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySweet", quantity: 3 },
          { seedType: "veryBitter", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySweet" },
      { seedType: "veryBitter" },
    ],
  },

  {
    id: "tanga",
    name: "Tanga Berry",
    description: "Weakens a super effective Bug-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryDry", quantity: 3 },
          { seedType: "verySpicy", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "veryDry" },
      { seedType: "verySpicy" },
    ],
  },

  {
    id: "charti",
    name: "Charti Berry",
    description: "Weakens a super effective Rock-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryBitter", quantity: 3 },
          { seedType: "veryDry", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "veryBitter" },
      { seedType: "veryDry" },
    ],
  },

  {
    id: "kasib",
    name: "Kasib Berry",
    description: "Weakens a super effective Ghost-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySour", quantity: 3 },
          { seedType: "verySweet", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySour" },
      { seedType: "verySweet" },
    ],
  },

  {
    id: "haban",
    name: "Haban Berry",
    description: "Weakens a super effective Dragon-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySweet", quantity: 3 },
          { seedType: "verySour", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySweet" },
      { seedType: "verySour" },
    ],
  },

  {
    id: "colbur",
    name: "Colbur Berry",
    description: "Weakens a super effective Dark-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryBitter", quantity: 3 },
          { seedType: "verySweet", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "veryBitter" },
      { seedType: "verySweet" },
    ],
  },

  {
    id: "babiri",
    name: "Babiri Berry",
    description: "Weakens a super effective Steel-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryDry", quantity: 3 },
          { seedType: "verySweet", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "veryDry" },
      { seedType: "verySweet" },
    ],
  },

  {
    id: "chilan",
    name: "Chilan Berry",
    description: "Weakens a super effective Normal-type move.",

    categories: [BerryCategories.TYPE_RESIST],

    growthTime: 42,
    harvestWindow: 8,

    minYield: 7,
    maxYield: 9,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySweet", quantity: 3 },
          { seedType: "veryDry", quantity: 2 },
        ],
      },
    ],

    seedDrops: [
      { seedType: "verySweet" },
      { seedType: "veryDry" },
    ],
  },
];