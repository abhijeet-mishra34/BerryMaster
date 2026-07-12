import type { Character } from "../types/Character";

export type CharacterStatus =
  | "ready"
  | "growing"
  | "waterDue"
  | "harvestReady"
  | "wilted";

interface CharacterStatusInfo {
  status: CharacterStatus;

  label: string;
  icon: string;
  className: string;

  canPlant: boolean;
  canWater: boolean;
  canHarvest: boolean;
  isWilted: boolean;
}

export function getCharacterStatus(
  character: Character
): CharacterStatusInfo {

  // Nothing planted
  if (
    !character.plantedBerryId ||
    !character.plantedAt ||
    !character.harvestAt
  ) {
    return {
      status: "ready",

      label: "Ready to Plant",
      icon: "🔵",

      className:
        "border border-sky-500/30 bg-sky-500/20 text-sky-300",

      canPlant: true,
      canWater: false,
      canHarvest: false,
      isWilted: false,
    };
  }

  const now = new Date();

  const harvest = new Date(character.harvestAt);

  // Harvest Ready
  if (now >= harvest) {
    return {
      status: "harvestReady",

      label: "Ready to Harvest",
      icon: "🟣",

      className:
        "border border-violet-500/30 bg-violet-500/20 text-violet-300",

      canPlant: false,
      canWater: false,
      canHarvest: true,
      isWilted: false,
    };
  }

  // Growing
  return {
    status: "growing",

    label: "Growing",
    icon: "🟢",

    className:
      "border border-emerald-500/30 bg-emerald-500/20 text-emerald-300",

    canPlant: false,
    canWater: true,
    canHarvest: false,
    isWilted: false,
  };
}