export default function CharactersPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Characters
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all your berry farming characters.
          </p>
        </div>

        <button className="rounded-lg bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400">
          + Add Character
        </button>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h2 className="text-2xl font-semibold">
          No characters yet
        </h2>

        <p className="mt-3 text-slate-400">
          Add your first farmer to begin tracking berry growth.
        </p>
      </div>
    </div>
  );
}