import type { MutableRefObject } from "react";

import type { Berry } from "../../types/Berry";

import { useFavorites } from "../../context/FavoritesContext";

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

  const favoriteBerries = berries.filter((berry) =>
    isFavorite(berry.id)
  );

  const regularBerries = berries.filter(
    (berry) => !isFavorite(berry.id)
  );

  function renderBerryButton(
    berry: Berry,
    index: number
  ) {
    const isSelected =
      selectedBerry?.id === berry.id;

    return (
      <button
        key={berry.id}
        ref={(element) => {
          itemRefs.current[index] = element;
        }}
        type="button"
        onClick={() =>
          onSelectBerry(berry)
        }
        className={`
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          border
          px-4
          py-4
          text-left
          transition-all
          duration-200

          ${
            isSelected
              ? "border-emerald-500 bg-slate-800 shadow-md shadow-emerald-500/15"
              : "border-transparent hover:-translate-y-0.5 hover:bg-slate-800"
          }
        `}
      >
        <span className="font-medium text-white">
          🍓 {berry.name}
        </span>

        <div className="flex items-center gap-2">
          {isFavorite(berry.id) && (
            <span className="text-pink-400">
              ❤️
            </span>
          )}

          {isSelected && (
            <div
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-emerald-500
                text-xs
                font-bold
                text-white
              "
            >
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
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        lg:col-span-1
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="border-b border-slate-800 px-5 py-4">
        <h2 className="text-lg font-semibold text-white">
          🍓 Berry List
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Select a berry to preview its details.
        </p>
      </div>

      {/* List */}

      <div
        className="
          h-[480px]
          overflow-y-auto
          p-3
        "
      >
        {berries.length === 0 ? (
          <div
            className="
              flex
              h-full
              flex-col
              items-center
              justify-center
              text-center
              text-slate-400
            "
          >
            <div className="text-4xl">
              🍓
            </div>

            <p className="mt-3 font-medium">
              No berries found.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {favoriteBerries.length > 0 && (
              <>
                <div className="px-2 pt-1 pb-2">
                  <h3 className="text-sm font-semibold text-pink-400">
                    ❤️ Favorites
                  </h3>
                </div>

                {favoriteBerries.map((berry, index) =>
                  renderBerryButton(
                    berry,
                    index
                  )
                )}

                <div className="my-4 border-t border-slate-700" />
              </>
            )}

            <div className="px-2 pb-2">
              <h3 className="text-sm font-semibold text-slate-400">
                🍓 All Berries
              </h3>
            </div>

            {regularBerries.map((berry, index) =>
              renderBerryButton(
                berry,
                favoriteBerries.length +
                  index
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}