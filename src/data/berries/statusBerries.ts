import { Berry } from "../../types/Berry";

export const statusBerries: Berry[] = [
  {
    id: "cheri",
    name: "Cheri Berry",
    description: "Cures paralysis.",
    category: "Status",

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

    possibleSeedDrops: [
      { seedType: "plainSpicy" },
      { seedType: "verySpicy" },
    ],
  },

  {
    id: "chesto",
    name: "Chesto Berry",
    description: "Cures sleep.",
    category: "Status",

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

    possibleSeedDrops: [
      { seedType: "plainDry" },
      { seedType: "veryDry" },
    ],
  },

  {
    id: "pecha",
    name: "Pecha Berry",
    description: "Cures poison.",
    category: "Status",

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

    possibleSeedDrops: [
      { seedType: "plainSweet" },
      { seedType: "verySweet" },
    ],
  },

  {
    id: "rawst",
    name: "Rawst Berry",
    description: "Cures burn.",
    category: "Status",

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

    possibleSeedDrops: [
      { seedType: "plainBitter" },
      { seedType: "veryBitter" },
    ],
  },

  {
    id: "aspear",
    name: "Aspear Berry",
    description: "Cures freeze.",
    category: "Status",

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

    possibleSeedDrops: [
      { seedType: "plainSour" },
      { seedType: "verySour" },
    ],
  },

  {
    id: "persim",
    name: "Persim Berry",
    description: "Cures confusion.",
    category: "Status",

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

    possibleSeedDrops: [
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
    category: "Status",

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

    possibleSeedDrops: [
      { seedType: "plainSpicy" },
      { seedType: "verySpicy" },
      { seedType: "plainDry" },
      { seedType: "veryDry" },
      { seedType: "plainSweet" },
      { seedType: "verySweet" },
    ],
  },
];