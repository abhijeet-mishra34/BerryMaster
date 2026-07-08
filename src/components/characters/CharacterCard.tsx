type CharacterCardProps = {
  name: string;
  berry: string;
  status: string;
  lastYield: number;
};

export default function CharacterCard({
  name,
  berry,
  status,
  lastYield,
}: CharacterCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-emerald-500">
      <h2 className="text-xl font-bold">
        👤 {name}
      </h2>

      <p className="mt-4 text-slate-300">
        🌱 {berry}
      </p>

      <p className="mt-2 text-emerald-400">
        {status}
      </p>

      <p className="mt-4 text-slate-400">
        🍓 Last Yield: {lastYield}
      </p>

      <button className="mt-6 w-full rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">
        Open Character
      </button>
    </div>
  );
}