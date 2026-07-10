import Button from "../ui/Button";
import type { Character } from "../../types/Character";

type CharacterCardProps = {
  character: Character;
  index: number;

  onEdit: () => void;

  onDelete: (id: string) => void;
};

export default function CharacterCard({
  character,
  index,
  onEdit,
  onDelete,
}: CharacterCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500">

      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-2xl font-bold text-emerald-400">
          🌿 Character #{String(index + 1).padStart(3, "0")}
        </h2>
      </div>

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

      <div className="mt-6 border-t border-slate-800 pt-6 space-y-4">

        <div>
          <p className="text-sm text-slate-400">
            🍓 Berry
          </p>

          <p>—</p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            🌱 Status
          </p>

          <p className="text-emerald-400 font-medium">
            Ready to Plant
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            💧 Next Water
          </p>

          <p>—</p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            🌾 Harvest
          </p>

          <p>—</p>
        </div>

      </div>

      <div className="mt-8 flex justify-end gap-3 border-t border-slate-800 pt-6">

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