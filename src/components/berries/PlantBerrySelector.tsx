import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ListFilter, Info } from "lucide-react";

import BerryCard from "./BerryCard";
import BerryList from "./BerryList";
import BerryFilters from "./BerryFilters";

import {
  berryDatabase,
  publicBerryDatabase,
} from "../../data/berryDatabase";
import { useCharacters } from "../../context/CharacterContext";
import { useFavorites } from "../../context/FavoritesContext";

import type { Berry } from "../../types/Berry";
import type { BerryCategory } from "../../types/BerryCategories";

import { BerryCategories } from "../../types/BerryCategories";
import { useSettings } from "../../context/SettingsContext";

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
  const { showDeveloperBerries } = useSettings();
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<"All" | BerryCategory>("All");
  const [selectedBerry, setSelectedBerry] = useState<Berry | null>(null);

  const selectorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // =====================================
  // Filter & Sort Berries
  // =====================================
  const filteredBerries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return (showDeveloperBerries ? berryDatabase : publicBerryDatabase)
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
      .sort((a, b) => {
        const aFavorite = isFavorite(a.id);
        const bFavorite = isFavorite(b.id);

        // Favorites first
        if (aFavorite !== bFavorite) {
          return aFavorite ? -1 : 1;
        }

        // Alphabetical order
        return a.name.localeCompare(b.name);
      });
  }, [search, selectedCategory, isFavorite, showDeveloperBerries]);

  // =====================================
  // Keep Selection Valid
  // =====================================
  useEffect(() => {
    if (
      filteredBerries.length > 0 &&
      !filteredBerries.some((berry) => berry.id === selectedBerry?.id)
    ) {
      setSelectedBerry(filteredBerries[0]);
    }

    if (filteredBerries.length === 0) {
      setSelectedBerry(null);
    }
  }, [filteredBerries, selectedBerry]);

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

    const index = filteredBerries.findIndex(
      (berry) => berry.id === selectedBerry.id
    );

    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [selectedBerry, filteredBerries]);

  // =====================================
  // Plant Selected Berry
  // =====================================
  function handlePlant(berry: Berry) {
    plantBerry(characterId, berry);
    onPlantSuccess?.();
    onClose();
  }

  // =====================================
  // Keyboard Navigation
  // =====================================
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (filteredBerries.length === 0) {
      return;
    }

    const currentIndex = filteredBerries.findIndex(
      (berry) => berry.id === selectedBerry?.id
    );

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const nextIndex =
          currentIndex < filteredBerries.length - 1 ? currentIndex + 1 : 0;
        setSelectedBerry(filteredBerries[nextIndex]);
        break;
      }

      case "ArrowUp": {
        event.preventDefault();
        const previousIndex =
          currentIndex > 0
            ? currentIndex - 1
            : filteredBerries.length - 1;
        setSelectedBerry(filteredBerries[previousIndex]);
        break;
      }

      case "Enter": {
        if (!selectedBerry) {
          return;
        }
        event.preventDefault();
        handlePlant(selectedBerry);
        break;
      }

      case "Escape": {
        event.preventDefault();
        onClose();
        break;
      }
    }
  }

  const [activeTab, setActiveTab] = useState<"list" | "details">("list");

  function handleSelectBerry(berry: Berry) {
    setSelectedBerry(berry);
    // On mobile, automatically show details when a berry is tapped
    setActiveTab("details");
  }

  return (
    <div
      ref={selectorRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="space-y-4 sm:space-y-6 outline-none"
    >
      {/* Mobile Tab Switcher (Visible only below lg breakpoint) */}
      <div className="flex lg:hidden rounded-xl border border-white/[0.08] light:border-slate-200 bg-slate-900/60 light:bg-slate-100 p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("list")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "list"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <ListFilter className="h-3.5 w-3.5" />
          <span>Choose Berry ({filteredBerries.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("details")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "details"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Info className="h-3.5 w-3.5" />
          <span>Details & Plant {selectedBerry ? `(${selectedBerry.name})` : ""}</span>
        </button>
      </div>

      {/* =====================================
          Filters (Show on mobile only when on list tab)
      ===================================== */}
      <div className={activeTab === "details" ? "hidden lg:block" : "block"}>
        <BerryFilters
          search={search}
          onSearchChange={setSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* =====================================
          Master / Detail Layout
      ===================================== */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Berry List Column */}
        <div className={activeTab === "details" ? "hidden lg:block" : "block"}>
          <BerryList
            berries={filteredBerries}
            selectedBerry={selectedBerry}
            onSelectBerry={handleSelectBerry}
            itemRefs={itemRefs}
          />
        </div>

        {/* Berry Details Column */}
        <div
          className={`
            ${activeTab === "list" ? "hidden lg:flex" : "flex"}
            h-[450px]
            sm:h-[500px]
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
            lg:col-span-2
          `}
        >
          {/* Details Header */}
          <div
            className="
              shrink-0
              border-b
              border-slate-800
              light:border-slate-200
              bg-slate-900/40
              light:bg-slate-50
              px-4
              sm:px-5
              py-3.5
              sm:py-4
            "
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400 light:text-emerald-700">
                  Berry Information
                </p>

                <h2 className="mt-0.5 sm:mt-1 text-base sm:text-lg font-semibold text-white light:text-slate-900">
                  Berry Details
                </h2>

                <p className="mt-0.5 text-xs text-slate-400 light:text-slate-600">
                  Review requirements and growth stats before planting.
                </p>
              </div>

              {/* Mobile button to switch back to list */}
              <button
                type="button"
                onClick={() => setActiveTab("list")}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold cursor-pointer"
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span>Change Berry</span>
              </button>

              <div className="hidden rounded-lg border border-slate-800 light:border-slate-200 bg-slate-950/40 light:bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-400 light:text-slate-600 sm:block">
                Use ↑ ↓ to navigate
              </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {selectedBerry ? (
              <BerryCard
                berry={selectedBerry}
                actionLabel="Plant This Berry"
                onAction={handlePlant}
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-800 light:border-slate-300 bg-slate-900/20 light:bg-slate-50/50">
                <div className="text-center p-6 sm:p-8">
                  <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-3xl sm:text-4xl shadow-xs">
                    🌱
                  </div>

                  <h2 className="mt-4 text-base sm:text-lg font-bold text-white light:text-slate-900">
                    No Berry Selected
                  </h2>

                  <p className="mt-1.5 text-xs text-slate-400 light:text-slate-500">
                    Choose a berry from the list to preview details and plant.
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveTab("list")}
                    className="mt-4 lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold cursor-pointer"
                  >
                    <ListFilter className="h-4 w-4" />
                    <span>Open Berry List</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
