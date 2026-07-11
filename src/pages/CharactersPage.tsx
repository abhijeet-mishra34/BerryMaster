import { useState } from "react";

import Button from "../components/ui/Button";
import CharacterCard from "../components/characters/CharacterCard";
import CharacterModal from "../components/characters/CharacterModal";
import PlantBerryModal from "../components/characters/PlantBerryModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import { useCharacters } from "../context/CharacterContext";
import type { Character } from "../types/Character";

type CharacterModalState = {
  isOpen: boolean;
  mode: "add" | "edit";
  character: Character | null;
};

export default function CharactersPage() {
  const {
    characters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
  } = useCharacters();

  const [characterModal, setCharacterModal] =
    useState<CharacterModalState>({
      isOpen: false,
      mode: "add",
      character: null,
    });

  const [selectedCharacter, setSelectedCharacter] =
    useState<{
      id: string;
      name: string;
      index: number;
    } | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const [plantCharacter, setPlantCharacter] =
    useState<Character | null>(null);

  function openAddModal() {
    setCharacterModal({
      isOpen: true,
      mode: "add",
      character: null,
    });
  }

  function openEditModal(character: Character) {
    setCharacterModal({
      isOpen: true,
      mode: "edit",
      character,
    });
  }

  function closeCharacterModal() {
    setCharacterModal({
      isOpen: false,
      mode: "add",
      character: null,
    });
  }

  function handleSaveCharacter(name: string) {
    if (
      characterModal.mode === "edit" &&
      characterModal.character
    ) {
      updateCharacter(
        characterModal.character.id,
        name
      );
    } else {
      addCharacter(name);
    }

    closeCharacterModal();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Characters
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all your berry farming characters.
          </p>
        </div>

        <Button onClick={openAddModal}>
          + Add Character
        </Button>
      </div>

      {characters.length === 0 ? (
        <div className="rounded-xl border border-dashed border-emerald-700 bg-slate-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-emerald-400">
            🌿 Welcome to BerryMaster!
          </h2>

          <p className="mt-3 text-slate-400">
            You haven't added any farmers yet.
          </p>

          <p className="mt-2 text-slate-500">
            Start by adding your first character
            and begin tracking your berry farming
            journey.
          </p>

          <div className="mt-6">
            <Button onClick={openAddModal}>
              + Add Your First Character
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {characters.map((character, index) => (
            <CharacterCard
              key={character.id}
              character={character}
              index={index}
              onPlant={() => setPlantCharacter(character)}
              onEdit={() => openEditModal(character)}
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
      )}

      <CharacterModal
        isOpen={characterModal.isOpen}
        onClose={closeCharacterModal}
        onSave={handleSaveCharacter}
        title={
          characterModal.mode === "add"
            ? "Add Character"
            : "Edit Character"
        }
        saveButtonText={
          characterModal.mode === "add"
            ? "Save"
            : "Update"
        }
        initialName={
          characterModal.character?.name ?? ""
        }
      />

      <PlantBerryModal
        isOpen={plantCharacter !== null}
        characterId={plantCharacter?.id ?? ""}
        characterName={plantCharacter?.name ?? ""}
        onClose={() => setPlantCharacter(null)}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete Character"
        message="Are you sure you want to delete this character?"
        itemName={`Character #${String(
          (selectedCharacter?.index ?? 0) + 1
        ).padStart(3, "0")} • ${
          selectedCharacter?.name ?? ""
        }`}
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => {
          setSelectedCharacter(null);
          setIsDeleteOpen(false);
        }}
        onConfirm={() => {
          if (!selectedCharacter) return;

          deleteCharacter(selectedCharacter.id);

          setSelectedCharacter(null);
          setIsDeleteOpen(false);
        }}
      />
    </div>
  );
}