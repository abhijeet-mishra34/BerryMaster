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

  deleteCharacter: (id: string) => void;

  isAddCharacterOpen: boolean;

  openAddCharacterModal: () => void;

  closeAddCharacterModal: () => void;
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

  const [isAddCharacterOpen, setIsAddCharacterOpen] =
    useState(false);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(characters)
    );
  }, [characters]);

  function addCharacter(name: string) {
    const alreadyExists = characters.some(
      (character) =>
        character.name.toLowerCase() ===
        name.toLowerCase()
    );

    if (alreadyExists) {
      alert("Character already exists.");
      return;
    }

    const newCharacter: Character = {
      id: crypto.randomUUID(),
      name,
    };

    setCharacters((current) => [
      ...current,
      newCharacter,
    ]);

    closeAddCharacterModal();
  }

  function deleteCharacter(id: string) {
    setCharacters((current) =>
      current.filter(
        (character) => character.id !== id
      )
    );
  }

  function openAddCharacterModal() {
    setIsAddCharacterOpen(true);
  }

  function closeAddCharacterModal() {
    setIsAddCharacterOpen(false);
  }

  return (
    <CharacterContext.Provider
      value={{
        characters,
        addCharacter,
        deleteCharacter,

        isAddCharacterOpen,
        openAddCharacterModal,
        closeAddCharacterModal,
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