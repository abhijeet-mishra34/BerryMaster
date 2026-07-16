import { STORAGE_KEYS } from "../constants/storageKeys";

type BerryMasterBackup = {
  characters: string | null;
  favoriteBerries: string | null;
  activities: string | null;
  exportedAt?: string;
};

export function importBerryMasterData(
  file: File
): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed = JSON.parse(
          reader.result as string
        ) as BerryMasterBackup;

        // =====================================
        // Basic backup validation
        // =====================================

        if (
          !parsed ||
          typeof parsed !== "object" ||
          !("characters" in parsed) ||
          !("favoriteBerries" in parsed) ||
          !("activities" in parsed)
        ) {
          throw new Error(
            "Invalid BerryMaster backup file."
          );
        }

        // =====================================
        // Restore data
        // =====================================

        if (parsed.characters !== null) {
          localStorage.setItem(
            STORAGE_KEYS.CHARACTERS,
            parsed.characters
          );
        }

        if (
          parsed.favoriteBerries !== null
        ) {
          localStorage.setItem(
            STORAGE_KEYS.FAVORITE_BERRIES,
            parsed.favoriteBerries
          );
        }

        if (parsed.activities !== null) {
          localStorage.setItem(
            STORAGE_KEYS.ACTIVITIES,
            parsed.activities
          );
        }

        resolve();
      } catch {
        reject(
          new Error(
            "Invalid BerryMaster backup file."
          )
        );
      }
    };

    reader.onerror = () => {
      reject(
        new Error(
          "Could not read the selected file."
        )
      );
    };

    reader.readAsText(file);
  });
}