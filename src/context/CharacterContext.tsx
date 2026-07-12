import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { Character } from "../types/Character";
import type { Berry } from "../types/Berry";

import { STORAGE_KEYS } from "../constants/storageKeys";

import { berryDatabase } from "../data/berryDatabase";

import { plantBerryOnCharacter } from "../services/plantingService";
import { waterBerryOnCharacter } from "../services/wateringService";
import { harvestBerryOnCharacter } from "../services/harvestService";

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

  waterBerry: (
    characterId: string
  ) => void;

 harvestBerry: (
  characterId: string
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

  /**
   * Checks whether a character name already exists.
   */
  function characterNameExists(
    name: string,
    excludeId?: string
  ) {
    return characters.some(
      (character) =>
        character.id !== excludeId &&
        character.name.toLowerCase() ===
          name.toLowerCase()
    );
  }

  /**
   * Adds a new character.
   */
  function addCharacter(name: string) {
    const trimmedName = name.trim();

    if (characterNameExists(trimmedName)) {
      alert(
        "A character with this name already exists."
      );
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

  /**
   * Updates an existing character.
   */
  function updateCharacter(
    id: string,
    name: string
  ) {
    const trimmedName = name.trim();

    if (characterNameExists(trimmedName, id)) {
      alert(
        "A character with this name already exists."
      );
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

  /**
   * Deletes a character.
   */
  function deleteCharacter(id: string) {
    setCharacters((current) =>
      current.filter(
        (character) => character.id !== id
      )
    );
  }

  /**
   * Plants a berry on the selected character.
   */
  function plantBerry(
    characterId: string,
    berry: Berry
  ) {
    setCharacters((current) =>
      current.map((character) =>
        character.id === characterId
          ? plantBerryOnCharacter(
              character,
              berry
            )
          : character
      )
    );
  }

  /**
   * Waters the currently planted berry.
   */
  function waterBerry(characterId: string) {
    setCharacters((current) =>
      current.map((character) => {
        if (
          character.id !== characterId ||
          !character.plantedBerryId
        ) {
          return character;
        }

        const berry = berryDatabase.find(
          (b) =>
            b.id ===
            character.plantedBerryId
        );

        if (!berry) {
          return character;
        }

        return waterBerryOnCharacter(
          character,
          berry
        );
      })
    );
  }

  /**
   * Harvests the planted berry.
   */
  function harvestBerry(characterId: string) {
  setCharacters((current) =>
    current.map((character) =>
      character.id === characterId
        ? harvestBerryOnCharacter(character)
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
        waterBerry,
        harvestBerry,
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