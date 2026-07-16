import { STORAGE_KEYS } from "../constants/storageKeys";

export function resetBerryMaster() {
  Object.values(STORAGE_KEYS).forEach(
    (storageKey) => {
      localStorage.removeItem(storageKey);
    }
  );
}