import { STORAGE_KEYS } from "../constants/storageKeys";

type BerryMasterBackup = {
  characters?: unknown;
  favoriteBerries?: unknown;
  activities?: unknown;
  exportedAt?: string;
};

function sanitizeStorageValue(value: unknown): string | null {
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value === "string") {
    try {
      JSON.parse(value);
      return value;
    } catch {
      return JSON.stringify(value);
    }
  }
  return JSON.stringify(value);
}

export function importBerryMasterData(
  file: File
): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        if (!reader.result || typeof reader.result !== "string") {
          throw new Error(
            "Invalid BerryMaster backup file: Empty content."
          );
        }

        const parsed = JSON.parse(
          reader.result
        ) as BerryMasterBackup;

        // =====================================
        // Basic backup validation
        // =====================================

        if (
          !parsed ||
          typeof parsed !== "object" ||
          Array.isArray(parsed)
        ) {
          throw new Error(
            "Invalid BerryMaster backup file."
          );
        }

        const hasCharacters = "characters" in parsed;
        const hasFavorites = "favoriteBerries" in parsed;
        const hasActivities = "activities" in parsed;

        if (
          !hasCharacters &&
          !hasFavorites &&
          !hasActivities
        ) {
          throw new Error(
            "Invalid BerryMaster backup file."
          );
        }

        // =====================================
        // Restore data
        // =====================================

        if (
          hasCharacters &&
          parsed.characters !== undefined &&
          parsed.characters !== null
        ) {
          const sanitized = sanitizeStorageValue(
            parsed.characters
          );
          if (sanitized !== null) {
            localStorage.setItem(
              STORAGE_KEYS.CHARACTERS,
              sanitized
            );
          }
        }

        if (
          hasFavorites &&
          parsed.favoriteBerries !== undefined &&
          parsed.favoriteBerries !== null
        ) {
          const sanitized = sanitizeStorageValue(
            parsed.favoriteBerries
          );
          if (sanitized !== null) {
            localStorage.setItem(
              STORAGE_KEYS.FAVORITE_BERRIES,
              sanitized
            );
          }
        }

        if (
          hasActivities &&
          parsed.activities !== undefined &&
          parsed.activities !== null
        ) {
          const sanitized = sanitizeStorageValue(
            parsed.activities
          );
          if (sanitized !== null) {
            localStorage.setItem(
              STORAGE_KEYS.ACTIVITIES,
              sanitized
            );
          }
        }

        resolve();
      } catch (err) {
        reject(
          err instanceof Error
            ? err
            : new Error(
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