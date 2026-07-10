import { useState } from "react";

import CharacterCard from "../components/characters/CharacterCard";
import AddCharacterModal from "../components/characters/AddCharacterModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Button from "../components/ui/Button";

import { useCharacters } from "../context/CharacterContext";

export default function CharactersPage() {
  const {
    characters,
    addCharacter,
    deleteCharacter,
    isAddCharacterOpen,
    openAddCharacterModal,
    closeAddCharacterModal,
  } = useCharacters();

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const [selectedCharacter, setSelectedCharacter] =
    useState<{
      id: string;
      name: string;
      index: number;
    } | null>(null);

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

        <Button onClick={openAddCharacterModal}>
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
            Start by adding your first character and begin tracking your berry farming journey.
          </p>

          <div className="mt-6">
            <Button onClick={openAddCharacterModal}>
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

      <AddCharacterModal
        isOpen={isAddCharacterOpen}
        onClose={closeAddCharacterModal}
        onSave={addCharacter}
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