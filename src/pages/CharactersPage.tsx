import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useLocation,
} from "react-router-dom";

import CharacterCard from "../components/characters/CharacterCard";
import CharacterModal from "../components/characters/CharacterModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

import PlantBerrySelector from "../components/berries/PlantBerrySelector";

import { useCharacters } from "../context/CharacterContext";

import type { Character } from "../types/Character";

export default function CharactersPage() {
  const location = useLocation();

  const {
    characters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    removeBerry,
    waterBerry,
    harvestBerry,
  } = useCharacters();


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
    } else {
      addCharacter(name);
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

    setRemoveBerryCharacter(
      null
    );

    setIsRemoveBerryOpen(
      false
    );
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
        space-y-12
      "
    >


      {/* =====================================
          Page Header
      ===================================== */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/[0.08]
          bg-gradient-to-br
          from-slate-900
          via-slate-900/90
          to-slate-950
          shadow-xl
          shadow-black/20
        "
      >

        <div
          className="
            flex
            flex-col
            gap-8
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
                rounded-2xl
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

              <h1
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-amber-600
                "
              >
                Characters
              </h1>

              <p
                className="
                  mt-1
                  max-w-xl
                  text-sm
                  leading-relaxed
                  text-slate-400
                "
              >
                Manage and monitor your berry farming characters.
              </p>

            </div>

          </div>


          {/* Add Character */}

          <Button
            onClick={openAddModal}
          >
            ➕ Add Character
          </Button>

        </div>


        {/* Character Count */}

        <div
          className="
            flex
            items-center
            gap-3
            border-t
            border-white/[0.08]
            bg-white/[0.02]
            px-6
            py-4
            sm:px-8
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-emerald-400/20
              bg-emerald-500/10
              px-3
              py-2
            "
          >

            <span className="text-sm">
              👥
            </span>

            <span
              className="
                text-sm
                font-bold
                text-emerald-400
              "
            >
              {characters.length}
            </span>

          </div>


          <span
            className="
              text-sm
              text-slate-500
            "
          >
            {characters.length === 1
              ? "character in your farming team"
              : "characters in your farming team"}
          </span>

        </div>

      </div>


      {/* =====================================
          Character Content
      ===================================== */}

      {characters.length === 0 ? (

        <div
          className="
            flex
            min-h-[400px]
            flex-col
            items-center
            justify-center
            rounded-3xl
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
              rounded-3xl
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

            <Button
              onClick={openAddModal}
            >
              ➕ Add Your First Character
            </Button>

          </div>

        </div>

      ) : (

        <div
          className="
            grid
            gap-8
            xl:grid-cols-2
          "
        >

          {characters.map(
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

                onPlant={() =>
                  setPlantCharacter(
                    character
                  )
                }

                onWater={() =>
                  waterBerry(
                    character.id
                  )
                }

                onHarvest={() =>
                  harvestBerry(
                    character.id
                  )
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