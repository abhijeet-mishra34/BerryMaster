import type { Character } from "../../types/Character";

type CharacterCardProps = {
  character: Character;
  index: number;
};

export default function CharacterCard({
  character,
  index,
}: CharacterCardProps) {
  console.log("CharacterCard props:", {
  character,
  index,
});
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-emerald-400">
          🌿 Farmer #{index + 1}
        </h2>

        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300">
          Ready to Plant
        </span>
      </div>

      <div className="mt-6 space-y-4">

        <div>
          <p className="text-sm text-slate-400">
            Character
          </p>

          <p className="text-lg font-semibold">
            {character.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Berry
          </p>

          <p>
            —
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Next Water
          </p>

          <p>
            —
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Harvest
          </p>

          <p>
            —
          </p>
        </div>

      </div>
    </div>
  );
}