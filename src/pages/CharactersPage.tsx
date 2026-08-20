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
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Modal from "../components/ui/Modal";

import PlantBerrySelector from "../components/berries/PlantBerrySelector";

import { useCharacters } from "../context/CharacterContext";
import { useToast } from '../context/ToastContext';
import { getCharacterStatus } from "../utils/characterStatus";
import { berryDatabase } from "../data/berryDatabase";

import type { Character } from "../types/Character";

export default function CharactersPage() {
  const location = useLocation();
  const { addToast } = useToast();

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
        const matchesBerry = berry?.name.toLowerCase().includes(q) ?? false;
        return matchesName || matchesBerry;
      }
      return true;
    });
  }, [characters, statusFilter, searchQuery]);

  // =====================================
  // Keyboard Shortcuts
  // =====================================

  const anyModalOpen =
    isCharacterModalOpen ||
    isDeleteOpen ||
    isRemoveBerryOpen ||
    isChangeBerryOpen ||
    plantCharacter !== null;

  const keyHandlerRef = useRef<((e: KeyboardEvent) => void) | null>(null);

  keyHandlerRef.current = (e: KeyboardEvent) => {
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
  };

  useEffect(() => {
    function handle(e: KeyboardEvent) {
      keyHandlerRef.current?.(e);
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  // Scroll focused card into view when navigating
  useEffect(() => {
    if (focusedIndex === null) return;
    const char = characters[focusedIndex];
    if (!char) return;
    characterRefs.current[char.id]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [focusedIndex, characters]);


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
            p-6
            sm:p-8
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
                Characters
              </h1>
              <p className="mt-1 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-400 light:text-slate-600">
                Manage and monitor your berry farming characters.
              </p>
            </div>
          </div>

          {/* Action Buttons: Bulk actions + Add Character */}
          <div className="flex flex-wrap items-center gap-3">
            {countNeedWater > 1 && (
              <button
                type="button"
                onClick={handleWaterAll}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-sky-500/30
                  bg-sky-500/15
                  hover:bg-sky-500
                  hover:text-slate-950
                  light:hover:text-white
                  px-4
                  py-3.5
                  text-sm
                  font-bold
                  text-sky-400
                  light:text-sky-700
                  transition-all
                  duration-200
                  cursor-pointer
                  shadow-sm
                  active:scale-95
                "
              >
                <Droplets className="h-4.5 w-4.5" />
                <span>Water All ({countNeedWater})</span>
              </button>
            )}

            {countHarvestReady > 1 && (
              <button
                type="button"
                onClick={handleHarvestAll}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-amber-500/30
                  bg-amber-500/15
                  hover:bg-amber-500
                  hover:text-slate-950
                  light:hover:text-white
                  px-4
                  py-3.5
                  text-sm
                  font-bold
                  text-amber-400
                  light:text-amber-700
                  transition-all
                  duration-200
                  cursor-pointer
                  shadow-sm
                  active:scale-95
                "
              >
                <Wheat className="h-4.5 w-4.5" />
                <span>Harvest All ({countHarvestReady})</span>
              </button>
            )}

            <button
              type="button"
              onClick={openAddModal}
              className="
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
                px-6
                py-3.5
                text-sm
                font-bold
                text-slate-950
                shadow-lg
                shadow-emerald-500/25
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:from-emerald-400
                hover:to-teal-400
                hover:shadow-emerald-500/40
                active:translate-y-0
                cursor-pointer
              "
            >
              <UserPlus className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              <span>Add Character</span>
            </button>
          </div>
        </div>

        {/* Character Count */}
        <div className="flex items-center gap-3 border-t border-slate-800 light:border-slate-200 bg-white/[0.02] light:bg-slate-50 px-8 py-4">
          <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3.5 py-2">
            <span className="text-sm">👥</span>
            <span className="text-sm font-bold text-emerald-400 light:text-emerald-700">
              {characters.length}
            </span>
          </div>

          <span className="text-xs sm:text-sm font-medium text-slate-400 light:text-slate-600">
            {characters.length === 1
              ? "character in your farming team"
              : "characters in your farming team"}
          </span>
        </div>

        {/* Keyboard Shortcut Hints */}
        {characters.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-slate-800 light:border-slate-200 bg-slate-950/50 light:bg-slate-100/80 px-6 py-3.5 sm:px-8">
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 light:text-amber-700 mr-1">
              <span className="text-sm">⌨️</span>
              <span>Shortcuts:</span>
            </span>
            {[
              { key: "N", label: "Add Character" },
              { key: "↑ ↓", label: "Navigate" },
              { key: "E", label: "Edit" },
              { key: "Del", label: "Delete" },
              { key: "W", label: "Water" },
              { key: "H", label: "Harvest" },
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search characters or planted berries..."
              className="
                w-full
                rounded-xl
                border
                border-slate-800
                light:border-slate-300
                bg-slate-900/60
                light:bg-white
                py-2.5
                pl-10
                pr-9
                text-sm
                text-white
                light:text-slate-900
                placeholder-slate-500
                transition-all
                focus:border-emerald-500
                focus:outline-none
                focus:ring-1
                focus:ring-emerald-500
              "
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white light:hover:text-slate-900 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All", count: characters.length },
              { id: "needWater", label: "Needs Water", count: countNeedWater, icon: "💧" },
              { id: "harvestReady", label: "Harvest Ready", count: countHarvestReady, icon: "🌾" },
              { id: "growing", label: "Growing", count: countGrowing, icon: "🌱" },
              { id: "ready", label: "Ready to Plant", count: countReadyToPlant, icon: "⚪" },
              ...(countWilted > 0
                ? [{ id: "wilted", label: "Wilted", count: countWilted, icon: "🍂" }]
                : []),
            ].map((pill) => {
              const isActive = statusFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setStatusFilter(pill.id as any)}
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
            rounded-xl
            border
            border-dashed
            border-slate-700
            bg-slate-900/50
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
              h-24
              w-24
              items-center
              justify-center
              rounded-xl
              border
              border-emerald-400/20
              bg-emerald-500/10
              text-5xl
            "
          >
            👤
          </div>


          <h2
            className="
              mt-7
              text-2xl
              font-bold
              text-white
            "
          >
            No characters yet
          </h2>


          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-relaxed
              text-slate-400
            "
          >
            Add your first character to begin managing your berry farming operation.
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
              <span>Add Your First Character</span>
            </button>
          </div>

        </div>

      ) : filteredCharacters.length === 0 ? (

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 light:border-slate-300 bg-slate-900/40 light:bg-slate-50 py-16 px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 light:bg-slate-200 text-2xl text-slate-400 mb-4">
            <Search className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-white light:text-slate-900">
            No matching characters
          </h3>
          <p className="mt-1 max-w-sm text-xs sm:text-sm text-slate-400 light:text-slate-600">
            No characters match your current search or status filter.
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
            <span>Reset Filters</span>
          </button>
        </div>

      ) : (

        <div
          className="
            grid
            gap-8
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
            ? "Edit Character"
            : "Add Character"
        }

        saveButtonText={
          editingCharacter
            ? "Save Changes"
            : "Add Character"
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
            ? "🔄 Change Berry"
            : "🌱 Plant Berry"
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

        title="Delete Character"

        message="Are you sure you want to delete this character?"

        itemName={
          selectedCharacter?.name
        }

        confirmText="Delete"

        cancelText="Cancel"

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

        title="Change Planted Berry"

        message="Changing the planted berry will reset the watering progress, harvest timer, wilt timer, and begin a brand-new farming cycle."

        itemName={
          changeBerryCharacter?.name
        }

        confirmText="Choose New Berry"

        cancelText="Cancel"

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

        title="Remove Planted Berry"

        message="Are you sure you want to remove the currently planted berry? This will reset the current farming progress and cannot be undone."

        itemName={
          removeBerryCharacter?.name
        }

        confirmText="Remove Berry"

        cancelText="Cancel"

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

    </div>
  );
}