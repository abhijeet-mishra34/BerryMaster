import type { Berry } from "../types/Berry";

import { statusBerries } from "./berries/statusBerries";
import { healingUtilityBerries } from "./berries/healingUtilityBerries";
import { flavorBerries } from "./berries/flavorBerries";
import { evBerries } from "./berries/evBerries";
import { typeResistanceBerries } from "./berries/typeResistanceBerries";
import { specialBerries } from "./berries/specialBerries";

export const berryDatabase: Berry[] = [
  ...statusBerries,
  ...healingUtilityBerries,
  ...flavorBerries,
  ...evBerries,
  ...typeResistanceBerries,
  ...specialBerries,
];