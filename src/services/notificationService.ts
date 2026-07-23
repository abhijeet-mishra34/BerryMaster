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

export function generateNotifications(
  characters: Character[]
): Notification[] {
  const now = new Date();

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
    if (now >= wiltAt) {
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
    if (now >= harvestAt) {
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