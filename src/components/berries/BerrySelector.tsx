import { useMemo, useState } from "react";
import { Search, X, RotateCcw } from "lucide-react";

import BerryCard from "./BerryCard";
import {
  berryDatabase,
  publicBerryDatabase,
} from "../../data/berryDatabase";
import { useSettings } from "../../context/SettingsContext";
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
  const { showDeveloperBerries } = useSettings();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | BerryCategory>("All");

  const availableBerries = showDeveloperBerries
    ? berryDatabase
    : publicBerryDatabase;

  const filteredBerries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return availableBerries
      .filter((berry) => {
        const matchesCategory =
          selectedCategory === "All" ||
          berry.categories.includes(selectedCategory);

        const matchesSearch =
          berry.name.toLowerCase().includes(query) ||
          berry.id.toLowerCase().includes(query) ||
          berry.description?.toLowerCase().includes(query) ||
          berry.tags?.some((tag) => tag.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [availableBerries, search, selectedCategory]);

  const hasActiveFilters = search.trim() !== "" || selectedCategory !== "All";

  function clearFilters() {
    setSearch("");
    setSelectedCategory("All");
  }

  return (
    <div className="flex flex-col gap-8">
      {/* =====================================
          Search & Category Filters Panel
      ===================================== */}
      <div
        className="
          theme-card
          relative
          rounded-xl
          backdrop-blur-xl
        "
        style={{
          padding: "1.75rem 2rem",
        }}
      >
        {/* Search Header & Input */}
        <div className="space-y-3 pb-7 border-b border-slate-800 light:border-slate-200">
          <div className="flex items-center justify-between">
            <label
              htmlFor="berry-search"
              className="text-xs font-bold uppercase tracking-wider text-slate-300 light:text-slate-700"
            >
              Search Berries
            </label>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 light:text-emerald-600 light:hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div
            className="
              flex
              items-center
              gap-3.5
              rounded-xl
              border
              border-slate-800
              light:border-slate-300
              bg-slate-950/80
              light:bg-slate-50
              px-4
              py-2
              transition-all
              duration-200
              focus-within:border-emerald-400
              focus-within:bg-slate-950
              light:focus-within:bg-white
              focus-within:ring-4
              focus-within:ring-emerald-500/15
            "
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 light:text-emerald-600">
              <Search className="h-5 w-5" />
            </div>

            <input
              id="berry-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by berry name, ID, category, or tag..."
              className="
                w-full
                bg-transparent
                py-2.5
                text-base
                font-semibold
                text-white
                light:text-slate-900
                placeholder:text-slate-500
                light:placeholder:text-slate-400
                outline-none
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-slate-800
                  light:bg-slate-200
                  text-slate-400
                  light:text-slate-600
                  transition-all
                  hover:bg-slate-700
                  light:hover:bg-slate-300
                  hover:text-white
                  light:hover:text-slate-900
                  cursor-pointer
                "
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-4 pt-7">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300 light:text-slate-700">
              Browse by Category
            </p>
            <span className="text-xs font-mono font-medium text-slate-400 light:text-slate-500">
              {selectedCategory === "All" ? "All Categories" : selectedCategory}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    rounded-xl
                    border
                    px-5
                    py-2.5
                    text-xs
                    sm:text-sm
                    font-bold
                    transition-all
                    duration-200
                    active:scale-95
                    cursor-pointer
                    ${
                      isSelected
                        ? "border-emerald-400/60 bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/40"
                        : "border-slate-800 light:border-slate-200 bg-slate-950/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:border-emerald-500/40 hover:bg-slate-900 light:hover:bg-slate-200 hover:text-white light:hover:text-slate-900 shadow-xs"
                    }
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================
          Results Summary Bar
      ===================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-2">
        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/70 light:bg-white px-4 py-2 text-xs sm:text-sm text-slate-300 light:text-slate-700 shadow-xs">
          <span>🍓</span>
          <span>Showing</span>
          <span className="font-bold text-white light:text-slate-900">{filteredBerries.length}</span>
          <span>of</span>
          <span className="font-bold text-white light:text-slate-900">{availableBerries.length}</span>
          <span>berries</span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="w-fit text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 light:text-emerald-600 light:hover:text-emerald-700 transition-colors cursor-pointer"
          >
            Clear Active Filters
          </button>
        )}
      </div>

      {/* =====================================
          Berry Grid
      ===================================== */}
      {filteredBerries.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredBerries.map((berry) => (
            <BerryCard key={berry.id} berry={berry} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 light:border-slate-300 bg-slate-900/40 light:bg-white p-12 text-center backdrop-blur-xl shadow-xs">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-4xl shadow-lg shadow-emerald-500/10">
            🍓
          </div>
          <h2 className="mt-6 text-2xl font-bold text-white light:text-slate-900">No berries found</h2>
          <p className="mt-2 max-w-md text-sm text-slate-400 light:text-slate-600">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-xl border border-emerald-400/40 bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
