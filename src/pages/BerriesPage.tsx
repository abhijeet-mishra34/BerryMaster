import BerrySelector from "../components/berries/BerrySelector";

import {
  berryDatabase,
  publicBerryDatabase,
} from "../data/berryDatabase";

import { useSettings } from "../context/SettingsContext";
import { useTranslation } from "../context/LanguageContext";

export default function BerriesPage() {
  const {
    showDeveloperBerries,
  } = useSettings();
  const { t } = useTranslation();

  const availableBerries =
    showDeveloperBerries
      ? berryDatabase
      : publicBerryDatabase;

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* =====================================
          Page Header
      ===================================== */}

      <div
        className="
          theme-hero
          relative
          overflow-hidden
          rounded-xl
          p-4
          sm:p-6
          backdrop-blur-xl
          shadow-xl
        "
      >
        <div className="flex items-center gap-4.5">
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-emerald-500/30
              bg-emerald-500/10
              text-3xl
              shadow-lg
              shadow-emerald-500/10
            "
          >
            🍓
          </div>

          <div>
            <h1
              className="
                text-2xl
                sm:text-3xl
                font-extrabold
                tracking-tight
                text-white
                light:text-slate-900
              "
            >
              {t("nav.berries")}
            </h1>

            <p
              className="
                mt-1
                max-w-2xl
                text-xs
                sm:text-sm
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
            mt-5
            flex
            items-center
            gap-3
            border-t
            border-white/[0.08]
            light:border-slate-200
            pt-4
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

