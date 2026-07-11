import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { Character } from "../types/Character";
import type { Berry } from "../types/Berry";

import { STORAGE_KEYS } from "../constants/storageKeys";
import { calculatePlantTimers } from "../utils/timeCalculator";

type CharacterContextType = {
  characters: Character[];

  addCharacter: (name: string) => void;

  updateCharacter: (
    id: string,
    name: string
  ) => void;

  deleteCharacter: (id: string) => void;

  plantBerry: (
    characterId: string,
    berry: Berry
  ) => void;
};

const CharacterContext = createContext<
  CharacterContextType | undefined
>(undefined);

export function CharacterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem(
      STORAGE_KEYS.CHARACTERS
    );

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.CHARACTERS,
      JSON.stringify(characters)
    );
  }, [characters]);

  function addCharacter(name: string) {
    const trimmedName = name.trim();

    const alreadyExists = characters.some(
      (character) =>
        character.name.toLowerCase() ===
        trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      alert("A character with this name already exists.");
      return;
    }

    const newCharacter: Character = {
      id: crypto.randomUUID(),
      name: trimmedName,
    };

    setCharacters((current) => [
      ...current,
      newCharacter,
    ]);
  }

  function updateCharacter(
    id: string,
    name: string
  ) {
    const trimmedName = name.trim();

    const alreadyExists = characters.some(
      (character) =>
        character.id !== id &&
        character.name.toLowerCase() ===
          trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      alert("A character with this name already exists.");
      return;
    }

    setCharacters((current) =>
      current.map((character) =>
        character.id === id
          ? {
              ...character,
              name: trimmedName,
            }
          : character
      )
    );
  }

  function deleteCharacter(id: string) {
    setCharacters((current) =>
      current.filter(
        (character) => character.id !== id
      )
    );
  }

  function plantBerry(
    characterId: string,
    berry: Berry
  ) {
    const timers = calculatePlantTimers(berry);

    setCharacters((current) =>
      current.map((character) =>
        character.id === characterId
          ? {
              ...character,
              plantedBerryId: berry.id,
              plantedAt: timers.plantedAt,
              nextWaterAt: timers.nextWaterAt,
              harvestAt: timers.harvestAt,
            }
          : character
      )
    );
  }

 return (
  <CharacterContext.Provider
    value={{
      characters,
      addCharacter,
      updateCharacter,
      deleteCharacter,
      plantBerry,
    }}
  >
    {children}
  </CharacterContext.Provider>
);
}

export function useCharacters() {
  const context = useContext(CharacterContext);

  if (!context) {
    throw new Error(
      "useCharacters must be used inside CharacterProvider"
    );
  }

  return context;
}