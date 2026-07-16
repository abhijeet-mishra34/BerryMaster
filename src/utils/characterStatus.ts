import type { Character } from "../types/Character";

export type CharacterStatus =
  | "ready"
  | "growing"
  | "needWater"
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
    !character.plantedBerryId ||
    !character.plantedAt ||
    !character.harvestAt ||
    !character.wiltAt
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

  const harvestAt = new Date(
    character.harvestAt
  );

  const wiltAt = new Date(
    character.wiltAt
  );

  const nextWaterAt = character.nextWaterAt
    ? new Date(character.nextWaterAt)
    : null;

  // Wilted (highest priority)
  if (now >= wiltAt) {
    return {
      status: "wilted",
      label: "Wilted",
      icon: "🍂",
      className:
        "bg-red-500/20 text-red-300 border border-red-500/30",
    };
  }

  // Ready to harvest
  if (now >= harvestAt) {
    return {
      status: "harvestReady",
      label: "Ready to Harvest",
      icon: "🌾",
      className:
        "bg-violet-500/20 text-violet-300 border border-violet-500/30",
    };
  }

  // Needs watering
  if (
    nextWaterAt &&
    now >= nextWaterAt
  ) {
    return {
      status: "needWater",
      label: "Needs Water",
      icon: "💧",
      className:
        "bg-sky-500/20 text-sky-300 border border-sky-500/30",
    };
  }

  // Growing
  return {
    status: "growing",
    label: "Growing",
    icon: "🌱",
    className:
      "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  };
}