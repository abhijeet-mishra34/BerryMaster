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

import { useActivities } from "./ActivityContext";
import { useToast } from "./ToastContext";

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

  removeBerry: (
    characterId: string
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
  const [characters, setCharacters] =
    useState<Character[]>(() => {
      const saved = localStorage.getItem(
        STORAGE_KEYS.CHARACTERS
      );

      return saved ? JSON.parse(saved) : [];
    });

  const { addActivity } = useActivities();
  const { addToast } = useToast();

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
      addToast(
        "A character with this name already exists.",
        "error"
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

    addToast(`Character "${trimmedName}" created!`, "success");
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
      addToast(
        "A character with this name already exists.",
        "error"
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

    addToast(`Character renamed to "${trimmedName}"`, "success");
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
    const character = characters.find(
      (character) =>
        character.id === characterId
    );

    if (!character) {
      return;
    }

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

    addActivity(
      "planted",
      `Planted ${berry.name} on ${character.name}`
    );
  }

  /**
   * Removes the currently planted berry
   * and resets the character's farming state.
   */
  function removeBerry(
    characterId: string
  ) {
    const character = characters.find(
      (character) =>
        character.id === characterId
    );

    if (
      !character ||
      !character.plantedBerryId
    ) {
      return;
    }

    const berry = berryDatabase.find(
      (b) =>
        b.id === character.plantedBerryId
    );

    if (!berry) {
      return;
    }

    setCharacters((current) =>
      current.map((character) =>
        character.id === characterId
          ? {
              ...character,

              plantedBerryId:
                undefined,

              plantedAt:
                undefined,

              nextWaterAt:
                undefined,

              harvestAt:
                undefined,

              wiltAt:
                undefined,
            }
          : character
      )
    );

    addActivity(
      "removed",
      `Removed ${berry.name} from ${character.name}`
    );
  }

  /**
   * Waters the currently planted berry.
   */
  function waterBerry(
    characterId: string
  ) {
    const character = characters.find(
      (character) =>
        character.id === characterId
    );

    if (
      !character ||
      !character.plantedBerryId
    ) {
      return;
    }

    const berry = berryDatabase.find(
      (b) =>
        b.id === character.plantedBerryId
    );

    if (!berry) {
      return;
    }

    setCharacters((current) =>
      current.map((character) => {
        if (
          character.id !== characterId
        ) {
          return character;
        }

        return waterBerryOnCharacter(
          character,
          berry
        );
      })
    );

    addActivity(
      "watered",
      `Watered ${character.name}'s ${berry.name}`
    );
  }

  /**
   * Harvests a ready berry or removes a wilted berry.
   */
  function harvestBerry(
    characterId: string
  ) {
    const character = characters.find(
      (character) =>
        character.id === characterId
    );

    if (
      !character ||
      !character.plantedBerryId
    ) {
      return;
    }

    const berry = berryDatabase.find(
      (b) =>
        b.id === character.plantedBerryId
    );

    if (!berry) {
      return;
    }

    const now = Date.now();

    const isWilted =
      character.wiltAt &&
      now >=
        new Date(
          character.wiltAt
        ).getTime();

    setCharacters((current) =>
      current.map((character) =>
        character.id === characterId
          ? harvestBerryOnCharacter(
              character
            )
          : character
      )
    );

    if (isWilted) {
      addActivity(
        "wilted",
        `Removed wilted ${berry.name} from ${character.name}`
      );
    } else {
      addActivity(
        "harvested",
        `Harvested ${berry.name} from ${character.name}`
      );
    }
  }

  return (
    <CharacterContext.Provider
      value={{
        characters,
        addCharacter,
        updateCharacter,
        deleteCharacter,
        plantBerry,
        removeBerry,
        waterBerry,
        harvestBerry,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacters() {
  const context = useContext(
    CharacterContext
  );

  if (!context) {
    throw new Error(
      "useCharacters must be used inside CharacterProvider"
    );
  }

  return context;
}