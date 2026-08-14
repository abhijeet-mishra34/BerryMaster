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
  console.log(
  berry.name,
  berry.image
);

  return (
    <div
      className="
        card-shine
        group
        relative
        flex
        h-full
        flex-col
        gap-4
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        p-6
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-emerald-400/40
        hover:shadow-2xl
        hover:shadow-emerald-500/10
      "
      style={{
        background: `linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 40%, rgba(2,8,24,0.80) 100%)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(255,255,255,0.03), 0 4px 24px -4px rgba(0,0,0,0.5)`,
      }}
    >

      {/* =====================================
          Header
      ===================================== */}

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0">

          <div className="flex items-center gap-3">

            {berry.image ? (
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-800/70
                  transition-all
                  duration-300
                  group-hover:bg-emerald-500/10
                "
              >
                <img
                  src={berry.image}
                  alt={berry.name}
                  className="
                    h-9
                    w-9
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </div>
            ) : (
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-800/70
                  text-2xl
                "
              >
                🍓
              </div>
            )}

            <div className="min-w-0">

              <h2 className="truncate text-xl font-bold text-white">
                {berry.name}
              </h2>

              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-emerald-400">
                {berry.categories.join(" • ")}
              </p>

            </div>

          </div>

        </div>


        {/* =====================================
            Header Actions
        ===================================== */}

        <div className="flex shrink-0 items-center gap-2">

          {berry.featured && (
            <span
              className="
                rounded-full
                bg-yellow-500/10
                px-2
                py-1
                text-xs
                font-semibold
                text-yellow-300
                ring-1
                ring-yellow-500/20
              "
            >
              ⭐
            </span>
          )}

          <button
            type="button"
            aria-label={
              favorite
                ? `Remove ${berry.name} from favorites`
                : `Add ${berry.name} to favorites`
            }
            onClick={() =>
              toggleFavorite(berry.id)
            }
            className="
              rounded-full
              p-1
              text-2xl
              transition-all
              duration-200
              hover:scale-110
              hover:bg-slate-800
              active:scale-95
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-500/60
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
        <p
          className="
            text-sm
            leading-relaxed
            text-slate-300
          "
        >
          {berry.description}
        </p>
      )}


      {/* =====================================
          Stats
      ===================================== */}

      <div
        className="
          space-y-5
          pt-4
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            rounded-lg
            bg-slate-900/60
            px-3
            py-2
            text-sm
          "
        >
          <span className="text-slate-400">
            🌱 Growth
          </span>

          <span className="font-semibold text-white">
            {berry.growthTime} hrs
          </span>
        </div>

        <div
          className="
            flex
            items-center
            justify-between
            rounded-lg
            bg-slate-900/60
            px-3
            py-2
            text-sm
          "
        >
          <span className="text-slate-400">
            🍓 Yield
          </span>

          <span className="font-semibold text-white">
            {berry.minYield}–{berry.maxYield}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            justify-between
            rounded-lg
            bg-slate-900/60
            px-3
            py-2
            text-sm
          "
        >
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

      <div className="rounded-xl bg-slate-900/50 p-3">

        <h3 className="mb-2 font-semibold text-white">
          💧 Watering
        </h3>

        <p className="rounded-lg bg-slate-900/60 px-3 py-2 text-sm italic text-slate-400">
          Coming in the Planting Module...
        </p>

      </div>


      {/* =====================================
          Recipe
      ===================================== */}

      <div
        className="
          border-t
          border-slate-800
          pt-4
        "
      >

        <h3 className="mb-3 font-semibold text-white">
          🌱 Recipe
        </h3>

        <div className="space-y-2">

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
                    items-center
                    justify-between
                    rounded-lg
                    bg-slate-900/60
                    px-3
                    py-2
                    text-sm
                    transition-colors
                    duration-200
                    hover:bg-slate-800/80
                  "
                >

                  <span className="flex items-center gap-2 text-slate-200">

                    <img
                      src={seed.image}
                      alt={seed.name}
                      className="
                        h-7
                        w-7
                        object-contain
                      "
                    />

                    {seed.name}

                  </span>

                  <span
                    className="
                      rounded-md
                      bg-slate-800
                      px-2
                      py-1
                      font-semibold
                      text-white
                    "
                  >
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
        space-y-5
          pt-4
        "
      >

        <h3 className="mb-3 font-semibold text-white">
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
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-slate-700
                    bg-slate-800/70
                    px-3
                    py-1.5
                    text-xs
                    text-slate-200
                    transition-all
                    duration-200
                    hover:border-emerald-500/40
                    hover:bg-emerald-500/10
                  "
                >

                  <img
                    src={seed.image}
                    alt={seed.name}
                    className="
                      h-5
                      w-5
                      object-contain
                    "
                  />

                  {seed.name}

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
          type="button"
          onClick={() =>
            onAction(berry)
          }
          className="
            mt-auto
            rounded-xl
            bg-emerald-600
            py-3
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-emerald-500
            hover:shadow-lg
            hover:shadow-emerald-500/20
            active:scale-[0.98]
          "
        >
          {actionLabel}
        </button>

      )}

    </div>
  );
}