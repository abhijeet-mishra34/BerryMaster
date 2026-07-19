import {
  useMemo,
  useState,
} from "react";

import BerryCard from "./BerryCard";

import { berryDatabase } from "../../data/berryDatabase";

import type { BerryCategory } from "../../types/BerryCategories";

const categories: (
  | "All"
  | BerryCategory
)[] = [
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

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<
    "All" | BerryCategory
  >("All");

  const filteredBerries = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return berryDatabase.filter(
      (berry) => {
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
      }
    );
  }, [
    search,
    selectedCategory,
  ]);

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedCategory !== "All";

  function clearFilters() {
    setSearch("");
    setSelectedCategory("All");
  }

  return (
    <div className="flex flex-col gap-3">

      {/* =====================================
          Search & Filters
      ===================================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          space-y-4
          bg-gradient-to-br
          from-slate-900/90
          to-slate-950/90
          shadow-xl
          shadow-black/20
          backdrop-blur-xl
        "
      >

        {/* =====================================
            Search Header
        ===================================== */}

        <div
          className="
            space-y-5
            bg-white/[0.02]
            px-6
            py-5
          "
        >

          <div
            className="
              flex
              flex-col
              gap-2
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

  

            {hasActiveFilters && (

              <button
                type="button"
                onClick={clearFilters}
                className="
                  w-fit
                  text-sm
                  font-medium
                  text-emerald-400
                  transition-colors
                  hover:text-emerald-300
                "
              >
                Clear all filters
              </button>

            )}

          </div>

        </div>


        {/* =====================================
            Search
        ===================================== */}

        <div className="p-6">

          <label
            htmlFor="berry-search"
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-300
            "
          >
            Search Berries
          </label>

          <div
            className="
              group
              flex
              items-center
              gap-3
            "
          >

            {/* Search Icon */}

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-700
                bg-slate-950/70
                text-lg
                transition-all
                duration-200
                group-focus-within:border-emerald-500/60
                group-focus-within:bg-emerald-500/10
              "
            >
              🔍
            </div>


            {/* Search Input */}

            <div className="relative min-w-0 flex-1">

              <input
                id="berry-search"
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by berry name, ID, description, or tag..."
                className="
                  w-full
                  rounded-xl
                 space-y-5
                  bg-slate-950/70
                  px-4
                  py-3
                  text-white
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-slate-500
                  hover:border-slate-600
                  focus:border-emerald-500
                  focus:bg-slate-950
                  focus:ring-2
                  focus:ring-emerald-500/20
                "
              />

              {search && (

                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    h-7
                    w-7
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    text-slate-500
                    transition-all
                    hover:bg-slate-800
                    hover:text-white
                  "
                >
                  ✕
                </button>

              )}

            </div>

          </div>


          {/* =====================================
              Divider
          ===================================== */}

          <div
            className="
              my-6
              h-px
              bg-gradient-to-r
              from-transparent
              via-slate-700
              to-transparent
            "
          />


          {/* =====================================
              Categories
          ===================================== */}

          <div>

            <div
              className="
                mb-3
                flex
                items-center
                justify-between
              "
            >

              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-300
                "
              >
                Categories
              </p>

              <span
                className="
                  text-xs
                  text-slate-500
                "
              >
                {selectedCategory === "All"
                  ? "All categories"
                  : selectedCategory}
              </span>

            </div>


            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              {categories.map(
                (category) => {

                  const isSelected =
                    selectedCategory ===
                    category;

                  return (

                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(
                          category
                        )
                      }
                      className={`
                        rounded-xl
                        space-y-5
                        px-4
                        py-2
                        text-sm
                        font-medium
                        transition-all
                        duration-200
                        active:scale-95

                        ${
                          isSelected
                            ? `
                              border-emerald-400
                              bg-emerald-500
                              text-slate-950
                              shadow-lg
                              shadow-emerald-500/20
                              hover:bg-emerald-400
                            `
                            : `
                              border-slate-700
                              bg-slate-800/70
                              text-slate-300
                              hover:-translate-y-0.5
                              hover:border-emerald-500/40
                              hover:bg-slate-800
                              hover:text-white
                            `
                        }
                      `}
                    >
                      {category}
                    </button>

                  );

                }
              )}

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          Results Summary
      ===================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-slate-800
            bg-slate-900/70
            px-4
            py-2
            text-sm
            text-slate-400
            shadow-lg
            shadow-black/10
          "
        >

          <span
            className="
              text-emerald-400
              transition-transform
              duration-300
              hover:scale-125
            "
          >
            🍓
          </span>

          <span>
            Showing
          </span>

          <span
            className="
              font-semibold
              text-white
            "
          >
            {filteredBerries.length}
          </span>

          <span>
            of
          </span>

          <span
            className="
              font-semibold
              text-white
            "
          >
            {berryDatabase.length}
          </span>

          <span>
            berries
          </span>

        </div>


        {hasActiveFilters && (

          <button
            type="button"
            onClick={clearFilters}
            className="
              w-fit
              text-sm
              font-medium
              text-emerald-400
              transition-colors
              hover:text-emerald-300
            "
          >
            Reset filters
          </button>

        )}

      </div>


      {/* =====================================
          Berry Grid
      ===================================== */}

      {filteredBerries.length > 0 ? (

        <div
          className="
            grid
            gap-8
            sm:grid-cols-1
            lg:grid-cols-2
            xl:grid-cols-3
          "
        >

          {filteredBerries.map(
            (berry) => (

              <BerryCard
                key={berry.id}
                berry={berry}
              />

            )
          )}

        </div>

      ) : (

        <div
          className="
            flex
            min-h-[320px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-700
            bg-gradient-to-b
            from-slate-900/70
            to-slate-950/70
            px-6
            py-16
            text-center
            backdrop-blur-xl
          "
        >

          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/10
              text-4xl
              shadow-lg
              shadow-emerald-500/10
            "
          >
            🍓
          </div>

          <h2
            className="
              mt-6
              text-2xl
              font-bold
              text-white
            "
          >
            No berries found
          </h2>

          <p
            className="
              mt-2
              max-w-md
              text-slate-400
            "
          >
            Try adjusting your search or selecting a different category.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="
              mt-6
              rounded-xl
              bg-emerald-500
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-950
              shadow-lg
              shadow-emerald-500/20
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-emerald-400
              active:translate-y-0
            "
          >
            Reset Filters
          </button>

        </div>

      )}

    </div>
  );
}