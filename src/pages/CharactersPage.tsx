import Button from "../components/ui/Button";
import AddCharacterModal from "../components/characters/AddCharacterModal";

import { useCharacters } from "../context/CharacterContext";
import CharacterCard from "../components/characters/CharacterCard";

export default function CharactersPage() {
  const {
  characters,
  addCharacter,
  isAddCharacterOpen,
  openAddCharacterModal,
  closeAddCharacterModal,
} = useCharacters();
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
        </div>
      ) : (
        <div className="space-y-4">
          {characters.map((character, index) => (
  <CharacterCard
    key={character.id}
    character={character}
    index={index}
  />
))}
        </div>
      )}

      <AddCharacterModal
        isOpen={isAddCharacterOpen}
        onClose={closeAddCharacterModal}
        onSave={addCharacter}
      />
    </div>
  );
}