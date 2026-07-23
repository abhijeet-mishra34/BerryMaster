import type { Berry } from "../types/Berry";

import { debugBerry } from "./berries/debugBerry";
import { statusBerries } from "./berries/statusBerries";
import { healingUtilityBerries } from "./berries/healingUtilityBerries";
import { flavorBerries } from "./berries/flavorBerries";
import { evBerries } from "./berries/evBerries";
import { typeResistanceBerries } from "./berries/typeResistanceBerries";
import { specialBerries } from "./berries/specialBerries";


// =====================================
// Complete Berry Database
// =====================================

export const berryDatabase: Berry[] = [
  ...statusBerries,
  ...healingUtilityBerries,
  ...flavorBerries,
  ...evBerries,
  ...typeResistanceBerries,
  ...specialBerries,
  debugBerry,
];


// =====================================
// Public Berry Database
// =====================================

export const publicBerryDatabase: Berry[] =
  berryDatabase.filter(
    (berry) => !berry.developerOnly
  );