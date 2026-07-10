import { Berry } from "../../types/Berry";


export const specialBerries: Berry[] = [

  {
    id: "lum",

    name: "Lum Berry",

    description: "Cures any status condition.",

    category: "Special",

    featured: true,

    tags: [
      "Competitive",
      "High Demand",
      "Status Cure"
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
          { seedType: "verySweet", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySpicy" },
      { seedType: "veryDry" },
      { seedType: "verySweet" }
    ]
  },


  {
    id: "enigma",

    name: "Enigma Berry",

    description: "Restores HP after being hit by a super effective move.",

    category: "Special",

    growthTime: 67,

    harvestWindow: 8,

    minYield: 7,
    maxYield: 10,

    recipes: [
      {
        name: "Official",

        ingredients: [
          { seedType: "verySpicy", quantity: 1 },
          { seedType: "veryDry", quantity: 1 },
          { seedType: "veryBitter", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySpicy" },
      { seedType: "veryDry" },
      { seedType: "veryBitter" }
    ]
  },


  {
    id: "lansat",

    name: "Lansat Berry",

    description: "Raises critical-hit ratio when HP is low.",

    category: "Special",

    growthTime: 67,

    harvestWindow: 8,

    minYield: 7,
    maxYield: 10,

    recipes: [
      {
        name: "Official",

        ingredients: [
          { seedType: "veryDry", quantity: 1 },
          { seedType: "verySweet", quantity: 1 },
          { seedType: "verySour", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "veryDry" },
      { seedType: "verySweet" },
      { seedType: "verySour" }
    ]
  },


  {
    id: "starf",

    name: "Starf Berry",

    description: "Raises a random stat when HP is low.",

    category: "Special",

    growthTime: 67,

    harvestWindow: 8,

    minYield: 7,
    maxYield: 10,

    recipes: [
      {
        name: "Official",

        ingredients: [
          { seedType: "verySweet", quantity: 1 },
          { seedType: "veryBitter", quantity: 1 },
          { seedType: "verySpicy", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySweet" },
      { seedType: "veryBitter" },
      { seedType: "verySpicy" }
    ]
  },


  {
    id: "micle",

    name: "Micle Berry",

    description: "Raises accuracy when HP is low.",

    category: "Special",

    growthTime: 67,

    harvestWindow: 8,

    minYield: 7,
    maxYield: 10,

    recipes: [
      {
        name: "Official",

        ingredients: [
          { seedType: "veryBitter", quantity: 1 },
          { seedType: "verySour", quantity: 1 },
          { seedType: "veryDry", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "veryBitter" },
      { seedType: "verySour" },
      { seedType: "veryDry" }
    ]
  },


  {
    id: "custap",

    name: "Custap Berry",

    description: "Allows moves to be used first when HP is low.",

    category: "Special",

    growthTime: 67,

    harvestWindow: 8,

    minYield: 7,
    maxYield: 10,

    recipes: [
      {
        name: "Official",

        ingredients: [
          { seedType: "verySour", quantity: 1 },
          { seedType: "verySpicy", quantity: 1 },
          { seedType: "veryBitter", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySour" },
      { seedType: "verySpicy" },
      { seedType: "veryBitter" }
    ]
  },


  {
    id: "jaboca",

    name: "Jaboca Berry",

    description: "Damages opponents that use physical attacks.",

    category: "Special",

    growthTime: 67,

    harvestWindow: 8,

    minYield: 7,
    maxYield: 10,

    recipes: [
      {
        name: "Official",

        ingredients: [
          { seedType: "veryDry", quantity: 1 },
          { seedType: "verySpicy", quantity: 1 },
          { seedType: "verySweet", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "veryDry" },
      { seedType: "verySpicy" },
      { seedType: "verySweet" }
    ]
  },


  {
    id: "rowap",

    name: "Rowap Berry",

    description: "Damages opponents that use special attacks.",

    category: "Special",

    growthTime: 67,

    harvestWindow: 8,

    minYield: 7,
    maxYield: 10,

    recipes: [
      {
        name: "Official",

        ingredients: [
          { seedType: "veryBitter", quantity: 1 },
          { seedType: "veryDry", quantity: 1 },
          { seedType: "verySweet", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "veryBitter" },
      { seedType: "veryDry" },
      { seedType: "verySweet" }
    ]
  }

];