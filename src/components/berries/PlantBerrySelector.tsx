import {
useEffect,
useMemo,
useRef,
useState,
} from "react";

import BerryCard from "./BerryCard";
import BerryList from "./BerryList";
import BerryFilters from "./BerryFilters";

import { berryDatabase } from "../../data/berryDatabase";
import { useCharacters } from "../../context/CharacterContext";
import { useFavorites } from "../../context/FavoritesContext";

import type { Berry } from "../../types/Berry";
import type { BerryCategory } from "../../types/BerryCategories";

import { BerryCategories } from "../../types/BerryCategories";

interface PlantBerrySelectorProps {
characterId: string;
onClose: () => void;
onPlantSuccess?: () => void;
}

const categories: ("All" | BerryCategory)[] = [
"All",
BerryCategories.STATUS,
BerryCategories.HEALING,
BerryCategories.PP_RECOVERY,
BerryCategories.FLAVOR,
BerryCategories.EV,
BerryCategories.TYPE_RESIST,
BerryCategories.SPECIAL,
];

export default function PlantBerrySelector({
characterId,
onClose,
onPlantSuccess,
}: PlantBerrySelectorProps) {
const { plantBerry } = useCharacters();
const { isFavorite } = useFavorites();

const [search, setSearch] = useState("");

const [
selectedCategory,
setSelectedCategory,
] = useState<"All" | BerryCategory>("All");

const [selectedBerry, setSelectedBerry] =
useState<Berry | null>(null);

const selectorRef =
useRef<HTMLDivElement>(null);

const itemRefs =
useRef<(HTMLButtonElement | null)[]>([]);

// =====================================
// Filter & Sort Berries
// =====================================

const filteredBerries = useMemo(() => {
const query = search.trim().toLowerCase();


return berryDatabase
  .filter((berry) => {
    const matchesCategory =
      selectedCategory === "All" ||
      berry.categories.includes(
        selectedCategory
      );

    const matchesSearch =
      berry.name
        .toLowerCase()
        .includes(query) ||
      berry.id
        .toLowerCase()
        .includes(query) ||
      berry.description
        ?.toLowerCase()
        .includes(query) ||
      berry.tags?.some((tag) =>
        tag
          .toLowerCase()
          .includes(query)
      );

    return (
      matchesCategory &&
      matchesSearch
    );
  })
  .sort((a, b) => {
    const aFavorite =
      isFavorite(a.id);

    const bFavorite =
      isFavorite(b.id);

    // Favorites first
    if (
      aFavorite !== bFavorite
    ) {
      return aFavorite
        ? -1
        : 1;
    }

    // Debug berry stays at the bottom
    if (
      a.id === "debugBerry"
    ) {
      return 1;
    }

    if (
      b.id === "debugBerry"
    ) {
      return -1;
    }

    // Alphabetical order
    return a.name.localeCompare(
      b.name
    );
  });


}, [
search,
selectedCategory,
isFavorite,
]);

// =====================================
// Keep Selection Valid
// =====================================

useEffect(() => {
if (
filteredBerries.length > 0 &&
!filteredBerries.some(
(berry) =>
berry.id ===
selectedBerry?.id
)
) {
setSelectedBerry(
filteredBerries[0]
);
}


if (
  filteredBerries.length === 0
) {
  setSelectedBerry(null);
}


}, [
filteredBerries,
selectedBerry,
]);

// =====================================
// Focus Selector
// =====================================

useEffect(() => {
selectorRef.current?.focus();
}, []);

// =====================================
// Scroll Selected Berry Into View
// =====================================

useEffect(() => {
if (!selectedBerry) {
return;
}


const index =
  filteredBerries.findIndex(
    (berry) =>
      berry.id ===
      selectedBerry.id
  );

itemRefs.current[index]
  ?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });


}, [
selectedBerry,
filteredBerries,
]);

// =====================================
// Plant Selected Berry
// =====================================

function handlePlant(
berry: Berry
) {
plantBerry(
characterId,
berry
);


onPlantSuccess?.();

onClose();


}

// =====================================
// Keyboard Navigation
// =====================================

function handleKeyDown(
event: React.KeyboardEvent<HTMLDivElement>
) {
if (
filteredBerries.length === 0
) {
return;
}


const currentIndex =
  filteredBerries.findIndex(
    (berry) =>
      berry.id ===
      selectedBerry?.id
  );

switch (event.key) {
  case "ArrowDown": {
    event.preventDefault();

    const nextIndex =
      currentIndex <
      filteredBerries.length - 1
        ? currentIndex + 1
        : 0;

    setSelectedBerry(
      filteredBerries[nextIndex]
    );

    break;
  }

  case "ArrowUp": {
    event.preventDefault();

    const previousIndex =
      currentIndex > 0
        ? currentIndex - 1
        : filteredBerries.length - 1;

    setSelectedBerry(
      filteredBerries[
        previousIndex
      ]
    );

    break;
  }

  case "Enter": {
    if (!selectedBerry) {
      return;
    }

    event.preventDefault();

    handlePlant(
      selectedBerry
    );

    break;
  }

  case "Escape": {
    event.preventDefault();

    onClose();

    break;
  }
}


}

return ( <div
   ref={selectorRef}
   tabIndex={0}
   onKeyDown={handleKeyDown}
   className="
     space-y-9
     outline-none
   "
 >


  {/* =====================================
      Filters
  ===================================== */}

  <BerryFilters
    search={search}
    onSearchChange={setSearch}
    categories={categories}
    selectedCategory={
      selectedCategory
    }
    onCategoryChange={
      setSelectedCategory
    }
  />


  {/* =====================================
      Master / Detail Layout
  ===================================== */}

  <div
    className="
      grid
      grid-cols-1
      gap-6
      lg:grid-cols-3
    "
  >

    {/* =====================================
        Berry List
    ===================================== */}

    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-slate-900/60
        shadow-xl
        shadow-black/10
        backdrop-blur-xl
      "
    >

      <BerryList
        berries={filteredBerries}
        selectedBerry={
          selectedBerry
        }
        onSelectBerry={
          setSelectedBerry
        }
        itemRefs={itemRefs}
      />

    </div>


    {/* =====================================
        Berry Details
    ===================================== */}

    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-slate-900/60
        shadow-xl
        shadow-black/10
        backdrop-blur-xl
        lg:col-span-2
      "
    >

      {/* Details Header */}

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
            items-center
            justify-between
            gap-4
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
              Berry Information
            </p>

            <h2
              className="
                mt-1
                text-lg
                font-semibold
                text-white
              "
            >
              📖 Berry Details
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >
              Review the berry before planting it.
            </p>

          </div>

          <div
            className="
              hidden
              rounded-lg
              border
              border-white/[0.06]
              bg-slate-950/40
              px-3
              py-2
              text-xs
              text-slate-500
              sm:block
            "
          >
            Use ↑ ↓ to navigate
          </div>

        </div>

      </div>


      {/* Details Content */}

      <div
        className="
          h-[550px]
          overflow-y-auto
          p-5
        "
      >

        {selectedBerry ? (

          <BerryCard
            berry={selectedBerry}
            actionLabel="🌱 Plant This Berry"
            onAction={handlePlant}
          />

        ) : (

          <div
            className="
              flex
              h-full
              items-center
              justify-center
              rounded-xl
              border
              border-dashed
              border-white/[0.08]
              bg-white/[0.02]
            "
          >

            <div
              className="
                text-center
              "
            >

              <div className="text-5xl">
                🍓
              </div>

              <h2
                className="
                  mt-4
                  text-xl
                  font-semibold
                  text-white
                "
              >
                No Berry Selected
              </h2>

              <p
                className="
                  mt-2
                  text-slate-400
                "
              >
                Choose a berry from the list.
              </p>

            </div>

          </div>

        )}

      </div>

    </div>

  </div>

</div>


);
}
