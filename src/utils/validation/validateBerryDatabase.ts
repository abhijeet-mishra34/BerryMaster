import { berryDatabase } from "../../data/berryDatabase";

export function validateBerryDatabase() {
  const ids = new Set<string>();
  const names = new Set<string>();

  console.log("🍓 Running Berry Database Validation...\n");

  berryDatabase.forEach((berry) => {

    if (ids.has(berry.id)) {
      console.warn(`❌ Duplicate ID: ${berry.id}`);
    }

    ids.add(berry.id);

    if (names.has(berry.name)) {
      console.warn(`❌ Duplicate Name: ${berry.name}`);
    }

    names.add(berry.name);

    if (berry.categories.length === 0) {
      console.warn(`⚠️ ${berry.name} has no category.`);
    }

    if (!berry.recipes.length) {
      console.warn(`⚠️ ${berry.name} has no recipes.`);
    }

    // FIXED: possibleSeedDrops → seedDrops
    if (!berry.seedDrops.length) {
      console.warn(`⚠️ ${berry.name} has no seed drops.`);
    }

    if (berry.minYield > berry.maxYield) {
      console.warn(`❌ Invalid yield on ${berry.name}`);
    }

    if (berry.growthTime <= 0) {
      console.warn(`❌ Invalid growth time on ${berry.name}`);
    }

    if (berry.harvestWindow <= 0) {
      console.warn(`❌ Invalid harvest window on ${berry.name}`);
    }

  });

  console.log("\n✅ Berry Database Validation Complete");
}