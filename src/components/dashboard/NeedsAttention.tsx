import { useNavigate } from "react-router-dom";


import { useCharacters } from "../../context/CharacterContext";

import { getCharacterStatus } from "../../utils/characterStatus";

export default function NeedsAttention()  {
  const navigate = useNavigate();

  const { characters } = useCharacters();

  // =====================================
  // Characters That Need Water
  // =====================================

  const charactersNeedingWater = characters.filter(
    (character) =>
      getCharacterStatus(character).status ===
      "needWater"
  );

  // =====================================
  // Characters Ready to Harvest
  // =====================================

  const charactersReadyToHarvest = characters.filter(
    (character) =>
      getCharacterStatus(character).status ===
      "harvestReady"
  );

  // =====================================
  // Wilted Characters
  // =====================================

  const wiltedCharacters = characters.filter(
    (character) =>
      getCharacterStatus(character).status ===
      "wilted"
  );

  // =====================================
  // Navigate to Character
  // =====================================

  function goToCharacter(characterId: string) {
    navigate("/characters", {
      state: {
        highlightCharacterId: characterId,
      },
    });
  }

  // =====================================
  // No Attention Needed
  // =====================================

  if (
    charactersNeedingWater.length === 0 &&
    charactersReadyToHarvest.length === 0 &&
    wiltedCharacters.length === 0
  ) {
    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-emerald-500/20
          bg-emerald-500/5
          px-6
          py-10
          text-center
        "
      >
        <div className="text-5xl">
          🎉
        </div>

        <h3 className="mt-4 text-lg font-semibold text-emerald-400">
          Everything is looking great!
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          No characters currently need your attention.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* =====================================
          Need Water
      ===================================== */}

      {charactersNeedingWater.map((character) => (
        <button
          key={character.id}
          onClick={() =>
            goToCharacter(character.id)
          }
          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-sky-500/20
            bg-sky-500/5
            px-5
            py-4
            text-left
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-sky-400/50
            hover:bg-sky-500/10
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-sky-500/10
                text-2xl
              "
            >
              💧
            </div>

            <div>
              <p className="font-semibold text-white">
                {character.name}
              </p>

              <p className="text-sm text-slate-400">
                This character needs watering.
              </p>
            </div>

          </div>

          <span
            className="
              text-sm
              font-semibold
              text-sky-400
              transition-transform
              group-hover:translate-x-1
            "
          >
            View →
          </span>
        </button>
      ))}


      {/* =====================================
          Harvest Ready
      ===================================== */}

      {charactersReadyToHarvest.map((character) => (
        <button
          key={character.id}
          onClick={() =>
            goToCharacter(character.id)
          }
          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-amber-500/20
            bg-amber-500/5
            px-5
            py-4
            text-left
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-amber-400/50
            hover:bg-amber-500/10
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-amber-500/10
                text-2xl
              "
            >
              🌾
            </div>

            <div>
              <p className="font-semibold text-white">
                {character.name}
              </p>

              <p className="text-sm text-slate-400">
                Berry is ready to harvest.
              </p>
            </div>

          </div>

          <span
            className="
              text-sm
              font-semibold
              text-amber-400
              transition-transform
              group-hover:translate-x-1
            "
          >
            View →
          </span>
        </button>
      ))}


      {/* =====================================
          Wilted
      ===================================== */}

      {wiltedCharacters.map((character) => (
        <button
          key={character.id}
          onClick={() =>
            goToCharacter(character.id)
          }
          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/5
            px-5
            py-4
            text-left
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-red-400/50
            hover:bg-red-500/10
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-red-500/10
                text-2xl
              "
            >
              🍂
            </div>

            <div>
              <p className="font-semibold text-white">
                {character.name}
              </p>

              <p className="text-sm text-slate-400">
                This character has a wilted berry.
              </p>
            </div>

          </div>

          <span
            className="
              text-sm
              font-semibold
              text-red-400
              transition-transform
              group-hover:translate-x-1
            "
          >
            View →
          </span>
        </button>
      ))}

    </div>
  );
}