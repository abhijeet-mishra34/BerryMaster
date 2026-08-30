import {
  Sprout,
  Wheat,
  Clock,
  Sparkles,
} from "lucide-react";
import type { Berry } from "../../types/Berry";
import { seedDisplay } from "../../utils/seedDisplay";
import { useFavorites } from "../../context/FavoritesContext";
import Button from "../ui/Button";

interface BerryCardProps {
  berry: Berry;
  actionLabel?: string;
  onAction?: (berry: Berry) => void;
}

const labelClass =
  "text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 light:text-slate-500 whitespace-nowrap";

export default function BerryCard({
  berry,
  actionLabel,
  onAction,
}: BerryCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(berry.id);

  const recipe = berry.recipes?.[0];
  const ingredients = recipe?.ingredients || [];

  return (
    <div
      className="
        card-shine
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-800/90
        light:border-slate-200
        bg-slate-900/95
        light:bg-white
        p-5
        sm:p-6
        shadow-lg
        shadow-black/20
        transition-all
        duration-300
        hover:-translate-y-1.5
        hover:border-emerald-400/60
        hover:shadow-2xl
        hover:shadow-emerald-500/15
      "
    >
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3.5 pb-4">
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Berry Sprite Badge */}
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 p-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs">
            {berry.image ? (
              <img
                src={berry.image}
                alt={berry.name}
                className="h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              />
            ) : (
              <span className="text-2xl">🍓</span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 light:text-emerald-700">
                {berry.categories.join(" • ")}
              </span>
              {berry.featured && (
                <span className="rounded-full border border-amber-400/40 bg-amber-400/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300 light:text-amber-700">
                  Featured ⭐
                </span>
              )}
            </div>

            <h2 className="truncate text-xl sm:text-2xl font-black tracking-tight text-white light:text-slate-900 mt-0.5">
              {berry.name}
            </h2>
          </div>
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          aria-label={
            favorite
              ? `Remove ${berry.name} from favorites`
              : `Add ${berry.name} to favorites`
          }
          onClick={() => toggleFavorite(berry.id)}
          className={`
            flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer shadow-xs active:scale-90
            ${
              favorite
                ? "border-rose-500/60 bg-rose-500/20 text-rose-400 shadow-md shadow-rose-500/25 hover:scale-115"
                : "border-slate-800 light:border-slate-200 bg-slate-950/70 light:bg-slate-50 text-slate-400 hover:border-rose-500/50 hover:bg-rose-500/15 hover:text-rose-300 hover:scale-115 hover:shadow-md hover:shadow-rose-500/20"
            }
          `}
        >
          <span className={`text-xl sm:text-2xl transition-transform duration-200 ${favorite ? "animate-pulse scale-110" : "opacity-75 hover:opacity-100"}`}>
            {favorite ? "❤️" : "🤍"}
          </span>
        </button>
      </div>

      {/* Description */}
      {berry.description && (
        <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {berry.description}
        </p>
      )}

      {/* Farming Stats Overview */}
      <div className="grid grid-cols-3 gap-2.5 rounded-xl border border-slate-800/80 light:border-slate-200 bg-slate-950/70 light:bg-slate-50 p-3 shadow-inner">
        {/* Growth Time */}
        <div className="text-center">
          <p className={labelClass}>Growth</p>
          <div className="mt-1 flex items-center justify-center gap-1">
            <Sprout className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <p className="text-sm font-black text-white light:text-slate-900">
              {berry.growthTime}
              <span className="text-[10px] font-normal text-slate-400 light:text-slate-500 ml-0.5">h</span>
            </p>
          </div>
        </div>

        {/* Yield Range */}
        <div className="text-center border-x border-slate-800/80 light:border-slate-200 px-1">
          <p className={labelClass}>Yield</p>
          <div className="mt-1 flex items-center justify-center gap-1">
            <Wheat className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <p className="text-sm font-black text-white light:text-slate-900">
              {berry.minYield}–{berry.maxYield}
            </p>
          </div>
        </div>

        {/* Harvest Window */}
        <div className="text-center">
          <p className={labelClass}>Window</p>
          <div className="mt-1 flex items-center justify-center gap-1">
            <Clock className="h-3.5 w-3.5 text-sky-400 shrink-0" />
            <p className="text-sm font-black text-white light:text-slate-900">
              {berry.harvestWindow}
              <span className="text-[10px] font-normal text-slate-400 light:text-slate-500 ml-0.5">h</span>
            </p>
          </div>
        </div>
      </div>

      {/* Seed Ingredients (Recipe) */}
      {ingredients.length > 0 && (
        <div className="mt-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <p className={labelClass}>Seed Ingredients Needed</p>
            <span className="text-[10px] font-mono font-bold text-emerald-400 light:text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Recipe
            </span>
          </div>

          <div className="space-y-1.5">
            {ingredients.map((ingredient) => {
              const seed = seedDisplay[ingredient.seedType];
              return (
                <div
                  key={ingredient.seedType}
                  className="flex items-center justify-between rounded-xl border border-slate-800/80 light:border-slate-200 bg-slate-950/50 light:bg-slate-50 px-3 py-2 text-xs transition-colors hover:border-emerald-500/30"
                >
                  <span className="flex items-center gap-2 text-slate-200 light:text-slate-800 font-medium">
                    <img
                      src={seed.image}
                      alt={seed.name}
                      className="h-6 w-6 object-contain"
                    />
                    {seed.name}
                  </span>
                  <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-bold text-emerald-400 light:text-emerald-700">
                    ×{ingredient.quantity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Possible Seed Drops */}
      {berry.seedDrops && berry.seedDrops.length > 0 && (
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between">
            <p className={labelClass}>Possible Seed Drops</p>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 light:text-amber-700">
              <Sparkles className="h-3 w-3" />
              Loot
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {berry.seedDrops.map((drop) => {
              const seed = seedDisplay[drop.seedType];
              return (
                <span
                  key={drop.seedType}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-800 light:border-slate-200 bg-slate-950/70 light:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-200 light:text-slate-800 shadow-xs transition-all duration-200 hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:scale-108 hover:shadow-md hover:shadow-emerald-500/10 cursor-default"
                >
                  <img
                    src={seed.image}
                    alt={seed.name}
                    className="h-5 w-5 object-contain transition-transform duration-200 hover:scale-115"
                  />
                  <span>{seed.name}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Optional Action Button (e.g. Plant This Berry) */}
      {actionLabel && onAction && (
        <div className="mt-6 pt-4 border-t border-slate-800/80 light:border-slate-200">
          <Button
            size="lg"
            variant="primary"
            onClick={() => onAction(berry)}
            className="w-full font-black tracking-wide"
          >
            {berry.image ? (
              <img
                src={berry.image}
                alt=""
                className="mr-2 h-6 w-6 object-contain drop-shadow transition-transform duration-200 group-hover:scale-125 group-hover:rotate-6"
              />
            ) : (
              <Sprout className="mr-2 h-6 w-6 shrink-0 transition-transform duration-200 group-hover:scale-125 group-hover:rotate-6" />
            )}
            <span className="text-base sm:text-lg">{actionLabel}</span>
          </Button>
        </div>
      )}
    </div>
  );
}