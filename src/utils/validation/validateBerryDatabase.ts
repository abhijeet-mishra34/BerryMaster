import { berryDatabase } from "../../data/berryDatabase";
export function validateBerryDatabase() {
  console.log("🍓 Running Berry Database Validation...");

  berryDatabase.forEach((berry, index) => {
    console.log(index, berry);

    console.log("checking categories");
    console.log(berry.categories);

    console.log("checking recipes");
    console.log(berry.recipes);

    console.log("checking seedDrops");
    console.log(berry.seedDrops);

    if (berry.categories.length === 0) {
      console.warn(`${berry.name} has no category`);
    }

    if (berry.recipes.length === 0) {
      console.warn(`${berry.name} has no recipes`);
    }

    if (berry.seedDrops.length === 0) {
      console.warn(`${berry.name} has no seed drops`);
    }
  });

  console.log("Done");
}