import {
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

import {
  useLocation,
} from "react-router-dom";

import {
  UserPlus,
  Search,
  X,
  Droplets,
  Wheat,
  RotateCcw,
} from "lucide-react";

import CharacterCard from "../components/characters/CharacterCard";
import CharacterModal from "../components/characters/CharacterModal";
import TimerPickerModal from "../components/characters/TimerPickerModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Modal from "../components/ui/Modal";

import PlantBerrySelector from "../components/berries/PlantBerrySelector";

import { useCharacters } from "../context/CharacterContext";
import { useToast } from '../context/ToastContext';
import { useTranslation } from "../context/LanguageContext";
import { getCharacterStatus } from "../utils/characterStatus";
import { berryDatabase } from "../data/berryDatabase";

import type { Character } from "../types/Character";

export default function CharactersPage() {
  const location = useLocation();
  const { addToast } = useToast();
  const { t, getBerryName } = useTranslation();

  const {
    characters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    removeBerry,
    waterBerry,
    harvestBerry,
    waterAllReady,
    harvestAllReady,
    updateCharacterTimers,
  } = useCharacters();

  // =====================================
  // Search & Filter State
  // =====================================

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "needWater" | "harvestReady" | "growing" | "ready" | "wilted"
  >("all");

  // =====================================
  // Modal State
  // =====================================

  const [timerPickerCharacter, setTimerPickerCharacter] = useState<Character | null>(null);
  const [timerPickerTarget, setTimerPickerTarget] = useState<"planted" | "water">("planted");

  const [
    isCharacterModalOpen,
    setIsCharacterModalOpen,
  ] = useState(false);

  const [
    editingCharacter,
    setEditingCharacter,
  ] = useState<Character | null>(null);

  const [
    plantCharacter,
    setPlantCharacter,
  ] = useState<Character | null>(null);

  const [
    changeBerryCharacter,
    setChangeBerryCharacter,
  ] = useState<Character | null>(null);

  const [
    isChangeBerryOpen,
    setIsChangeBerryOpen,
  ] = useState(false);

  const [
    isDeleteOpen,
    setIsDeleteOpen,
  ] = useState(false);

  const [
    isRemoveBerryOpen,
    setIsRemoveBerryOpen,
  ] = useState(false);

  const [
    removeBerryCharacter,
    setRemoveBerryCharacter,
  ] = useState<Character | null>(null);


  // =====================================
  // Selected Character
  // =====================================

  const [
    selectedCharacter,
    setSelectedCharacter,
  ] = useState<{
    id: string;
    name: string;
    index: number;
  } | null>(null);


  // =====================================
  // Highlighted Character
  // =====================================

  const [
    highlightedCharacterId,
    setHighlightedCharacterId,
  ] = useState<string | null>(null);


  // =====================================
  // Keyboard Navigation State
  // =====================================

  const [
    focusedIndex,
    setFocusedIndex,
  ] = useState<number | null>(null);


  const characterRefs =
    useRef<
      Record<
        string,
        HTMLDivElement | null
      >
    >({});


  // =====================================
  // Navigate To & Highlight Character
  // =====================================

  useEffect(() => {
    const characterId =
      location.state?.highlightCharacterId;

    if (!characterId) {
      return;
    }

    setHighlightedCharacterId(
      characterId
    );

    const scrollTimer =
      window.setTimeout(() => {
        characterRefs.current[
          characterId
        ]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);

    const highlightTimer =
      window.setTimeout(() => {
        setHighlightedCharacterId(
          null
        );
      }, 2200);

    return () => {
      window.clearTimeout(
        scrollTimer
      );

      window.clearTimeout(
        highlightTimer
      );
    };
  }, [location.state]);


  // =====================================
  // Computed Status Counts & Filtered List
  // =====================================

  const countNeedWater = useMemo(
    () => characters.filter((c) => getCharacterStatus(c).status === "needWater").length,
    [characters]
  );
  const countHarvestReady = useMemo(
    () => characters.filter((c) => getCharacterStatus(c).status === "harvestReady").length,
    [characters]
  );
  const countGrowing = useMemo(
    () => characters.filter((c) => getCharacterStatus(c).status === "growing").length,
    [characters]
  );
  const countReadyToPlant = useMemo(
    () => characters.filter((c) => getCharacterStatus(c).status === "ready").length,
    [characters]
  );
  const countWilted = useMemo(
    () => characters.filter((c) => getCharacterStatus(c).status === "wilted").length,
    [characters]
  );

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const status = getCharacterStatus(character).status;
      if (statusFilter !== "all" && status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = character.name.toLowerCase().includes(q);
        const berry = character.plantedBerryId
          ? berryDatabase.find((b) => b.id === character.plantedBerryId)
          : null;
        const localizedBerry = berry ? getBerryName(berry.id, berry.name) : "";
        const matchesBerry =
          (berry?.name.toLowerCase().includes(q) ?? false) ||
          localizedBerry.toLowerCase().includes(q);
        return matchesName || matchesBerry;
      }
      return true;
    });
  }, [characters, statusFilter, searchQuery, getBerryName]);

  // =====================================
  // Keyboard Shortcuts
  // =====================================

  const anyModalOpen =
    isCharacterModalOpen ||
    isDeleteOpen ||
    isRemoveBerryOpen ||
    isChangeBerryOpen ||
    plantCharacter !== null;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (document.activeElement?.tagName ?? "").toLowerCase();
      if (["input", "textarea", "select"].includes(tag)) return;
      if (anyModalOpen) return;

      switch (e.key) {
        case "n":
        case "N":
          e.preventDefault();
          openAddModal();
          break;

        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          if (filteredCharacters.length === 0) return;
          setFocusedIndex((prev) =>
            prev === null ? 0 : Math.min(prev + 1, filteredCharacters.length - 1)
          );
          break;

        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          if (filteredCharacters.length === 0) return;
          setFocusedIndex((prev) =>
            prev === null ? filteredCharacters.length - 1 : Math.max(prev - 1, 0)
          );
          break;

        case "e":
        case "E": {
          if (focusedIndex === null || !filteredCharacters[focusedIndex]) return;
          e.preventDefault();
          openEditModal(filteredCharacters[focusedIndex]);
          break;
        }

        case "Delete":
        case "Backspace": {
          if (focusedIndex === null || !filteredCharacters[focusedIndex]) return;
          e.preventDefault();
          openDeleteDialog(filteredCharacters[focusedIndex], focusedIndex);
          break;
        }

        case "w":
        case "W": {
          if (focusedIndex === null || !filteredCharacters[focusedIndex]) return;
          e.preventDefault();
          handleWater(filteredCharacters[focusedIndex]);
          break;
        }

        case "h":
        case "H": {
          if (focusedIndex === null || !filteredCharacters[focusedIndex]) return;
          e.preventDefault();
          handleHarvest(filteredCharacters[focusedIndex]);
          break;
        }

        case "Escape":
          setFocusedIndex(null);
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  // Scroll focused card into view when navigating
  useEffect(() => {
    if (focusedIndex === null) return;
    const char = filteredCharacters[focusedIndex];
    if (!char) return;
    characterRefs.current[char.id]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [focusedIndex, filteredCharacters]);


  // =====================================
  // Character Actions
  // =====================================

  function openAddModal() {
    setEditingCharacter(null);

    setIsCharacterModalOpen(
      true
    );
  }




  function openEditModal(
    character: Character
  ) {
    setEditingCharacter(
      character
    );

    setIsCharacterModalOpen(
      true
    );
  }


  function handleSaveCharacter(
    name: string
  ) {
    if (editingCharacter) {
      updateCharacter(
        editingCharacter.id,
        name
      );
      addToast(`✏️ ${name} updated!`, 'success');
    } else {
      addCharacter(name);
      addToast(`🌱 ${name} added to your team!`, 'success');
    }

    setIsCharacterModalOpen(
      false
    );
  }

   function openDeleteDialog(
  character: Character,
  index: number
) {
  setSelectedCharacter({
    id: character.id,
    name: character.name,
    index,
  });

  setIsDeleteOpen(true);
}
  function handleDelete() {
    if (!selectedCharacter) {
      return;
    }

    deleteCharacter(
      selectedCharacter.id
    );
    addToast(`🗑️ ${selectedCharacter.name} removed.`, 'warning');

    setSelectedCharacter(
      null
    );

    setIsDeleteOpen(
      false
    );
  }


  function handleRemoveBerry() {
    if (!removeBerryCharacter) {
      return;
    }

    removeBerry(
      removeBerryCharacter.id
    );
    addToast(`🍂 Berry removed from ${removeBerryCharacter.name}.`, 'warning');

    setRemoveBerryCharacter(
      null
    );

    setIsRemoveBerryOpen(
      false
    );
  }


  function handleWater(character: Character) {
    waterBerry(character.id);
    addToast(`💧 Watered ${character.name}'s berry plot!`, 'info');
  }

  function handleHarvest(character: Character) {
    harvestBerry(character.id);
    addToast(`🌾 ${character.name}'s berries harvested!`, 'success');
  }

  function handleWaterAll() {
    const count = waterAllReady();
    if (count > 0) {
      addToast(`💧 Watered all ${count} ready plots!`, 'info');
    }
  }

  function handleHarvestAll() {
    const count = harvestAllReady();
    if (count > 0) {
      addToast(`🌾 Harvested all ${count} ready crops!`, 'success');
    }
  }

  function highlightCharacter(
    characterId: string
  ) {
    setHighlightedCharacterId(
      characterId
    );

    window.setTimeout(() => {
      setHighlightedCharacterId(
        (current) =>
          current === characterId
            ? null
            : current
      );
    }, 2000);
  }

  return (
    <div
      className="
        space-y-8
      "
    >
      {/* =====================================
          Page Header
      ===================================== */}

      <div
        className="
          theme-hero
          overflow-hidden
          rounded-xl
          shadow-xl
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
            p-4
            sm:p-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Page Identity */}
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-emerald-400/20
                bg-emerald-500/10
                text-3xl
                shadow-lg
                shadow-emerald-500/10
              "
            >
              👤
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white light:text-slate-900">
                {t("characters.title")}
              </h1>
              <p className="mt-1 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-400 light:text-slate-600">
                {t("characters.subtitle")}
              </p>
            </div>
          </div>

          {/* Action Buttons: Bulk actions + Add Character */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
            {characters.length > 0 && (
              <button
                type="button"
                onClick={handleWaterAll}
                disabled={countNeedWater === 0}
                title={countNeedWater > 0 ? `Water all ${countNeedWater} plots needing water` : "No plots need watering"}
                className={`
                  flex-1
                  sm:flex-initial
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  px-3.5
                  sm:px-4
                  py-2.5
                  sm:py-3.5
                  text-xs
                  sm:text-sm
                  font-bold
                  transition-all
                  duration-200
                  ${
                    countNeedWater > 0
                      ? "border-sky-500/30 bg-sky-500/15 hover:bg-sky-500 hover:text-white text-sky-400 light:text-sky-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/25 cursor-pointer active:scale-95 shadow-sm"
                      : "border-white/[0.08] bg-slate-900/40 text-slate-500 cursor-not-allowed opacity-50"
                  }
                `}
              >
                <Droplets className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                <span>{t("characters.waterAll", { count: countNeedWater })}</span>
              </button>
            )}

            {characters.length > 0 && (
              <button
                type="button"
                onClick={handleHarvestAll}
                disabled={countHarvestReady === 0}
                title={countHarvestReady > 0 ? `Harvest all ${countHarvestReady} ripe crops` : "No crops ready to harvest"}
                className={`
                  flex-1
                  sm:flex-initial
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  px-3.5
                  sm:px-4
                  py-2.5
                  sm:py-3.5
                  text-xs
                  sm:text-sm
                  font-bold
                  transition-all
                  duration-200
                  ${
                    countHarvestReady > 0
                      ? "border-amber-500/30 bg-amber-500/15 hover:bg-amber-500 hover:text-slate-950 light:hover:text-white text-amber-400 light:text-amber-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/25 cursor-pointer active:scale-95 shadow-sm"
                      : "border-white/[0.08] bg-slate-900/40 text-slate-500 cursor-not-allowed opacity-50"
                  }
                `}
              >
                <Wheat className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                <span>{t("characters.harvestAll", { count: countHarvestReady })}</span>
              </button>
            )}

            <button
              type="button"
              onClick={openAddModal}
              className="
                w-full
                sm:w-auto
                group
                relative
                inline-flex
                items-center
                justify-center
                gap-2.5
                rounded-xl
                border
                border-emerald-400/40
                bg-gradient-to-r
                from-emerald-500
                to-teal-500
                px-4
                sm:px-6
                py-2.5
                sm:py-3.5
                text-xs
                sm:text-sm
                font-extrabold
                text-slate-950
                shadow-lg
                shadow-emerald-500/20
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-emerald-500/35
                hover:brightness-110
                active:scale-95
                active:translate-y-0
                cursor-pointer
              "
            >
              <UserPlus className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              <span>{t("characters.addCharacter")}</span>
            </button>
          </div>
        </div>

        {/* Character Count */}
        <div className="flex items-center gap-3 border-t border-slate-800 light:border-slate-200 bg-white/[0.02] light:bg-slate-50 px-4 sm:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3.5 py-1.5 sm:py-2">
            <span className="text-sm">👥</span>
            <span className="text-sm font-bold text-emerald-400 light:text-emerald-700">
              {characters.length}
            </span>
          </div>

          <span className="text-xs sm:text-sm font-medium text-slate-400 light:text-slate-600">
            {characters.length === 1
              ? t("characters.characterInTeam")
              : t("characters.charactersInTeam", { count: characters.length })}
          </span>
        </div>

        {/* Keyboard Shortcut Hints (Desktop only) */}
        {characters.length > 0 && (
          <div className="hidden sm:flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-slate-800 light:border-slate-200 bg-slate-950/50 light:bg-slate-100/80 px-6 py-3.5 sm:px-8">
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 light:text-amber-700 mr-1">
              <span className="text-sm">⌨️</span>
              <span>{t("characters.shortcuts")}</span>
            </span>
            {[
              { key: "N", label: t("characters.addCharacter") },
              { key: "↑ ↓", label: t("characters.navigate") },
              { key: "E", label: t("common.edit") },
              { key: "Del", label: t("common.delete") },
              { key: "W", label: t("characters.water") },
              { key: "H", label: t("characters.harvest") },
            ].map(({ key, label }) => (
              <span key={key} className="flex items-center gap-2">
                <kbd className="inline-flex min-w-[26px] h-6 sm:h-7 items-center justify-center rounded-lg border border-slate-700 light:border-slate-300 bg-slate-800/95 light:bg-white px-2.5 font-mono text-xs sm:text-[13px] font-bold text-emerald-400 light:text-emerald-700 shadow-xs">
                  {key}
                </kbd>
                <span className="text-xs sm:text-sm font-medium text-slate-200 light:text-slate-800">{label}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Search & Filter Bar */}
      {characters.length > 0 && (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between my-6 sm:my-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <Search className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("characters.searchPlaceholder")}
              className="w-full h-11 sm:h-12 rounded-2xl border border-white/10 light:border-slate-300 bg-[#141728] light:bg-white pl-11 pr-10 text-sm text-white light:text-slate-900 placeholder-slate-500 transition-all focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white light:hover:text-slate-900 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: "all" as const, label: t("common.all"), count: characters.length },
                { id: "needWater" as const, label: t("farming.needsWater"), count: countNeedWater, icon: "💧" },
                { id: "harvestReady" as const, label: t("farming.harvestReady"), count: countHarvestReady, icon: "🌾" },
                { id: "growing" as const, label: t("farming.growing"), count: countGrowing, icon: "🌱" },
                { id: "ready" as const, label: t("characters.readyToPlant"), count: countReadyToPlant, icon: "⚪" },
                ...(countWilted > 0
                  ? [{ id: "wilted" as const, label: t("farming.wilted"), count: countWilted, icon: "🍂" }]
                  : []),
              ]
            ).map((pill) => {
              const isActive = statusFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setStatusFilter(pill.id)}
                  className={`
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-xl
                    px-3.5
                    py-2
                    text-xs
                    font-bold
                    transition-all
                    cursor-pointer
                    ${
                      isActive
                        ? "border border-emerald-400/40 bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                        : "border border-slate-800 light:border-slate-200 bg-slate-900/60 light:bg-slate-100 text-slate-400 light:text-slate-600 hover:border-slate-700 light:hover:border-slate-300 hover:text-white light:hover:text-slate-900"
                    }
                  `}
                >
                  {pill.icon && <span>{pill.icon}</span>}
                  <span>{pill.label}</span>
                  <span
                    className={`
                      rounded-md
                      px-1.5
                      py-0.5
                      text-[10px]
                      font-extrabold
                      ${
                        isActive
                          ? "bg-slate-950/20 text-slate-950"
                          : "bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-700"
                      }
                    `}
                  >
                    {pill.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}


      {/* =====================================
          Character Content
      ===================================== */}
      <div>

      {characters.length === 0 ? (

        <div
          className="
            flex
            min-h-[400px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-800
            light:border-slate-300
            bg-slate-900/40
            light:bg-slate-50
            px-6
            py-16
            text-center
            shadow-lg
            shadow-black/10
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
              border-emerald-400/20
              light:border-emerald-200
              bg-emerald-500/10
              light:bg-emerald-50
              text-4xl
              shadow-sm
            "
          >
            👤
          </div>


          <h2
            className="
              mt-6
              text-2xl
              font-bold
              text-white
              light:text-slate-900
            "
          >
            {t("characters.noCharactersFound")}
          </h2>


          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-relaxed
              text-slate-400
              light:text-slate-600
            "
          >
            {t("characters.noCharactersSubtitle")}
          </p>


          <div
            className="
              mt-7
            "
          >
            <button
              type="button"
              onClick={openAddModal}
              className="
                group
                relative
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-emerald-400/40
                bg-gradient-to-r
                from-emerald-500
                to-teal-500
                px-8
                py-4
                text-base
                font-bold
                text-slate-950
                shadow-xl
                shadow-emerald-500/30
                transition-all
                duration-300
                hover:-translate-y-1
                hover:from-emerald-400
                hover:to-teal-400
                hover:shadow-emerald-500/50
                active:translate-y-0
                cursor-pointer
              "
            >
              <UserPlus className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              <span>{t("characters.addFirstCharacter")}</span>
            </button>
          </div>

        </div>

      ) : filteredCharacters.length === 0 ? (

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 light:border-slate-300 bg-slate-900/40 light:bg-slate-50 py-16 px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 light:bg-slate-200 text-2xl text-slate-400 mb-4">
            <Search className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-white light:text-slate-900">
            {t("characters.noMatchingCharacters")}
          </h3>
          <p className="mt-1 max-w-sm text-xs sm:text-sm text-slate-400 light:text-slate-600">
            {t("characters.noMatchingDesc")}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-400 light:text-emerald-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t("characters.resetFilters")}</span>
          </button>
        </div>

      ) : (

        <div
          className="
            grid
            gap-5
            sm:gap-6
            xl:grid-cols-2
          "
        >

          {filteredCharacters.map(
            (
              character,
              index
            ) => (

              <CharacterCard
                key={character.id}

                ref={(element) => {
                  characterRefs.current[
                    character.id
                  ] = element;
                }}

                character={character}
                index={index}

                highlight={
                  highlightedCharacterId ===
                  character.id
                    ? "plant"
                    : null
                }

                focused={focusedIndex === index}

                onPlant={() =>
                  setPlantCharacter(
                    character
                  )
                }

                onWater={() =>
                  handleWater(character)
                }

                onHarvest={() =>
                  handleHarvest(character)
                }

                onChangeBerry={() => {

                  setChangeBerryCharacter(
                    character
                  );

                  setIsChangeBerryOpen(
                    true
                  );

                }}

                onEdit={() =>
                  openEditModal(
                    character
                  )
                }

                onDelete={() =>
                  openDeleteDialog(
                    character,
                    index
                  )
                }

                onOpenTimerPicker={(target) => {
                  setTimerPickerCharacter(character);
                  setTimerPickerTarget(target);
                }}
              />

            )
          )}

        </div>

      )}
      </div>


      {/* =====================================
          Add / Edit Character
      ===================================== */}

      <CharacterModal
        isOpen={
          isCharacterModalOpen
        }

        onClose={() =>
          setIsCharacterModalOpen(
            false
          )
        }

        onSave={
          handleSaveCharacter
        }

        title={
          editingCharacter
            ? t("characters.editCharacter")
            : t("characters.addCharacter")
        }

        saveButtonText={
          editingCharacter
            ? t("characters.saveChanges")
            : t("characters.addCharacter")
        }

        initialName={
          editingCharacter?.name ??
          ""
        }

        hasPlantedBerry={
          Boolean(
            editingCharacter?.plantedBerryId
          )
        }

        onRemoveBerry={() => {

          if (!editingCharacter) {
            return;
          }

          setRemoveBerryCharacter(
            editingCharacter
          );

          setIsRemoveBerryOpen(
            true
          );

        }}
      />


      {/* =====================================
          Plant Berry
      ===================================== */}

      <Modal
        isOpen={
          plantCharacter !== null
        }
        maxWidth="5xl"
        title={
          plantCharacter?.plantedBerryId
            ? `🔄 ${t("characters.changeBerry")}`
            : `🌱 ${t("characters.plantBerry")}`
        }

        onClose={() =>
          setPlantCharacter(
            null
          )
        }
      >

        {plantCharacter && (

          <PlantBerrySelector
            characterId={
              plantCharacter.id
            }

            onClose={() =>
              setPlantCharacter(
                null
              )
            }

            onPlantSuccess={() =>
              highlightCharacter(
                plantCharacter.id
              )
            }

          />

        )}

      </Modal>


      {/* =====================================
          Delete Confirmation
      ===================================== */}

      <ConfirmDialog
        isOpen={
          isDeleteOpen
        }

        title={t("characters.deleteConfirmTitle")}

        message={t("characters.deleteConfirmMsg")}

        itemName={
          selectedCharacter?.name
        }

        confirmText={t("common.delete")}

        cancelText={t("common.cancel")}

        onConfirm={
          handleDelete
        }

        onCancel={() => {

          setSelectedCharacter(
            null
          );

          setIsDeleteOpen(
            false
          );

        }}

      />


      {/* =====================================
          Change Berry Confirmation
      ===================================== */}

      <ConfirmDialog
        isOpen={
          isChangeBerryOpen
        }

        title={t("characters.changeConfirmTitle")}

        message={t("characters.changeConfirmMsg")}

        itemName={
          changeBerryCharacter?.name
        }

        confirmText={t("characters.chooseNewBerry")}

        cancelText={t("common.cancel")}

        onConfirm={() => {

          setPlantCharacter(
            changeBerryCharacter
          );

          setChangeBerryCharacter(
            null
          );

          setIsChangeBerryOpen(
            false
          );

        }}

        onCancel={() => {

          setChangeBerryCharacter(
            null
          );

          setIsChangeBerryOpen(
            false
          );

        }}

      />


      {/* =====================================
          Remove Berry Confirmation
      ===================================== */}

      <ConfirmDialog
        isOpen={
          isRemoveBerryOpen
        }

        title={t("characters.removeConfirmTitle")}

        message={t("characters.removeConfirmMsg")}

        itemName={
          removeBerryCharacter?.name
        }

        confirmText={t("characters.removeBerry")}

        cancelText={t("common.cancel")}

        onConfirm={
          handleRemoveBerry
        }

        onCancel={() => {

          setRemoveBerryCharacter(
            null
          );

          setIsRemoveBerryOpen(
            false
          );

        }}

      />

      {/* =====================================
          Date & Time Picker Modal
      ===================================== */}
      {timerPickerCharacter && (
        <TimerPickerModal
          isOpen={Boolean(timerPickerCharacter)}
          onClose={() => setTimerPickerCharacter(null)}
          character={timerPickerCharacter}
          target={timerPickerTarget}
          onSave={(updates) => {
            updateCharacterTimers(timerPickerCharacter.id, updates);
            addToast("Farming timers updated successfully!", "success");
          }}
        />
      )}

    </div>
  );
}