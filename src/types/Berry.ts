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


export type BerryCategory =
  | "Status"
  | "Healing"
  | "PP Recovery"
  | "Flavor"
  | "EV"
  | "Type Resist"
  | "Special";


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
   * Example: "leppa"
   */
  id: string;


  /**
   * Display name
   * Example: "Leppa Berry"
   */
  name: string;


  /**
   * Optional information shown in UI
   */
  description?: string;


  /**
   * Main berry classification
   */
  category: BerryCategory;


  /**
   * Total growth duration in hours
   */
  growthTime: number;


  /**
   * Time available after maturity before wilting
   */
  harvestWindow: number;


  /**
   * Minimum possible harvest amount
   */
  minYield: number;


  /**
   * Maximum possible harvest amount
   */
  maxYield: number;


  /**
   * Official berry planting recipe
   */
  recipes: BerryRecipe[];


  /**
   * Seeds that can possibly drop after harvest
   */
  possibleSeedDrops: SeedDrop[];


  /**
   * Highlights important berries
   * Example: Leppa, Lum
   */
  featured?: boolean;


  /**
   * Extra searchable labels
   */
  tags?: string[];
}