import type { Berry } from "../../types/Berry";
import { seedDisplay } from "../../utils/seedDisplay";
import { useFavorites } from "../../context/FavoritesContext";

interface BerryCardProps {
  berry: Berry;

  actionLabel?: string;
  onAction?: (berry: Berry) => void;
}

export default function BerryCard({
  berry,
  actionLabel,
  onAction,
}: BerryCardProps) {
  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const favorite = isFavorite(berry.id);

  return (
    <div
      className="
        group
        flex
        h-full
        flex-col
        gap-3
        rounded-2xl
        border
        border-slate-800
        bg-gradient-to-b
        from-slate-900
        to-slate-950
        p-6
        shadow-lg
        shadow-black/10
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-emerald-500/60
        hover:shadow-xl
        hover:shadow-emerald-500/10
      "
    >

      {/* =====================================
          Header
      ===================================== */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            🍓 {berry.name}
          </h2>

          <p className="text-sm text-emerald-400">
            {berry.categories.join(" • ")}
          </p>

        </div>

        <div className="flex items-center gap-2">

          {berry.featured && (
            <span
              className="
                rounded-full
                bg-yellow-500/20
                px-2
                py-1
                text-xs
                font-semibold
                text-yellow-300
              "
            >
              ⭐ Featured
            </span>
          )}

          <button
            type="button"
            onClick={() =>
              toggleFavorite(berry.id)
            }
            className="
              text-2xl
              transition-transform
              duration-200
              hover:scale-110
              active:scale-95
            "
          >
            {favorite ? "❤️" : "🤍"}
          </button>

        </div>

      </div>


      {/* =====================================
          Description
      ===================================== */}

      {berry.description && (
        <p className="text-sm leading-relaxed text-slate-300">
          {berry.description}
        </p>
      )}


      {/* =====================================
          Stats
      ===================================== */}

      <div
        className="
          border-t
          border-slate-700
          pt-3
          space-y-2
        "
      >

        <div className="flex justify-between text-sm">

          <span className="text-slate-400">
            🌱 Growth
          </span>

          <span className="font-semibold text-white">
            {berry.growthTime} hrs
          </span>

        </div>

        <div className="flex justify-between text-sm">

          <span className="text-slate-400">
            🍓 Yield
          </span>

          <span className="font-semibold text-white">
            {berry.minYield}–{berry.maxYield}
          </span>

        </div>

        <div className="flex justify-between text-sm">

          <span className="text-slate-400">
            ⏰ Harvest Window
          </span>

          <span className="font-semibold text-white">
            {berry.harvestWindow} hrs
          </span>

        </div>

      </div>


      {/* =====================================
          Watering
      ===================================== */}

      <div
        className="
          border-t
          border-slate-700
          pt-3
        "
      >

        <h3 className="mb-2 font-semibold text-white">
          💧 Watering
        </h3>

        <p className="text-sm italic text-slate-400">
          Coming in the Planting Module...
        </p>

      </div>


      {/* =====================================
          Recipe
      ===================================== */}

      <div
        className="
          border-t
          border-slate-700
          pt-3
        "
      >

        <h3 className="mb-2 font-semibold text-white">
          🌱 Recipe
        </h3>

        <div className="space-y-1">

          {berry.recipes[0].ingredients.map(
            (ingredient) => {

              const seed =
                seedDisplay[
                  ingredient.seedType
                ];

              return (

                <div
                  key={ingredient.seedType}
                  className="
                    flex
                    justify-between
                    text-sm
                  "
                >

                  <span className="text-slate-200">
                    {seed.icon} {seed.name}
                  </span>

                  <span className="font-semibold text-white">
                    ×{ingredient.quantity}
                  </span>

                </div>

              );

            }
          )}

        </div>

      </div>


      {/* =====================================
          Seed Drops
      ===================================== */}

      <div
        className="
          border-t
          border-slate-700
          pt-3
        "
      >

        <h3 className="mb-2 font-semibold text-white">
          🎁 Possible Seed Drops
        </h3>

        <div className="flex flex-wrap gap-2">

          {berry.seedDrops.map(
            (drop) => {

              const seed =
                seedDisplay[
                  drop.seedType
                ];

              return (

                <span
                  key={drop.seedType}
                  className="
                    rounded-full
                    bg-slate-800
                    px-3
                    py-1
                    text-xs
                    text-slate-200
                  "
                >
                  {seed.icon} {seed.name}
                </span>

              );

            }
          )}

        </div>

      </div>


      {/* =====================================
          Optional Action Button
      ===================================== */}

      {actionLabel && onAction && (

        <button
          onClick={() =>
            onAction(berry)
          }
          className="
            mt-auto
            rounded-lg
            bg-emerald-600
            py-3
            font-semibold
            text-white
            transition-all
            hover:bg-emerald-500
          "
        >
          {actionLabel}
        </button>

      )}

    </div>
  );
}