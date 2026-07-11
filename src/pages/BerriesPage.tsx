import BerrySelector from "../components/berries/BerrySelector";

export default function BerriesPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          🍓 Berry Database
        </h1>

        <p className="text-slate-400 mt-2">
          Browse every berry, discover recipes, growth times,
          harvest windows and farming information.
        </p>

      </div>

      <BerrySelector />

    </div>
  );
}