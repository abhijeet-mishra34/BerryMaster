import type { MutableRefObject } from "react";
import type { Berry } from "../../types/Berry";
import { useFavorites } from "../../context/FavoritesContext";
import { Sparkles, Heart } from "lucide-react";

type BerryListProps = {
  berries: Berry[];
  selectedBerry: Berry | null;
  onSelectBerry: (berry: Berry) => void;
  itemRefs: MutableRefObject<(HTMLButtonElement | null)[]>;
};

export default function BerryList({
  berries,
  selectedBerry,
  onSelectBerry,
  itemRefs,
}: BerryListProps) {
  const { isFavorite } = useFavorites();

  const favoriteBerries = berries.filter((berry) => isFavorite(berry.id));
  const regularBerries = berries.filter((berry) => !isFavorite(berry.id));

  function renderBerryButton(berry: Berry, index: number) {
    const isSelected = selectedBerry?.id === berry.id;
    const favorite = isFavorite(berry.id);

    return (
      <button
        key={berry.id}
        ref={(element) => {
          itemRefs.current[index] = element;
        }}
        type="button"
        onClick={() => onSelectBerry(berry)}
        className={`
          group
          relative
          flex
          w-full
          items-center
          justify-between
          gap-3.5
          overflow-hidden
          rounded-xl
          border
          p-3
          text-left
          transition-all
          duration-200
          cursor-pointer
          ${
            isSelected
              ? `
                border-emerald-500/70
                bg-emerald-500/15
                light:bg-emerald-500/20
                shadow-md
                shadow-emerald-500/15
                ring-1
                ring-emerald-400/40
              `
              : `
                border-slate-800/90
                light:border-slate-200
                bg-slate-950/40
                light:bg-slate-50/80
                hover:border-slate-700
                light:hover:border-slate-300
                hover:bg-slate-800/50
                light:hover:bg-slate-100
                hover:shadow-xs
              `
          }
        `}
      >
        {/* Selected Accent Bar */}
        {isSelected && (
          <span className="absolute inset-y-0 left-0 w-1.5 rounded-r bg-emerald-400" />
        )}

        {/* Berry Sprite & Details */}
        <div className="flex items-center gap-3 min-w-0 pl-1">
          <div
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              transition-all
              duration-200
              ${
                isSelected
                  ? "border-emerald-400/50 bg-emerald-500/25 shadow-xs"
                  : "border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white group-hover:border-slate-700 light:group-hover:border-slate-300"
              }
            `}
          >
            {berry.image ? (
              <img
                src={berry.image}
                alt={berry.name}
                className="h-8 w-8 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:scale-110"
              />
            ) : (
              <span className="text-xl">🍓</span>
            )}
          </div>

          <div className="min-w-0">
            <p
              className={`truncate text-sm font-semibold transition-colors ${
                isSelected
                  ? "text-emerald-300 light:text-emerald-800 font-bold"
                  : "text-white light:text-slate-900 group-hover:text-emerald-200 light:group-hover:text-emerald-700"
              }`}
            >
              {berry.name}
            </p>
            <p className="truncate text-[11px] text-slate-400 light:text-slate-500 font-medium">
              {berry.categories.join(" • ")}
            </p>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex shrink-0 items-center gap-2 pr-1">
          {favorite && (
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/10 text-xs text-pink-400"
              title="Favorite"
            >
              <Heart className="h-3.5 w-3.5 fill-pink-400" />
            </span>
          )}

          {isSelected && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-extrabold text-slate-950 shadow-sm shadow-emerald-500/30">
              ✓
            </div>
          )}
        </div>
      </button>
    );
  }

  return (
    <div
      className="
        flex
        h-[300px]
        sm:h-[480px]
        lg:h-[580px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-800
        light:border-slate-200
        bg-slate-900/60
        light:bg-white
        shadow-xl
        shadow-black/10
        backdrop-blur-xl
      "
    >
      {/* =====================================
          Header
      ===================================== */}
      <div
        className="
          shrink-0
          border-b
          border-slate-800
          light:border-slate-200
          bg-slate-900/40
          light:bg-slate-50
          px-5
          py-4
        "
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400 light:text-emerald-700">
              Selection
            </p>

            <h2 className="mt-1 flex items-center gap-2 text-lg font-semibold text-white light:text-slate-900">
              <span>Berry List</span>
            </h2>

            <p className="mt-1 text-xs text-slate-400 light:text-slate-600">
              Select a berry to preview and plant.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 light:border-slate-200 bg-slate-950/40 light:bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-300 light:text-slate-700">
            {berries.length}
          </div>
        </div>
      </div>

      {/* =====================================
          List Container
      ===================================== */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {berries.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-4 text-center text-slate-400">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-3xl">
              🌱
            </div>

            <p className="mt-4 text-sm font-semibold text-white light:text-slate-900">
              No berries found
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Try another search query or category filter.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Favorites Section */}
            {favoriteBerries.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-2 pt-1">
                  <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-400">
                    <Heart className="h-3.5 w-3.5 fill-pink-400" />
                    <span>Favorites</span>
                  </h3>

                  <span className="rounded-md bg-pink-500/10 px-2 py-0.5 text-[11px] font-bold text-pink-400">
                    {favoriteBerries.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {favoriteBerries.map((berry, index) =>
                    renderBerryButton(berry, index)
                  )}
                </div>

                <div className="my-3 border-t border-slate-800/80 light:border-slate-200" />
              </div>
            )}

            {/* All Berries Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-2 pt-1">
                <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  <span>All Berries</span>
                </h3>

                <span className="rounded-md bg-slate-800/60 light:bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-400 light:text-slate-600">
                  {regularBerries.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {regularBerries.map((berry, index) =>
                  renderBerryButton(berry, favoriteBerries.length + index)
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
