import { Berry } from "../../types/Berry";

export const healingUtilityBerries: Berry[] = [

  {
    id: "oran",
    name: "Oran Berry",

    description: "Restores 10 HP when consumed.",

    category: "Healing",

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
          { seedType: "plainSour", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "plainDry" },
      { seedType: "plainBitter" },
      { seedType: "plainSour" }
    ]
  },


  {
    id: "sitrus",
    name: "Sitrus Berry",

    description: "Restores 25% of maximum HP.",

    category: "Healing",

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
          { seedType: "verySour", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySweet" },
      { seedType: "veryBitter" },
      { seedType: "verySour" }
    ]
  },


  {
  id: "leppa",

  name: "Leppa Berry",

  description: "Restores 10 PP of a move.",

  category: "PP Recovery",

  featured: true,

  tags: [
    "PP Recovery",
    "Popular Farming Berry",
    "High Demand"
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
          { seedType: "plainBitter", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySpicy" },
      { seedType: "plainSweet" },
      { seedType: "plainBitter" }
    ]
  },


  {
    id: "figy",
    name: "Figy Berry",

    description: "Restores HP. May confuse Pokémon with low Spicy preference.",

    category: "Healing",

    growthTime: 20,
    harvestWindow: 8,

    minYield: 5,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySpicy", quantity: 1 },
          { seedType: "plainSweet", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySpicy" },
      { seedType: "plainSweet" }
    ]
  },


  {
    id: "wiki",
    name: "Wiki Berry",

    description: "Restores HP. May confuse Pokémon with low Dry preference.",

    category: "Healing",

    growthTime: 20,
    harvestWindow: 8,

    minYield: 5,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryDry", quantity: 1 },
          { seedType: "plainBitter", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "veryDry" },
      { seedType: "plainBitter" }
    ]
  },


  {
    id: "mago",
    name: "Mago Berry",

    description: "Restores HP. May confuse Pokémon with low Sweet preference.",

    category: "Healing",

    growthTime: 20,
    harvestWindow: 8,

    minYield: 5,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySweet", quantity: 1 },
          { seedType: "plainSour", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySweet" },
      { seedType: "plainSour" }
    ]
  },


  {
    id: "aguav",
    name: "Aguav Berry",

    description: "Restores HP. May confuse Pokémon with low Bitter preference.",

    category: "Healing",

    growthTime: 20,
    harvestWindow: 8,

    minYield: 5,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "veryBitter", quantity: 1 },
          { seedType: "plainSpicy", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "veryBitter" },
      { seedType: "plainSpicy" }
    ]
  },


  {
    id: "iapapa",
    name: "Iapapa Berry",

    description: "Restores HP. May confuse Pokémon with low Sour preference.",

    category: "Healing",

    growthTime: 20,
    harvestWindow: 8,

    minYield: 5,
    maxYield: 7,

    recipes: [
      {
        name: "Official",
        ingredients: [
          { seedType: "verySour", quantity: 1 },
          { seedType: "plainDry", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySour" },
      { seedType: "plainDry" }
    ]
  }

];