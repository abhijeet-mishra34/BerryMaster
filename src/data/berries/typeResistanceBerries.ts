import type { Berry } from "../../types/Berry";
import { BerryCategories } from "../../types/BerryCategories";
import { berrySprites } from "../berrySprites";

export const typeResistanceBerries: Berry[] = [
  {
    id: "occa",
    name: "Occa Berry",
    image: berrySprites.occa,
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
    image: berrySprites.passho,
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
    image: berrySprites.wacan,
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
    image: berrySprites.rindo,
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
    image: berrySprites.yache,
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
    image: berrySprites.chople,
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
    image: berrySprites.kebia,
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
    image: berrySprites.shuca,
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
    image: berrySprites.coba,
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
    image: berrySprites.payapa,
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
    image: berrySprites.tanga,
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
    image: berrySprites.charti,
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
    image: berrySprites.kasib,
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
    image: berrySprites.haban,
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
    image: berrySprites.colbur,
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
    image: berrySprites.babiri,
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
    image: berrySprites.chilan,
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