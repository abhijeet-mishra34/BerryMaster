import { berryDatabase } from "../../data/berryDatabase";

export function validateBerryDatabase() {
  if (!import.meta.env.DEV) return;

  berryDatabase.forEach((berry) => {
    if (!berry.categories || berry.categories.length === 0) {
      console.warn(`[BerryMaster] ${berry.name} has no category`);
    }

    if (!berry.recipes || berry.recipes.length === 0) {
      console.warn(`[BerryMaster] ${berry.name} has no recipes`);
    }

    if (!berry.seedDrops || berry.seedDrops.length === 0) {
      console.warn(`[BerryMaster] ${berry.name} has no seed drops`);
    }
  });
}