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
}

export function getCharacterStatus(
  character: Character
): CharacterStatusInfo {
  // Nothing planted
  if (
    !character.plantedBerry ||
    !character.plantedAt ||
    !character.nextWaterAt ||
    !character.harvestAt
  ) {
    return {
      status: "ready",
      label: "Ready to Plant",
      icon: "🔵",
      className:
        "bg-sky-500/20 text-sky-300 border border-sky-500/30",
    };
  }

  const now = new Date();

  const nextWater = new Date(character.nextWaterAt);
  const harvest = new Date(character.harvestAt);

  // Harvest Ready
  if (now >= harvest) {
    return {
      status: "harvestReady",
      label: "Ready to Harvest",
      icon: "🟣",
      className:
        "bg-violet-500/20 text-violet-300 border border-violet-500/30",
    };
  }

  // Water Due
  if (now >= nextWater) {
    return {
      status: "waterDue",
      label: "Water Due",
      icon: "🟡",
      className:
        "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    };
  }

  // Growing
  return {
    status: "growing",
    label: "Growing",
    icon: "🟢",
    className:
      "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  };
}