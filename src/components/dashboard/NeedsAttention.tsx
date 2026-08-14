import { useNavigate } from "react-router-dom";
import { Droplets, Wheat, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";

import { useCharacters } from "../../context/CharacterContext";
import { getCharacterStatus } from "../../utils/characterStatus";

export default function NeedsAttention() {
  const navigate = useNavigate();
  const { characters } = useCharacters();

  const charactersNeedingWater = characters.filter(
    (character) => getCharacterStatus(character).status === "needWater"
  );

  const charactersReadyToHarvest = characters.filter(
    (character) => getCharacterStatus(character).status === "harvestReady"
  );

  const wiltedCharacters = characters.filter(
    (character) => getCharacterStatus(character).status === "wilted"
  );

  function goToCharacter(characterId: string) {
    navigate("/characters", {
      state: {
        highlightCharacterId: characterId,
      },
    });
  }

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
          backdrop-blur-md
        "
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mb-3 border border-emerald-500/30">
          <Sparkles className="h-6 w-6" />
        </div>

        <h3 className="text-base font-bold text-emerald-400">
          Everything is looking great!
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          No characters currently require immediate attention.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Need Water Items */}
      {charactersNeedingWater.map((character) => (
        <button
          key={character.id}
          onClick={() => goToCharacter(character.id)}
          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-sky-500/20
            bg-slate-950/60
            p-4
            text-left
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-sky-400/50
            hover:bg-sky-500/10
            hover:shadow-lg
            hover:shadow-sky-500/10
          "
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/15 text-sky-400">
              <Droplets className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                {character.name}
              </p>
              <p className="text-xs text-slate-400">
                Plot requires watering to keep growing safely.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-400 transition-all group-hover:bg-sky-500 group-hover:text-slate-950">
            <span>Water Now</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      ))}

      {/* Harvest Ready Items */}
      {charactersReadyToHarvest.map((character) => (
        <button
          key={character.id}
          onClick={() => goToCharacter(character.id)}
          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-amber-500/20
            bg-slate-950/60
            p-4
            text-left
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-amber-400/50
            hover:bg-amber-500/10
            hover:shadow-lg
            hover:shadow-amber-500/10
          "
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 text-amber-400">
              <Wheat className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                {character.name}
              </p>
              <p className="text-xs text-slate-400">
                Berries are fully grown and ready for harvest.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400 transition-all group-hover:bg-amber-500 group-hover:text-slate-950">
            <span>Harvest</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      ))}

      {/* Wilted Items */}
      {wiltedCharacters.map((character) => (
        <button
          key={character.id}
          onClick={() => goToCharacter(character.id)}
          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-red-500/20
            bg-slate-950/60
            p-4
            text-left
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-red-400/50
            hover:bg-red-500/10
            hover:shadow-lg
            hover:shadow-red-500/10
          "
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/15 text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                {character.name}
              </p>
              <p className="text-xs text-slate-400">
                Berry plot has wilted and needs clearing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all group-hover:bg-red-500 group-hover:text-white">
            <span>View Plot</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      ))}
    </div>
  );
}