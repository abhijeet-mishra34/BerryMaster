import { STORAGE_KEYS } from "../constants/storageKeys";

export function exportBerryMasterData() {
  const backup = {
    characters: localStorage.getItem(
      STORAGE_KEYS.CHARACTERS
    ),

    favoriteBerries: localStorage.getItem(
      STORAGE_KEYS.FAVORITE_BERRIES
    ),

    activities: localStorage.getItem(
      STORAGE_KEYS.ACTIVITIES
    ),

    exportedAt: new Date().toISOString(),
  };

  const blob = new Blob(
    [
      JSON.stringify(
        backup,
        null,
        2
      ),
    ],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download =
    `berrymaster-backup-${new Date()
      .toISOString()
      .split("T")[0]}.json`;

  link.click();

  URL.revokeObjectURL(url);
}