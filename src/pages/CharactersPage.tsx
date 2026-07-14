import { useState } from "react";

import CharacterCard from "../components/characters/CharacterCard";
import CharacterModal from "../components/characters/CharacterModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

import PlantBerrySelector from "../components/berries/PlantBerrySelector";

import { useCharacters } from "../context/CharacterContext";

import type { Character } from "../types/Character";

export default function CharactersPage() {
  const {
    characters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    waterBerry,
    harvestBerry,
  } = useCharacters();

  const [isCharacterModalOpen, setIsCharacterModalOpen] =
    useState(false);

  const [editingCharacter, setEditingCharacter] =
    useState<Character | null>(null);

  const [plantCharacter, setPlantCharacter] =
    useState<Character | null>(null);

  const [changeBerryCharacter, setChangeBerryCharacter] =
    useState<Character | null>(null);

  const [isChangeBerryOpen, setIsChangeBerryOpen] =
    useState(false);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const [selectedCharacter, setSelectedCharacter] =
    useState<{
      id: string;
      name: string;
      index: number;
    } | null>(null);

  // NEW
  const [
    highlightedCharacterId,
    setHighlightedCharacterId,
  ] = useState<string | null>(null);

  function openAddModal() {
    setEditingCharacter(null);
    setIsCharacterModalOpen(true);
  }

  function openEditModal(character: Character) {
    setEditingCharacter(character);
    setIsCharacterModalOpen(true);
  }

  function handleSaveCharacter(name: string) {
    if (editingCharacter) {
      updateCharacter(editingCharacter.id, name);
    } else {
      addCharacter(name);
    }

    setIsCharacterModalOpen(false);
  }

  function handleDelete() {
    if (!selectedCharacter) return;

    deleteCharacter(selectedCharacter.id);

    setSelectedCharacter(null);
    setIsDeleteOpen(false);
  }

  // NEW
  function highlightCharacter(characterId: string) {
    setHighlightedCharacterId(characterId);

     window.setTimeout(() => {
    setHighlightedCharacterId((current) =>
      current === characterId ? null : current
    );
  }, 2000);
}

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Characters
          </h1>

          <p className="mt-1 text-slate-400">
            Manage your berry farming characters.
          </p>

        </div>

        <Button onClick={openAddModal}>
          ➕ Add Character
        </Button>

      </div>

      {/* Character Grid */}

      <div className="grid gap-6 lg:grid-cols-2">

        {characters.map((character, index) => (

          <CharacterCard
            key={character.id}
            character={character}
            index={index}

            highlight={
              highlightedCharacterId === character.id
                ? "plant"
                : null
            }

            onPlant={() =>
              setPlantCharacter(character)
            }

            onWater={() =>
              waterBerry(character.id)
            }

            onHarvest={() =>
              harvestBerry(character.id)
            }

            onChangeBerry={() => {
              setChangeBerryCharacter(character);
              setIsChangeBerryOpen(true);
            }}

            onEdit={() =>
              openEditModal(character)
            }

            onDelete={() => {
              setSelectedCharacter({
                id: character.id,
                name: character.name,
                index,
              });

              setIsDeleteOpen(true);
            }}
          />

        ))}

      </div>

            {/* Add / Edit Character */}

      <CharacterModal
        isOpen={isCharacterModalOpen}
        onClose={() =>
          setIsCharacterModalOpen(false)
        }
        onSave={handleSaveCharacter}
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
          editingCharacter?.name ?? ""
        }
      />

      {/* Plant Berry */}

      <Modal
        isOpen={plantCharacter !== null}
        title={
          plantCharacter?.plantedBerryId
            ? "🔄 Change Berry"
            : "🌱 Plant Berry"
        }
        onClose={() =>
          setPlantCharacter(null)
        }
      >
        {plantCharacter && (
          <PlantBerrySelector
  characterId={plantCharacter.id}
  onClose={() =>
    setPlantCharacter(null)
  }
  onPlantSuccess={() =>
    highlightCharacter(plantCharacter.id)
  }
/>
        )}
      </Modal>

      {/* Delete Confirmation */}

      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete Character"
        message="Are you sure you want to delete this character?"
        itemName={selectedCharacter?.name}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setSelectedCharacter(null);
          setIsDeleteOpen(false);
        }}
      />

      {/* Change Berry Confirmation */}

      <ConfirmDialog
        isOpen={isChangeBerryOpen}
        title="Change Planted Berry"
        message="Changing the planted berry will reset the watering progress, harvest timer, wilt timer, and begin a brand-new farming cycle."
        itemName={changeBerryCharacter?.name}
        confirmText="Choose New Berry"
        cancelText="Cancel"
        onConfirm={() => {
          setPlantCharacter(changeBerryCharacter);
          setChangeBerryCharacter(null);
          setIsChangeBerryOpen(false);
        }}
        onCancel={() => {
          setChangeBerryCharacter(null);
          setIsChangeBerryOpen(false);
        }}
      />

    </div>
  );
}