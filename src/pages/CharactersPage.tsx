import { useEffect, useState } from "react";

import Button from "../components/ui/Button";
import AddCharacterModal from "../components/characters/AddCharacterModal";

import type { Character } from "../types/Character";

const STORAGE_KEY = "berrymaster.characters";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load characters:", error);
      return [];
    }
  });

  const [isAddCharacterOpen, setIsAddCharacterOpen] = useState(false);

  useEffect(() => {
    console.log("Saving characters:", characters);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(characters)
      );
    } catch (error) {
      console.error("Failed to save characters:", error);
    }
  }, [characters]);

  function handleAddCharacter(name: string) {
    console.log("Adding character:", name);

    const alreadyExists = characters.some(
      (character) =>
        character.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      alert("A character with this name already exists.");
      return;
    }

    const newCharacter: Character = {
      id: crypto.randomUUID(),
      name,
    };

    setCharacters((current) => [...current, newCharacter]);
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

        <Button onClick={() => setIsAddCharacterOpen(true)}>
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
            <div
              key={character.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-xl font-bold text-emerald-400">
                🌿 Farmer #{index + 1}
              </h2>

              <p className="mt-2 text-lg font-semibold">
                {character.name}
              </p>

              <p className="mt-2 text-slate-400">
                Status: Ready to Plant
              </p>
            </div>
          ))}
        </div>
      )}

      <AddCharacterModal
        isOpen={isAddCharacterOpen}
        onClose={() => setIsAddCharacterOpen(false)}
        onSave={handleAddCharacter}
      />
    </div>
  );
}