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
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(berry.id);

  return (
    <div
      className="
        flex
        h-full
        flex-col
        rounded-2xl
        border
        border-slate-800
        light:border-slate-200
        bg-slate-900/90
        light:bg-white
        p-6
        shadow-sm
        transition-all
        duration-200
        hover:border-slate-700
        light:hover:border-slate-300
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {berry.image ? (
            <img
              src={berry.image}
              alt={berry.name}
              className="h-10 w-10 shrink-0 object-contain"
            />
          ) : (
            <span className="text-2xl shrink-0">🍓</span>
          )}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-emerald-400 light:text-emerald-600">
                {berry.categories.join(" • ")}
              </span>
              {berry.featured && (
                <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] font-bold text-yellow-400 light:text-yellow-700">
                  Featured
                </span>
              )}
            </div>
            <h2 className="truncate text-xl font-bold text-white light:text-slate-900">
              {berry.name}
            </h2>
          </div>
        </div>

        <button
          type="button"
          aria-label={
            favorite
              ? `Remove ${berry.name} from favorites`
              : `Add ${berry.name} to favorites`
          }
          onClick={() => toggleFavorite(berry.id)}
          className="rounded-lg bg-slate-800/80 light:bg-slate-100 p-2 text-lg transition-colors duration-200 hover:bg-slate-700/80 light:hover:bg-slate-200 cursor-pointer shrink-0"
        >
          {favorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Description */}
      {berry.description && (
        <p className="mt-3 text-sm text-slate-400 light:text-slate-600 leading-relaxed">
          {berry.description}
        </p>
      )}

      {/* Quick Stats */}
      <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-slate-950/60 light:bg-slate-100 p-3 text-center text-xs">
        <div>
          <span className="text-slate-400 light:text-slate-500">Growth</span>
          <p className="font-semibold text-white light:text-slate-900 mt-0.5">
            {berry.growthTime}h
          </p>
        </div>
        <div>
          <span className="text-slate-400 light:text-slate-500">Yield</span>
          <p className="font-semibold text-white light:text-slate-900 mt-0.5">
            {berry.minYield}–{berry.maxYield}
          </p>
        </div>
        <div>
          <span className="text-slate-400 light:text-slate-500">Window</span>
          <p className="font-semibold text-white light:text-slate-900 mt-0.5">
            {berry.harvestWindow}h
          </p>
        </div>
      </div>

      {/* Seed Ingredients */}
      {berry.recipes &&
        berry.recipes.length > 0 &&
        berry.recipes[0].ingredients.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
              🌱 Seed Ingredients
            </h3>
            <div className="space-y-2">
              {berry.recipes[0].ingredients.map((ingredient) => {
                const seed = seedDisplay[ingredient.seedType];
                return (
                  <div
                    key={ingredient.seedType}
                    className="flex items-center justify-between rounded-lg bg-slate-900/60 light:bg-slate-50 border border-transparent light:border-slate-200 px-3 py-2 text-sm transition-colors duration-200 hover:bg-slate-800/80 light:hover:bg-slate-100"
                  >
                    <span className="flex items-center gap-2 text-slate-200 light:text-slate-800 font-medium">
                      <img
                        src={seed.image}
                        alt={seed.name}
                        className="h-7 w-7 object-contain"
                      />
                      {seed.name}
                    </span>
                    <span className="rounded-md bg-slate-800 light:bg-slate-200 px-2 py-1 font-semibold text-white light:text-slate-800 text-xs">
                      ×{ingredient.quantity}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      {/* Seed Drops */}
      {berry.seedDrops && berry.seedDrops.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
            🎁 Possible Seed Drops
          </h3>
          <div className="flex flex-wrap gap-2">
            {berry.seedDrops.map((drop) => {
              const seed = seedDisplay[drop.seedType];
              return (
                <span
                  key={drop.seedType}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 light:border-slate-200 bg-slate-800/70 light:bg-slate-50 px-3 py-1.5 text-xs text-slate-200 light:text-slate-700 transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/10"
                >
                  <img
                    src={seed.image}
                    alt={seed.name}
                    className="h-5 w-5 object-contain"
                  />
                  <span>{seed.name}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Optional Action Button */}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={() => onAction(berry)}
          className="mt-6 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}