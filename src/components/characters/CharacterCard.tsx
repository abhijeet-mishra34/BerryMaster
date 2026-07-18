
import { forwardRef } from "react";

import Button from "../ui/Button";

import type { Character } from "../../types/Character";

import { berryDatabase } from "../../data/berryDatabase";

import { getCharacterStatus } from "../../utils/characterStatus";
import { formatDate } from "../../utils/date";
import { formatRemainingTime } from "../../utils/countdown";

import { useNow } from "../../hooks/useNow";

type CharacterCardProps = {
  character: Character;
  index: number;

  highlight?: "plant" | null;

  onPlant: () => void;
  onWater: () => void;
  onHarvest: () => void;
  onChangeBerry: () => void;

  onEdit: () => void;
  onDelete: (id: string) => void;
};

const timerStyles = {
  watering: {
    wrapper:
      "border-emerald-500/20 bg-emerald-500/[0.04]",
    label: "text-emerald-300",
    value: "text-emerald-400",
  },
  harvest: {
    wrapper:
      "border-amber-500/20 bg-amber-500/[0.04]",
    label: "text-amber-300",
    value: "text-amber-400",
  },
  wilt: {
    wrapper:
      "border-red-500/20 bg-red-500/[0.04]",
    label: "text-red-300",
    value: "text-red-400",
  },
};

const labelClass =
  "text-xs font-semibold uppercase tracking-[0.16em] text-slate-500";

const timestampLabelClass =
  "text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500";

const timestampValueClass =
  "mt-1 text-xs font-medium text-slate-200";

const timerWrapperClass =
  "rounded-xl border p-4 backdrop-blur-md transition-all duration-200 hover:bg-white/[0.06]";

const TimerTimestamp = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="min-w-[150px] rounded-lg border border-white/[0.06] bg-slate-950/50 px-3 py-2.5 text-right">
      <p className={timestampLabelClass}>
        {label}
      </p>

      <p className={timestampValueClass}>
        {value}
      </p>
    </div>
  );
};

const CharacterCard = forwardRef<
  HTMLDivElement,
  CharacterCardProps
>(function CharacterCard(
  {
    character,
    index,
    highlight,

    onPlant,
    onWater,
    onHarvest,
    onChangeBerry,

    onEdit,
    onDelete,
  },
  ref
) {
  const now = useNow();

  const berry = berryDatabase.find(
    (b) => b.id === character.plantedBerryId
  );

  const status = getCharacterStatus(character);

  const characterNumber = String(
    index + 1
  ).padStart(3, "0");

  return (
    <div
      ref={ref}
      className={`

        rounded-2xl
        border
        bg-slate-900/70
        p-6
        shadow-xl
        shadow-black/10
        backdrop-blur-xl

        transition-all
        duration-500

        ${
          highlight === "plant"
            ? `
              scale-[1.02]
              border-emerald-400/70
              shadow-2xl
              shadow-emerald-400/30
              ring-2
              ring-emerald-500/20
            `
            : `
              border-white/[0.08]
              hover:border-emerald-500/50
              hover:bg-slate-900/80
              hover:shadow-2xl
              hover:shadow-emerald-500/10
            `
        }

      `}
    >

      {/* =====================================
          Character Header
      ===================================== */}

      <div className="border-b border-white/[0.08] pb-5">

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Character
            </p>

            <h2 className="mt-1 text-2xl font-bold text-emerald-400">
              🌿 Character #{characterNumber}
            </h2>

          </div>

          <div className="rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-2 text-right backdrop-blur-md">

            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              ID
            </p>

            <p className="mt-1 font-mono text-sm font-semibold text-slate-300">
              #{characterNumber}
            </p>

          </div>

        </div>

        <div className="mt-5">

          <p className={labelClass}>
            Name
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {character.name}
          </p>

        </div>

      </div>


      {/* =====================================
          Farming Overview
      ===================================== */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">

          <p className={labelClass}>
            🍓 Current Berry
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            {berry?.name ?? "No berry planted"}
          </p>

        </div>

        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">

          <p className={labelClass}>
            🌱 Current Status
          </p>

          <span
            className={`

              mt-2
              inline-flex
              items-center
              rounded-full
              px-3
              py-1.5
              text-sm
              font-semibold

              ${status.className}

            `}
          >
            {status.icon} {status.label}
          </span>

        </div>

      </div>


      {/* =====================================
          Farming Timers
      ===================================== */}

      <div className="mt-7 border-t border-white/[0.08] pt-6">

        <div className="mb-4 flex items-center justify-between">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Farming Timers
          </p>

          <span className="text-xs text-slate-600">
            Live
          </span>

        </div>


        <div className="space-y-4">


          {/* Watering */}

          <div
            className={`
              ${timerWrapperClass}
              ${timerStyles.watering.wrapper}
            `}
          >

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p
                  className={`
                    ${labelClass}
                    ${timerStyles.watering.label}
                  `}
                >
                  💧 Watering
                </p>

                {character.nextWaterAt ? (

                  <p
                    className={`
                      mt-2
                      text-lg
                      font-bold
                      ${timerStyles.watering.value}
                    `}
                  >
                    ⏳{" "}
                    {formatRemainingTime(
                      character.nextWaterAt,
                      now
                    )}
                  </p>

                ) : (

                  <p className="mt-2 text-lg font-bold text-emerald-400">
                    ✅ Complete
                  </p>

                )}

              </div>

              {character.nextWaterAt && (

                <TimerTimestamp
                  label="Scheduled"
                  value={formatDate(
                    character.nextWaterAt
                  )}
                />

              )}

            </div>

            {!character.nextWaterAt && (

              <p className="mt-2 text-xs text-slate-500">
                No more watering required.
              </p>

            )}

          </div>


          {/* Harvest */}

          <div
            className={`
              ${timerWrapperClass}
              ${timerStyles.harvest.wrapper}
            `}
          >

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p
                  className={`
                    ${labelClass}
                    ${timerStyles.harvest.label}
                  `}
                >
                  🌾 Harvest
                </p>

                {character.plantedBerryId ? (

                  <p
                    className={`
                      mt-2
                      text-lg
                      font-bold
                      ${timerStyles.harvest.value}
                    `}
                  >
                    ⏰{" "}

                    {
                      status.status === "wilted"
                        ? "Missed"
                        : formatRemainingTime(
                            character.harvestAt,
                            now
                          )
                    }

                  </p>

                ) : (

                  <p className="mt-2 text-lg font-bold text-slate-500">
                    —
                  </p>

                )}

              </div>

              {character.plantedBerryId && (

                <TimerTimestamp
                  label="Harvest At"
                  value={formatDate(
                    character.harvestAt
                  )}
                />

              )}

            </div>

          </div>


          {/* Wilt */}

          <div
            className={`
              ${timerWrapperClass}
              ${timerStyles.wilt.wrapper}
            `}
          >

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p
                  className={`
                    ${labelClass}
                    ${timerStyles.wilt.label}
                  `}
                >
                  🍂 Wilt Timer
                </p>

                {character.plantedBerryId ? (

                  <p
                    className={`
                      mt-2
                      text-lg
                      font-bold
                      ${timerStyles.wilt.value}
                    `}
                  >
                    ⏰{" "}

                    {
                      status.status === "wilted"
                        ? "Wilted"
                        : formatRemainingTime(
                            character.wiltAt,
                            now
                          )
                    }

                  </p>

                ) : (

                  <p className="mt-2 text-lg font-bold text-slate-500">
                    —
                  </p>

                )}

              </div>

              {character.plantedBerryId && (

                <TimerTimestamp
                  label="Wilts At"
                  value={formatDate(
                    character.wiltAt
                  )}
                />

              )}

            </div>

          </div>


        </div>

      </div>


      {/* =====================================
          Actions
      ===================================== */}

      <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-white/[0.08] pt-6">

        {!character.plantedBerryId ? (

          <Button onClick={onPlant}>
            🌱 Plant Berry
          </Button>

        ) : status.status === "wilted" ? (

          <Button
            variant="danger"
            onClick={onHarvest}
          >
            🗑 Clear Wilted Berry
          </Button>

        ) : status.status === "harvestReady" ? (

          <Button onClick={onHarvest}>
            🌾 Harvest
          </Button>

        ) : (

          <Button
            variant="info"
            onClick={onWater}
          >
            💧 Water
          </Button>

        )}


        {character.plantedBerryId &&
          (
            status.status === "growing" ||
            status.status === "needWater"
          ) && (

            <Button
              variant="secondary"
              onClick={onChangeBerry}
            >
              🔄 Change Berry
            </Button>

          )}


        <Button
          variant="info"
          onClick={onEdit}
        >
          ✏ Edit
        </Button>


        <Button
          variant="danger"
          onClick={() =>
            onDelete(character.id)
          }
        >
          🗑 Delete
        </Button>

      </div>

    </div>
  );
});

export default CharacterCard;
