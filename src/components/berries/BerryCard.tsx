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
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-md hover:border-emerald-500 transition-all duration-200 flex flex-col gap-4 h-full">

      {/* Header */}

      <div className="flex justify-between items-start">

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
      <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-semibold">
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

      {/* Description */}

      {berry.description && (
        <p className="text-slate-300 text-sm">
          {berry.description}
        </p>
      )}

      {/* Stats */}

      <div className="border-t border-slate-700 pt-3 space-y-2">

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

      {/* Watering */}

      <div className="border-t border-slate-700 pt-3">

        <h3 className="font-semibold text-white mb-2">
          💧 Watering
        </h3>

        <p className="text-slate-400 text-sm italic">
          Coming in the Planting Module...
        </p>

      </div>

      {/* Recipe */}

      <div className="border-t border-slate-700 pt-3">

        <h3 className="font-semibold text-white mb-2">
          🌱 Recipe
        </h3>

        <div className="space-y-1">

          {berry.recipes[0].ingredients.map((ingredient) => {

            const seed = seedDisplay[ingredient.seedType];

            return (

              <div
                key={ingredient.seedType}
                className="flex justify-between text-sm"
              >

                <span className="text-slate-200">
                  {seed.icon} {seed.name}
                </span>

                <span className="font-semibold text-white">
                  ×{ingredient.quantity}
                </span>

              </div>

            );

          })}

        </div>

      </div>

      {/* Seed Drops */}

      <div className="border-t border-slate-700 pt-3">

        <h3 className="font-semibold text-white mb-2">
          🎁 Possible Seed Drops
        </h3>

        <div className="flex flex-wrap gap-2">

          {berry.seedDrops.map((drop) => {

            const seed = seedDisplay[drop.seedType];

            return (

              <span
                key={drop.seedType}
                className="bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-200"
              >
                {seed.icon} {seed.name}
              </span>

            );

          })}

        </div>

      </div>

      {/* Optional Action Button */}

      {actionLabel && onAction && (

        <button
          onClick={() => onAction(berry)}
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