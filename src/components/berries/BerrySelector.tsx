import { useMemo, useState } from "react";

import BerryCard from "./BerryCard";

import { berryDatabase } from "../../data/berryDatabase";
import type { BerryCategory } from "../../types/BerryCategories";

const categories: ("All" | BerryCategory)[] = [
  "All",
  "Status",
  "Healing",
  "PP Recovery",
  "Flavor",
  "EV",
  "Type Resist",
  "Special",
];

export default function BerrySelector() {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState<"All" | BerryCategory>("All");

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

  return (
    <div className="space-y-6">
      
      {/* Category Buttons */}

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`
              rounded-full
              px-4
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

      {/* Results */}

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredBerries.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {berryDatabase.length}
          </span>{" "}
          berries
        </p>
      </div>

      {/* Berry Grid */}

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {filteredBerries.length > 0 ? (
          filteredBerries.map((berry) => (
            <BerryCard
              key={berry.id}
              berry={berry}
            />
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
            <p className="text-lg font-semibold text-white">
              No berries found
            </p>

            <p className="mt-2 text-slate-400">
              Try a different search or
              category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}