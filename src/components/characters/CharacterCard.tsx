import Button from "../ui/Button";

import type { Character } from "../../types/Character";

import { berryDatabase } from "../../data/berryDatabase";

import { getCharacterStatus } from "../../utils/characterStatus";
import { formatDate } from "../../utils/date";
import { formatRemainingTime } from "../../utils/countdown";

import { useNow } from "../../hooks/useNow";

type CharacterCardProps = {
  character: Character;
  index: number;

  onPlant: () => void;
  onWater: () => void;
  onHarvest: () => void;

  onEdit: () => void;
  onDelete: (id: string) => void;
};

export default function CharacterCard({
  character,
  index,
  onPlant,
  onWater,
  onHarvest,
  onEdit,
  onDelete,
}: CharacterCardProps) {
  const now = useNow();

  const berry = berryDatabase.find(
    (b) => b.id === character.plantedBerryId
  );

  const status = getCharacterStatus(character);

  const canHarvest =
    !!character.harvestAt &&
    new Date(character.harvestAt) <= now;

  const characterNumber = String(
    index + 1
  ).padStart(3, "0");

  const labelClass = "text-sm text-slate-400";

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10">

      {/* Header */}

      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-2xl font-bold text-emerald-400">
          🌿 Character #{characterNumber}
        </h2>
      </div>

      {/* Basic Info */}

      <div className="mt-5 space-y-4">

        <div>
          <p className={labelClass}>
            ID
          </p>

          <p className="text-lg font-semibold">
            #{characterNumber}
          </p>
        </div>

        <div>
          <p className={labelClass}>
            Name
          </p>

          <p className="text-lg font-semibold">
            {character.name}
          </p>
        </div>

      </div>

      {/* Farming Info */}

      <div className="mt-6 space-y-5 border-t border-slate-800 pt-6">

        <div>
          <p className={labelClass}>
            🍓 Berry
          </p>

          <p className="font-medium">
            {berry?.name ?? "—"}
          </p>
        </div>

        <div>
          <p className={labelClass}>
            🌱 Status
          </p>

          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${status.className}`}
          >
            {status.icon} {status.label}
          </span>
        </div>

        <div>
          <p className={labelClass}>
            🌱 Planted
          </p>

          <p>
            {formatDate(character.plantedAt)}
          </p>
        </div>

        {/* Watering */}

        <div>

          <p className={labelClass}>
            💧 Watering
          </p>

          {character.nextWaterAt ? (

            <div className="space-y-1">

              <p className="font-semibold text-emerald-400">
                ⏳ {formatRemainingTime(character.nextWaterAt, now)}
              </p>

              <p className="text-xs text-slate-500">
                {formatDate(character.nextWaterAt)}
              </p>

            </div>

          ) : (

            <div className="space-y-1">

              <p className="font-semibold text-emerald-400">
                ✅ Watering Complete
              </p>

              <p className="text-xs text-slate-500">
                No more watering required.
              </p>

            </div>

          )}

        </div>

        {/* Harvest */}

        <div>

          <p className={labelClass}>
            🌾 Harvest Timer
          </p>

          <div className="space-y-1">

            <p className="font-semibold text-yellow-400">
              🌾 {formatRemainingTime(character.harvestAt, now)}
            </p>

            <p className="text-xs text-slate-500">
              {formatDate(character.harvestAt)}
            </p>

          </div>

        </div>

        {/* Wilt */}

        <div>

          <p className={labelClass}>
            🍂 Wilt Timer
          </p>

          <div className="space-y-1">

            <p className="font-semibold text-red-400">
              🍂 {formatRemainingTime(character.wiltAt, now)}
            </p>

            <p className="text-xs text-slate-500">
              {formatDate(character.wiltAt)}
            </p>

          </div>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-slate-800 pt-6">

        {!character.plantedBerryId ? (

          <Button onClick={onPlant}>
            🌱 Plant Berry
          </Button>

        ) : canHarvest ? (

          <Button onClick={onHarvest}>
            🌾 Harvest
          </Button>

        ) : (

          <Button
            variant="info"
            onClick={onWater}
          >
            💧 Water
          </Button>

        )}

        <Button
          variant="info"
          onClick={onEdit}
        >
          ✏ Edit
        </Button>

        <Button
          variant="danger"
          onClick={() => onDelete(character.id)}
        >
          🗑 Delete
        </Button>

      </div>

    </div>
  );
}