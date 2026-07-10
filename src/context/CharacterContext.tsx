import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { Character } from "../types/Character";

const STORAGE_KEY = "berrymaster.characters";

type CharacterContextType = {
  characters: Character[];

  addCharacter: (name: string) => void;

  updateCharacter: (
    id: string,
    name: string
  ) => void;

  deleteCharacter: (id: string) => void;
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
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
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

  return (
    <CharacterContext.Provider
      value={{
        characters,
        addCharacter,
        updateCharacter,
        deleteCharacter,
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