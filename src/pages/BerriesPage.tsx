import BerrySelector from "../components/berries/BerrySelector";

import { berryDatabase } from "../data/berryDatabase";

export default function BerriesPage() {
  return (
    <div className="space-y-10">

      {/* =====================================
          Page Header
      ===================================== */}

      <div
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-slate-900/60
          p-6
          shadow-xl
          shadow-black/10
          backdrop-blur-xl
        "
      >

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-emerald-500/10
              text-3xl
            "
          >
            🍓
          </div>

          <div>

            <h1 className="text-3xl font-bold tracking-tight text-sky-500">
              Berry Database
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">
              Browse every berry, discover recipes, growth times,
              harvest windows, and other farming information.
            </p>

          </div>

        </div>


        {/* Database Summary */}

        <div
          className="
            mt-6
            flex
            items-center
            gap-3
            border-t
            border-white/[0.08]
            pt-5
          "
        >

          <span
            className="
              rounded-lg
              bg-white/[0.04]
              px-3
              py-2
              text-sm
              font-semibold
              text-emerald-400
            "
          >
            🍓 {berryDatabase.length}
          </span>

          <span className="text-sm text-slate-500">
            berries available in the database
          </span>

        </div>

      </div>


      {/* =====================================
          Berry Selector
      ===================================== */}

      <BerrySelector />

    </div>
  );
}