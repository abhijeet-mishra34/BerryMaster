import type { Character } from "../types/Character";
import type { Notification } from "../types/Notification";

const PRIORITY = {
  water: 1,
  harvest: 2,
  wilt: 3,
} as const;

function createNotification(
  id: string,
  type: Notification["type"],
  title: string,
  message: string,
  characterId: string,
  characterName: string
): Notification {
  return {
    id,
    type,
    title,
    message,
    characterId,
    characterName,
    createdAt: new Date().toISOString(),
  };
}

export type NotificationSettings = {
  notifyOnWater?: boolean;
  notifyOnHarvest?: boolean;
  notifyOnWilt?: boolean;
};

export function generateNotifications(
  characters: Character[],
  settings?: NotificationSettings
): Notification[] {
  const now = new Date();
  const notifyWater = settings?.notifyOnWater ?? true;
  const notifyHarvest = settings?.notifyOnHarvest ?? true;
  const notifyWilt = settings?.notifyOnWilt ?? true;

  const notifications: Notification[] = [];

  characters.forEach((character) => {
    if (
      !character.plantedBerryId ||
      !character.plantedAt ||
      !character.harvestAt ||
      !character.wiltAt
    ) {
      return;
    }

    const harvestAt = new Date(character.harvestAt);
    const wiltAt = new Date(character.wiltAt);

    // Every planting cycle gets its own unique ID.
    const cycleId = `${character.id}-${character.plantedAt}`;

    // 🍂 Wilt (highest priority)
    if (notifyWilt && now >= wiltAt) {
      notifications.push(
        createNotification(
          `${cycleId}-wilt`,
          "wilt",
          "Berry Wilted",
          `${character.name}'s berry has wilted.`,
          character.id,
          character.name
        )
      );

      return;
    }

    // 💧 Water
    if (
      notifyWater &&
      character.nextWaterAt &&
      now >= new Date(character.nextWaterAt) &&
      now < harvestAt
    ) {
      notifications.push(
        createNotification(
          `${cycleId}-water`,
          "water",
          "Water Needed",
          `${character.name} needs watering.`,
          character.id,
          character.name
        )
      );

      return;
    }

    // 🌾 Harvest
    if (notifyHarvest && now >= harvestAt) {
      notifications.push(
        createNotification(
          `${cycleId}-harvest`,
          "harvest",
          "Harvest Ready",
          `${character.name}'s berry is ready to harvest.`,
          character.id,
          character.name
        )
      );
    }
  });

  notifications.sort(
    (a, b) => PRIORITY[a.type] - PRIORITY[b.type]
  );

  return notifications;
}