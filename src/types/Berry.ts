import type { BerryCategory } from "./BerryCategories";

export type SeedType =
  | "plainSpicy"
  | "verySpicy"
  | "plainDry"
  | "veryDry"
  | "plainSweet"
  | "verySweet"
  | "plainBitter"
  | "veryBitter"
  | "plainSour"
  | "verySour";

export interface SeedRequirement {
  seedType: SeedType;
  quantity: number;
}

export interface BerryRecipe {
  /**
   * Example:
   * Official
   */
  name: string;

  ingredients: SeedRequirement[];
}

export interface SeedDrop {
  seedType: SeedType;
}

export interface Berry {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Display name
   */
  name: string;

  /**
   * Optional UI description
   */
  description?: string;

  /**
   * A berry can belong to one or more categories.
   */
  categories: BerryCategory[];

  /**
   * Growth duration (hours)
   */
  growthTime: number;

  /**
   * Hours before wilting after maturity.
   */
  harvestWindow: number;

  /**
   * Harvest range
   */
  minYield: number;
  maxYield: number;

  /**
   * Official planting recipes.
   */
  recipes: BerryRecipe[];

  /**
   * Possible harvested seed drops.
   */
  seedDrops: SeedDrop[];

  /**
   * Used to highlight important berries.
   */
  featured?: boolean;

  /**
   * Extra searchable keywords.
   */
  tags?: string[];
}