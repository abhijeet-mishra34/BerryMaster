import {
  Sprout,
  Wheat,
  Clock,
  Sparkles,
} from "lucide-react";

import type { Berry } from "../../types/Berry";
import { seedDisplay } from "../../utils/seedDisplay";
import { useFavorites } from "../../context/FavoritesContext";

interface BerryCardProps {
  berry: Berry;
  actionLabel?: string;
  onAction?: (berry: Berry) => void;
  hideActionOnMobile?: boolean;
}

const labelClass = "text-[11px] font-bold uppercase tracking-wider text-slate-400 light:text-slate-500 whitespace-nowrap";

export default function BerryCard({
  berry,
  actionLabel,
  onAction,
  hideActionOnMobile,
}: BerryCardProps) {
  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const favorite = isFavorite(berry.id);

  return (
    <div
      className="
        theme-card
        card-shine
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-xl
        p-4
        sm:p-6
        md:p-8
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-emerald-400/40
        hover:shadow-xl
        hover:shadow-emerald-500/10
      "
    >
      {/* Header Accent Glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 opacity-70" />

      {/* Header */}
      <div className="pb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold transition-transform duration-300 group-hover:scale-105 shadow-xs">
              {berry.image ? (
                <img
                  src={berry.image}
                  alt={berry.name}
                  className="h-9 w-9 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                />
              ) : (
                <span className="text-2xl">🍓</span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-500">
                  {berry.categories.join(" • ")}
                </span>
                {berry.featured && (
                  <span className="rounded-full border border-yellow-500/30 bg-yellow-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-yellow-500">
                    Featured ⭐
                  </span>
                )}
              </div>

              <h2 className="truncate text-2xl font-bold tracking-tight text-white light:text-slate-900">
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
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/40 light:bg-slate-50 text-lg transition-all duration-200 hover:scale-110 hover:border-pink-500/40 hover:bg-pink-500/10 active:scale-95 cursor-pointer shadow-xs"
          >
            <span className={favorite ? "animate-pulse" : "opacity-60 hover:opacity-100"}>
              {favorite ? "❤️" : "🤍"}
            </span>
          </button>
        </div>
      </div>

      {/* Section Divider */}
      <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 light:via-slate-200 to-transparent" />

      {/* Description */}
      {berry.description && (
        <div className="mb-6">
          <p className="text-xs leading-relaxed text-slate-300 light:text-slate-600">
            {berry.description}
          </p>
        </div>
      )}

      {/* Farming Stats Overview */}
      <div className="grid gap-3 sm:grid-cols-3">
        {/* Growth Time */}
        <div className="rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/40 light:bg-slate-50 p-4 transition-all hover:bg-slate-900/60 light:hover:bg-slate-100 shadow-xs">
          <p className={labelClass}>Growth</p>
          <div className="mt-2 flex items-center gap-2">
            <Sprout className="h-4 w-4 text-emerald-500 shrink-0" />
            <p className="text-sm font-bold text-white light:text-slate-900">
              {berry.growthTime} <span className="text-xs font-normal text-slate-400 light:text-slate-500">hrs</span>
            </p>
          </div>
        </div>

        {/* Yield Range */}
        <div className="rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/40 light:bg-slate-50 p-4 transition-all hover:bg-slate-900/60 light:hover:bg-slate-100 shadow-xs">
          <p className={labelClass}>Yield</p>
          <div className="mt-2 flex items-center gap-2">
            <Wheat className="h-4 w-4 text-amber-500 shrink-0" />
            <p className="text-sm font-bold text-white light:text-slate-900">
              {berry.minYield}–{berry.maxYield} <span className="text-xs font-normal text-slate-400 light:text-slate-500">berries</span>
            </p>
          </div>
        </div>

        {/* Harvest Window */}
        <div className="rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/40 light:bg-slate-50 p-4 transition-all hover:bg-slate-900/60 light:hover:bg-slate-100 shadow-xs">
          <p className={labelClass}>Window</p>
          <div className="mt-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-sky-500 shrink-0" />
            <p className="text-sm font-bold text-white light:text-slate-900">
              {berry.harvestWindow} <span className="text-xs font-normal text-slate-400 light:text-slate-500">hrs</span>
            </p>
          </div>
        </div>
      </div>

      {/* Planting Recipe */}
      {berry.recipes && berry.recipes.length > 0 && (
        <div className="mt-6">
          {/* Section Divider */}
          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 light:via-slate-200 to-transparent" />

          <div className="mb-4 flex items-center justify-between">
            <p className={labelClass}>Planting Recipe</p>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {berry.recipes[0].name || "Required Seeds"}
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {berry.recipes[0].ingredients.map((ingredient) => {
              const seed = seedDisplay[ingredient.seedType];
              return (
                <div
                  key={ingredient.seedType}
                  className="relative overflow-hidden rounded-xl border border-emerald-500/20 light:border-emerald-200 bg-emerald-500/[0.04] light:bg-emerald-50/60 p-3.5 transition-all shadow-xs"
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-emerald-500 opacity-70" />

                  <div className="flex items-center justify-between pl-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={seed.image}
                        alt={seed.name}
                        className="h-6 w-6 object-contain"
                      />
                      <span className="text-xs font-bold text-slate-200 light:text-slate-800">
                        {seed.name}
                      </span>
                    </div>

                    <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400 light:text-emerald-700">
                      ×{ingredient.quantity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Seed Drops */}
      {berry.seedDrops && berry.seedDrops.length > 0 && (
        <div className="mt-6">
          {/* Section Divider */}
          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 light:via-slate-200 to-transparent" />

          <div className="mb-4 flex items-center justify-between">
            <p className={labelClass}>Possible Seed Drops</p>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500">
              <Sparkles className="h-3 w-3" />
              Harvest Loot
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {berry.seedDrops.map((drop) => {
              const seed = seedDisplay[drop.seedType];
              return (
                <span
                  key={drop.seedType}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/40 light:bg-white px-3 py-1.5 text-xs font-medium text-slate-200 light:text-slate-800 shadow-xs transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/10"
                >
                  <img
                    src={seed.image}
                    alt={seed.name}
                    className="h-4.5 w-4.5 object-contain"
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
        <div className={`mt-8 ${hideActionOnMobile ? "hidden lg:block" : ""}`}>
          {/* Section Divider */}
          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 light:via-slate-200 to-transparent" />

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => onAction(berry)}
              className="
                group/btn
                relative
                inline-flex
                w-full
                max-w-md
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-emerald-400/50
                bg-gradient-to-r
                from-emerald-500
                via-emerald-400
                to-teal-400
                px-8
                py-4
                text-base
                font-extrabold
                tracking-wide
                text-slate-950
                shadow-xl
                shadow-emerald-500/25
                transition-all
                duration-200
                hover:scale-[1.02]
                hover:shadow-2xl
                hover:shadow-emerald-500/40
                active:scale-[0.98]
                cursor-pointer
              "
            >
              {berry.image ? (
                <img
                  src={berry.image}
                  alt=""
                  className="h-6 w-6 object-contain drop-shadow transition-transform duration-200 group-hover/btn:scale-115"
                />
              ) : (
                <Sprout className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover/btn:scale-115" />
              )}
              <span className="text-base sm:text-lg font-black tracking-wide">
                {actionLabel}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}