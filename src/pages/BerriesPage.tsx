import BerrySelector from "../components/berries/BerrySelector";

import {
  berryDatabase,
  publicBerryDatabase,
} from "../data/berryDatabase";

import { useSettings } from "../context/SettingsContext";

export default function BerriesPage() {
  const {
    showDeveloperBerries,
  } = useSettings();

  const availableBerries =
    showDeveloperBerries
      ? berryDatabase
      : publicBerryDatabase;

  return (
    <div className="space-y-10">

      {/* =====================================
          Page Header
      ===================================== */}

      <div
        className="
          theme-card
          rounded-2xl
          p-6
          shadow-xl
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
              shadow-xs
            "
          >
            🍓
          </div>

          <div>
            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-white
                light:text-slate-900
              "
            >
              Berry Database
            </h1>

            <p
              className="
                mt-1
                max-w-2xl
                text-sm
                leading-relaxed
                text-slate-400
                light:text-slate-600
              "
            >
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
            border-slate-800
            light:border-slate-200
            pt-5
          "
        >
          <span
            className="
              rounded-lg
              bg-slate-800/40
              light:bg-emerald-50
              border
              border-slate-700/50
              light:border-emerald-200
              px-3
              py-2
              text-sm
              font-semibold
              text-emerald-400
              light:text-emerald-700
              shadow-xs
            "
          >
            🍓 {availableBerries.length}
          </span>

          <span className="text-sm text-slate-500 light:text-slate-600">
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

