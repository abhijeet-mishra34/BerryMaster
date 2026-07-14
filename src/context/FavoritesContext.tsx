import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { STORAGE_KEYS } from "../constants/storageKeys";

type FavoritesContextType = {
  favoriteBerryIds: string[];

  addFavorite: (
    berryId: string
  ) => void;

  removeFavorite: (
    berryId: string
  ) => void;

  toggleFavorite: (
    berryId: string
  ) => void;

  isFavorite: (
    berryId: string
  ) => boolean;
};

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    favoriteBerryIds,
    setFavoriteBerryIds,
  ] = useState<string[]>(() => {
    const saved = localStorage.getItem(
      STORAGE_KEYS.FAVORITE_BERRIES
    );

    return saved
      ? JSON.parse(saved)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.FAVORITE_BERRIES,
      JSON.stringify(
        favoriteBerryIds
      )
    );
  }, [favoriteBerryIds]);

  function isFavorite(
    berryId: string
  ) {
    return favoriteBerryIds.includes(
      berryId
    );
  }

  function addFavorite(
    berryId: string
  ) {
    setFavoriteBerryIds(
      (current) => {
        if (
          current.includes(berryId)
        ) {
          return current;
        }

        return [
          ...current,
          berryId,
        ];
      }
    );
  }

  function removeFavorite(
    berryId: string
  ) {
    setFavoriteBerryIds(
      (current) =>
        current.filter(
          (id) => id !== berryId
        )
    );
  }

  function toggleFavorite(
    berryId: string
  ) {
    if (isFavorite(berryId)) {
      removeFavorite(berryId);
    } else {
      addFavorite(berryId);
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteBerryIds,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context =
    useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}