import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import BerryCard from "./BerryCard";

import { berryDatabase } from "../../data/berryDatabase";
import { useCharacters } from "../../context/CharacterContext";
import type { Berry } from "../../types/Berry";
import type { BerryCategory } from "../../types/BerryCategories";
import { BerryCategories } from "../../types/BerryCategories";
import { useFavorites } from "../../context/FavoritesContext";
import BerryList from "./BerryList";
import BerryFilters from "./BerryFilters";

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
  const {
  isFavorite,
} = useFavorites();

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState<"All" | BerryCategory>("All");

  const [selectedBerry, setSelectedBerry] =
    useState<Berry | null>(null);

  const selectorRef =
    useRef<HTMLDivElement>(null);

  const itemRefs =
    useRef<(HTMLButtonElement | null)[]>([]);

  const filteredBerries = useMemo(() => {
  const query = search.trim().toLowerCase();

  return berryDatabase
    .filter((berry) => {
      const matchesCategory =
        selectedCategory === "All" ||
        berry.categories.includes(selectedCategory);

      const matchesSearch =
        berry.name.toLowerCase().includes(query) ||
        berry.id.toLowerCase().includes(query) ||
        berry.description
          ?.toLowerCase()
          .includes(query) ||
        berry.tags?.some((tag) =>
          tag.toLowerCase().includes(query)
        );

      return (
        matchesCategory &&
        matchesSearch
      );
    })
    .sort((a, b) => {
  const aFavorite = isFavorite(a.id);
  const bFavorite = isFavorite(b.id);

  // Favorites always first
  if (aFavorite !== bFavorite) {
    return aFavorite ? -1 : 1;
  }

  // Keep Debug Berry at the bottom of non-favorites
  if (a.id === "debugBerry") return 1;
  if (b.id === "debugBerry") return -1;

  // Alphabetical order
  return a.name.localeCompare(b.name);
});
}, [
  search,
  selectedCategory,
  isFavorite,
]);

  useEffect(() => {
    if (
      filteredBerries.length > 0 &&
      !filteredBerries.some(
        (berry) =>
          berry.id === selectedBerry?.id
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

  useEffect(() => {
    selectorRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!selectedBerry) return;

    const index =
      filteredBerries.findIndex(
        (berry) =>
          berry.id ===
          selectedBerry.id
      );

    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [
    selectedBerry,
    filteredBerries,
  ]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (!filteredBerries.length) {
      return;
    }

    const currentIndex =
      filteredBerries.findIndex(
        (berry) =>
          berry.id ===
          selectedBerry?.id
      );

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();

        const next =
          currentIndex <
          filteredBerries.length - 1
            ? currentIndex + 1
            : 0;

        setSelectedBerry(
          filteredBerries[next]
        );

        break;
      }

      case "ArrowUp": {
        e.preventDefault();

        const previous =
          currentIndex > 0
            ? currentIndex - 1
            : filteredBerries.length - 1;

        setSelectedBerry(
          filteredBerries[
            previous
          ]
        );

        break;
      }

      case "Enter": {
        if (!selectedBerry) {
          return;
        }

        e.preventDefault();

        plantBerry(
          characterId,
          selectedBerry
        );

        onPlantSuccess?.();

        onClose();

        break;
      }

      case "Escape": {
        e.preventDefault();

        onClose();

        break;
      }
    }
  };

  return (
        <div
      ref={selectorRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="
        space-y-6
        outline-none
      "
    >

      {/* Filters */}

     <BerryFilters
  search={search}
  onSearchChange={setSearch}
  categories={categories}
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
/>

      {/* Master / Detail Layout */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Berry List */}

       <BerryList
  berries={filteredBerries}
  selectedBerry={selectedBerry}
  onSelectBerry={setSelectedBerry}
  itemRefs={itemRefs}
/>
             {/* Berry Details */}

        <div
          className="
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            lg:col-span-2
            overflow-hidden
          "
        >

          {/* Header */}

          <div
            className="
              border-b
              border-slate-800
              px-5
              py-4
            "
          >

            <h2
              className="
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
              View berry information before planting.
            </p>

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
                onAction={(berry) => {

                  plantBerry(
                    characterId,
                    berry
                  );

                  onPlantSuccess?.();

                  onClose();

                }}
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
                  border-slate-700
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