import type { MutableRefObject } from "react";

import type { Berry } from "../../types/Berry";

import { useFavorites } from "../../context/FavoritesContext";

type BerryListProps = {
berries: Berry[];

selectedBerry: Berry | null;

onSelectBerry: (berry: Berry) => void;

itemRefs: MutableRefObject<
(HTMLButtonElement | null)[]

> ;
 };

export default function BerryList({
berries,
selectedBerry,
onSelectBerry,
itemRefs,
}: BerryListProps) {
const { isFavorite } = useFavorites();

const favoriteBerries = berries.filter(
(berry) =>
isFavorite(berry.id)
);

const regularBerries = berries.filter(
(berry) =>
!isFavorite(berry.id)
);

function renderBerryButton(
berry: Berry,
index: number
) {
const isSelected =
selectedBerry?.id === berry.id;

const favorite =
  isFavorite(berry.id);

return (
  <button
    key={berry.id}
    ref={(element) => {
      itemRefs.current[index] =
        element;
    }}
    type="button"
    onClick={() =>
      onSelectBerry(berry)
    }
    className={`

      group
      relative
      flex
      w-full
      items-center
      justify-between
      gap-3
      overflow-hidden
      rounded-xl
      border
      px-4
      py-3.5
      text-left
      transition-all
      duration-200

      ${
        isSelected
          ? `
            border-emerald-500/70
            bg-emerald-500/[0.08]
            shadow-lg
            shadow-emerald-500/10
          `
          : `
            border-white/[0.06]
            bg-white/[0.02]
            hover:-translate-y-0.5
            hover:border-white/[0.12]
            hover:bg-white/[0.05]
          `
      }

    `}
  >

    {/* Selected Accent */}

    {isSelected && (
      <span
        className="
          absolute
          inset-y-0
          left-0
          w-1
          bg-emerald-400
        "
      />
    )}


    {/* Berry Name */}

    <span
      className={`

        min-w-0
        truncate
        font-medium
        transition-colors

        ${
          isSelected
            ? "text-emerald-100"
            : "text-white"
        }

      `}
    >
      🍓 {berry.name}
    </span>


    {/* Indicators */}

    <div
      className="
        flex
        shrink-0
        items-center
        gap-2
      "
    >

      {favorite && (
        <span
          className="
            text-sm
            text-pink-400
          "
          title="Favorite"
        >
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
            text-slate-950
            shadow-md
            shadow-emerald-500/30
          "
        >
          ✓
        </div>
      )}

    </div>

  </button>
);

}

return ( <div
   className="
     overflow-hidden
     rounded-2xl
     border
     border-white/[0.08]
     bg-slate-900/60
     shadow-xl
     shadow-black/10
     backdrop-blur-xl
     lg:col-span-1
   "
 >

  {/* =====================================
      Header
  ===================================== */}

  <div
    className="
      border-b
      border-white/[0.08]
      bg-white/[0.02]
      px-5
      py-4
    "
  >

    <div
      className="
        flex
        items-start
        justify-between
        gap-3
      "
    >

      <div>

        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.16em]
            text-emerald-400
          "
        >
          Selection
        </p>

        <h2
          className="
            mt-1
            text-lg
            font-semibold
            text-white
          "
        >
          🍓 Berry List
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-400
          "
        >
          Select a berry to preview its details.
        </p>

      </div>

      <div
        className="
          rounded-lg
          border
          border-white/[0.06]
          bg-slate-950/40
          px-2.5
          py-1.5
          text-xs
          font-semibold
          text-slate-400
        "
      >
        {berries.length}
      </div>

    </div>

  </div>


  {/* =====================================
      List
  ===================================== */}

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
          px-4
          text-center
          text-slate-400
        "
      >

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-emerald-500/10
            text-4xl
          "
        >
          🍓
        </div>

        <p
          className="
            mt-4
            font-semibold
            text-white
          "
        >
          No berries found
        </p>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Try another search or category.
        </p>

      </div>

    ) : (

      <div className="space-y-2">

        {/* Favorites */}

        {favoriteBerries.length > 0 && (

          <>

            <div
              className="
                flex
                items-center
                justify-between
                px-2
                pb-2
                pt-1
              "
            >

              <h3
                className="
                  text-sm
                  font-semibold
                  text-pink-400
                "
              >
                ❤️ Favorites
              </h3>

              <span
                className="
                  text-xs
                  font-medium
                  text-slate-500
                "
              >
                {favoriteBerries.length}
              </span>

            </div>


            {favoriteBerries.map(
              (berry, index) =>
                renderBerryButton(
                  berry,
                  index
                )
            )}


            <div
              className="
                my-4
                border-t
                border-white/[0.08]
              "
            />

          </>

        )}


        {/* All Berries */}

        <div
          className="
            flex
            items-center
            justify-between
            px-2
            pb-2
          "
        >

          <h3
            className="
              text-sm
              font-semibold
              text-slate-400
            "
          >
            🍓 All Berries
          </h3>

          <span
            className="
              text-xs
              font-medium
              text-slate-500
            "
          >
            {regularBerries.length}
          </span>

        </div>


        {regularBerries.map(
          (berry, index) =>
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
