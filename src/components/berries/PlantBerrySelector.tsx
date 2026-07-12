import { useEffect, useMemo, useState } from "react";

import BerryCard from "./BerryCard";

import { berryDatabase } from "../../data/berryDatabase";
import { useCharacters } from "../../context/CharacterContext";

import type { Berry } from "../../types/Berry";
import type { BerryCategory } from "../../types/BerryCategories";
import { BerryCategories } from "../../types/BerryCategories";

interface PlantBerrySelectorProps {
  characterId: string;
  onClose: () => void;
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
}: PlantBerrySelectorProps) {
  const { plantBerry } = useCharacters();

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState<"All" | BerryCategory>("All");

  const [selectedBerry, setSelectedBerry] =
    useState<Berry | null>(null);

  const filteredBerries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return berryDatabase.filter((berry) => {
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

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  useEffect(() => {
    if (
      filteredBerries.length > 0 &&
      !filteredBerries.some(
        (berry) => berry.id === selectedBerry?.id
      )
    ) {
      setSelectedBerry(filteredBerries[0]);
    }

    if (filteredBerries.length === 0) {
      setSelectedBerry(null);
    }
  }, [filteredBerries, selectedBerry]);

  return (
    <div className="space-y-5">
      {/* Search */}

      <input
        type="text"
        placeholder="Search berries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          rounded-lg
          border
          border-slate-700
          bg-slate-900
          px-4
          py-3
          text-white
          placeholder:text-slate-500
          outline-none
          transition
          focus:border-emerald-500
        "
      />

      {/* Categories */}

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`
              rounded-full
              px-3
              py-2
              text-sm
              font-medium
              transition-all

              ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Master / Detail Layout */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Berry List */}

        <div
          className="
            h-[550px]
            overflow-y-auto
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            lg:col-span-1
          "
        >
          {filteredBerries.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <div className="text-3xl">
                🍓
              </div>

              <p className="mt-3">
                No berries found.
              </p>
            </div>
          ) : (
            filteredBerries.map((berry) => {
              const isSelected =
                selectedBerry?.id === berry.id;

              return (
                <button
                  key={berry.id}
                  type="button"
                  onClick={() =>
                    setSelectedBerry(berry)
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    border-b
                    border-slate-800
                    px-4
                    py-3
                    text-left
                    transition-all
                    duration-200

                    ${
                      isSelected
                        ? "border-l-4 border-l-emerald-500 bg-slate-800 font-semibold text-white shadow-lg shadow-emerald-500/20"
                        : "text-slate-200 hover:bg-slate-800"
                    }
                  `}
                >
                  <span>
                    🍓 {berry.name}
                  </span>

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
                        text-sm
                        font-bold
                        text-white
                      "
                    >
                      ✓
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Berry Preview */}

        <div
          className="
            h-[550px]
            overflow-y-auto
            lg:col-span-2
          "
        >
          {selectedBerry ? (
            <BerryCard
              berry={selectedBerry}
              actionLabel="🌱 Plant This Berry"
              onAction={(berry) => {
                plantBerry(characterId, berry);
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
              <div className="text-center">
                <div className="text-5xl">
                  🍓
                </div>

                <h2 className="mt-4 text-xl font-semibold text-white">
                  No Berry Selected
                </h2>

                <p className="mt-2 text-slate-400">
                  Choose a berry from the list.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}