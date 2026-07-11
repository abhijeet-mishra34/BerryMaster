import Button from "../ui/Button";

import type { Character } from "../../types/Character";

import { berryDatabase } from "../../data/berryDatabase";
import { getCharacterStatus } from "../../utils/characterStatus";

type CharacterCardProps = {
  character: Character;
  index: number;

  onPlant: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
};

export default function CharacterCard({
  character,
  index,
  onPlant,
  onEdit,
  onDelete,
}: CharacterCardProps) {
  const berry = berryDatabase.find(
    (b) => b.id === character.plantedBerry
  );

  const status = getCharacterStatus(character);

  function formatDate(date?: Date) {
    if (!date) return "—";

    return new Date(date).toLocaleString([], {
      day: "2-digit",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500">

      {/* Header */}

      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-2xl font-bold text-emerald-400">
          🌿 Character #{String(index + 1).padStart(3, "0")}
        </h2>
      </div>

      {/* Basic Info */}

      <div className="mt-5 space-y-4">

        <div>
          <p className="text-sm text-slate-400">
            ID
          </p>

          <p className="text-lg font-semibold">
            #{String(index + 1).padStart(3, "0")}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Name
          </p>

          <p className="text-lg font-semibold">
            {character.name}
          </p>
        </div>

      </div>

      {/* Farming Info */}

      <div className="mt-6 border-t border-slate-800 pt-6 space-y-4">

        <div>
          <p className="text-sm text-slate-400">
            🍓 Berry
          </p>

          <p className="font-medium">
            {berry?.name ?? "—"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            🌱 Status
          </p>

          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${status.className}`}
          >
            {status.icon} {status.label}
          </span>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            💧 Next Water
          </p>

          <p>
            {formatDate(character.nextWaterAt)}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            🌾 Harvest
          </p>

          <p>
            {formatDate(character.harvestAt)}
          </p>
        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-slate-800 pt-6">

        <Button onClick={onPlant}>
          🌱 Plant Berry
        </Button>

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