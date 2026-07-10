import { Berry } from "../../types/Berry";


export const evBerries: Berry[] = [

  {
    id: "pomeg",

    name: "Pomeg Berry",

    description: "Lowers HP EVs.",

    category: "EV",

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
          { seedType: "plainSweet", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySpicy" },
      { seedType: "veryDry" },
      { seedType: "plainSweet" }
    ]
  },


  {
    id: "kelpsy",

    name: "Kelpsy Berry",

    description: "Lowers Attack EVs.",

    category: "EV",

    growthTime: 44,

    harvestWindow: 8,

    minYield: 7,
    maxYield: 10,

    recipes: [
      {
        name: "Official",

        ingredients: [
          { seedType: "veryDry", quantity: 1 },
          { seedType: "verySweet", quantity: 1 },
          { seedType: "plainBitter", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "veryDry" },
      { seedType: "verySweet" },
      { seedType: "plainBitter" }
    ]
  },


  {
    id: "qualot",

    name: "Qualot Berry",

    description: "Lowers Defense EVs.",

    category: "EV",

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
          { seedType: "plainSour", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySweet" },
      { seedType: "veryBitter" },
      { seedType: "plainSour" }
    ]
  },


  {
    id: "hondew",

    name: "Hondew Berry",

    description: "Lowers Sp. Attack EVs.",

    category: "EV",

    growthTime: 44,

    harvestWindow: 8,

    minYield: 7,
    maxYield: 10,

    recipes: [
      {
        name: "Official",

        ingredients: [
          { seedType: "veryBitter", quantity: 1 },
          { seedType: "verySour", quantity: 1 },
          { seedType: "plainSpicy", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "veryBitter" },
      { seedType: "verySour" },
      { seedType: "plainSpicy" }
    ]
  },


  {
    id: "grepa",

    name: "Grepa Berry",

    description: "Lowers Sp. Defense EVs.",

    category: "EV",

    growthTime: 44,

    harvestWindow: 8,

    minYield: 7,

    maxYield: 10,

    recipes: [
      {
        name: "Official",

        ingredients: [
          { seedType: "verySour", quantity: 1 },
          { seedType: "verySpicy", quantity: 1 },
          { seedType: "plainDry", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "verySour" },
      { seedType: "verySpicy" },
      { seedType: "plainDry" }
    ]
  },


  {
    id: "tamato",

    name: "Tamato Berry",

    description: "Lowers Speed EVs.",

    category: "EV",

    growthTime: 44,

    harvestWindow: 8,

    minYield: 7,

    maxYield: 10,

    recipes: [
      {
        name: "Official",

        ingredients: [
          { seedType: "plainDry", quantity: 1 },
          { seedType: "verySweet", quantity: 1 },
          { seedType: "verySour", quantity: 1 }
        ]
      }
    ],

    possibleSeedDrops: [
      { seedType: "plainDry" },
      { seedType: "verySweet" },
      { seedType: "verySour" }
    ]
  }

];