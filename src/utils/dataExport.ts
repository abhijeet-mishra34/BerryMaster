import { STORAGE_KEYS } from "../constants/storageKeys";
import { isTauriEnvironment } from "../services/nativeNotificationService";

function getParsedStorageItem(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export interface ExportResult {
  success: boolean;
  message: string;
  path?: string;
  cancelled?: boolean;
}

export async function exportBerryMasterData(): Promise<ExportResult> {
  try {
    const characters = getParsedStorageItem(STORAGE_KEYS.CHARACTERS);
    const favoriteBerries = getParsedStorageItem(STORAGE_KEYS.FAVORITE_BERRIES);
    const activities = getParsedStorageItem(STORAGE_KEYS.ACTIVITIES);

    const backup = {
      characters,
      favoriteBerries,
      activities,
      exportedAt: new Date().toISOString(),
    };

    const jsonString = JSON.stringify(backup, null, 2);
    const filename = `berrymaster-backup-${new Date().toISOString().split("T")[0]}.json`;

    // 1. Tauri Desktop / Mobile Native Save
    if (isTauriEnvironment()) {
      try {
        const { invoke } = await import("@tauri-apps/api/core");
        const savedPath = await invoke<string>("save_backup_file", {
          filename,
          content: jsonString,
        });

        if (savedPath === "cancelled") {
          return {
            success: false,
            cancelled: true,
            message: "Backup export was cancelled.",
          };
        }

        return {
          success: true,
          path: savedPath,
          message: `Backup successfully saved: ${savedPath}`,
        };
      } catch (tauriErr) {
        console.warn("[BerryMaster] Native save_backup_file failed, trying web fallback:", tauriErr);
      }
    }

    // 2. Modern Browser File System Access API (Save As Dialog)
    if (typeof window !== "undefined" && "showSaveFilePicker" in window) {
      try {
        // @ts-expect-error showSaveFilePicker is modern browser API
        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [
            {
              description: "JSON Backup Files",
              accept: { "application/json": [".json"] },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(jsonString);
        await writable.close();
        return {
          success: true,
          message: `Backup successfully saved as ${filename}`,
        };
      } catch (pickerErr) {
        if (pickerErr instanceof Error && pickerErr.name === "AbortError") {
          return {
            success: false,
            cancelled: true,
            message: "Backup export was cancelled.",
          };
        }
      }
    }

    // 3. Fallback: Blob URL & DOM Anchor Trigger
    const blob = new Blob([jsonString], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 2000);

    return {
      success: true,
      message: `Backup ${filename} downloaded to your Downloads folder.`,
    };
  } catch (error) {
    console.error("[BerryMaster] Export error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to export backup.",
    };
  }
}