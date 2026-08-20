import { STORAGE_KEYS } from "../constants/storageKeys";

function getParsedStorageItem(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function exportBerryMasterData() {
  const characters = getParsedStorageItem(STORAGE_KEYS.CHARACTERS);
  const favoriteBerries = getParsedStorageItem(STORAGE_KEYS.FAVORITE_BERRIES);
  const activities = getParsedStorageItem(STORAGE_KEYS.ACTIVITIES);

  const backup = {
    characters,
    favoriteBerries,
    activities,
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
      type: "application/json;charset=utf-8",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download =
    `berrymaster-backup-${new Date()
      .toISOString()
      .split("T")[0]}.json`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}