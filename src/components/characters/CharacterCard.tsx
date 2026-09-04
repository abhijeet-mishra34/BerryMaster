import { forwardRef, useState, useEffect, useRef } from "react";
import {
  User,
  Sprout,
  Droplets,
  Wheat,
  AlertTriangle,
  Clock,
  Pencil,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Info,
} from "lucide-react";

import Button from "../ui/Button";
import type { Character } from "../../types/Character";
import { berryDatabase } from "../../data/berryDatabase";
import { farmingProfiles } from "../../data/farmingProfiles";
import { getCharacterStatus } from "../../utils/characterStatus";
import { formatDate } from "../../utils/date";
import { formatRemainingTime } from "../../utils/countdown";
import { useNow } from "../../hooks/useNow";

type CharacterCardProps = {
  character: Character;
  index: number;
  highlight?: "plant" | null;
  focused?: boolean;
  onPlant: () => void;
  onWater: () => void;
  onHarvest: () => void;
  onChangeBerry: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
};

const timerStyles = {
  watering: {
    wrapper: "border-sky-500/20 light:border-sky-200 bg-sky-500/[0.06] light:bg-sky-50/70",
    accent: "bg-sky-500",
    label: "text-sky-400 light:text-sky-600",
    value: "text-sky-300 light:text-sky-900",
    icon: Droplets,
  },
  harvest: {
    wrapper: "border-amber-500/20 light:border-amber-200 bg-amber-500/[0.06] light:bg-amber-50/70",
    accent: "bg-amber-500",
    label: "text-amber-400 light:text-amber-600",
    value: "text-amber-300 light:text-amber-900",
    icon: Wheat,
  },
  wilt: {
    wrapper: "border-red-500/20 light:border-red-200 bg-red-500/[0.06] light:bg-red-50/70",
    accent: "bg-red-500",
    label: "text-red-400 light:text-red-600",
    value: "text-red-300 light:text-red-900",
    icon: AlertTriangle,
  },
};

const labelClass = "text-[11px] font-bold uppercase tracking-wider text-slate-400 light:text-slate-500";
const timestampLabelClass = "text-[10px] font-semibold uppercase tracking-wider text-slate-400 light:text-slate-500";
const timestampValueClass = "mt-0.5 text-xs font-bold text-slate-200 light:text-slate-800";

const TimerTimestamp = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="min-w-[130px] rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/60 light:bg-white px-4 py-2.5 text-right shadow-xs">
      <p className={timestampLabelClass}>{label}</p>
      <p className={timestampValueClass}>{value}</p>
    </div>
  );
};

// Session-level set of berry profile growth times shown during this app session (resets when app is restarted)
const shownAutoWaterProfilesThisSession = new Set<number>();

const CharacterCard = forwardRef<HTMLDivElement, CharacterCardProps>(function CharacterCard(
  {
    character,
    index,
    highlight,
    focused,
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

  const berry = berryDatabase.find((b) => b.id === character.plantedBerryId);
  const status = getCharacterStatus(character);
  const characterNumber = String(index + 1).padStart(3, "0");

  // Profile lookup
  const profile = berry
    ? farmingProfiles.find((p) => Math.abs(p.growthTime - berry.growthTime) < 0.001)
    : null;

  const isAutoWaterBerry = Boolean(
    profile?.autoWaterOnPlant && (character.wateringCount ?? 0) === 1 && character.nextWaterAt
  );

  // State for the popup banner
  const [showAutoWaterBanner, setShowAutoWaterBanner] = useState(false);
  const [isManualInfoOpen, setIsManualInfoOpen] = useState(false);
  const lastPlantedAtRef = useRef<string | undefined>(character.plantedAt);

  useEffect(() => {
    if (isAutoWaterBerry && profile) {
      // Check if this card just had a fresh plant or this profile hasn't popped up this session
      const isFreshPlant = character.plantedAt && character.plantedAt !== lastPlantedAtRef.current;
      lastPlantedAtRef.current = character.plantedAt;

      if (!shownAutoWaterProfilesThisSession.has(profile.growthTime) || isFreshPlant) {
        shownAutoWaterProfilesThisSession.add(profile.growthTime);
        setShowAutoWaterBanner(true);
        const timer = setTimeout(() => {
          setShowAutoWaterBanner(false);
        }, 6000); // Pops up and pops back down after 6s
        return () => clearTimeout(timer);
      }
    }
  }, [character.plantedAt, isAutoWaterBerry, profile]);

  return (
    <div
      ref={ref}
      className={`
        theme-card
        card-shine
        relative
        overflow-hidden
        rounded-xl
        p-4
        sm:p-6
        md:p-8
        backdrop-blur-2xl
        transition-all
        duration-300
        ${
          highlight === "plant"
            ? "scale-[1.01] border-emerald-400/80 shadow-2xl shadow-emerald-500/20 ring-2 ring-emerald-500/20"
            : focused
            ? "border-slate-400/40 ring-2 ring-white/10 shadow-2xl shadow-white/5"
            : "hover:border-emerald-400/40"
        }
      `}
    >
      {/* Header Accent Glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 opacity-70" />

      {/* Header */}
      <div className="pb-5 sm:pb-6">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="flex h-10 w-10 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 font-bold shadow-sm">
              <User className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-400 light:text-slate-500">
                Farmer Slot #{characterNumber}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white light:text-slate-900 truncate">
                {character.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Action Buttons (especially helpful on mobile to avoid scrolling ~800px) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 light:text-sky-600 hover:bg-sky-500/20 active:scale-95 transition-all cursor-pointer shadow-xs"
              aria-label={`Edit ${character.name}`}
              title="Edit Character"
            >
              <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(character.id);
              }}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 light:text-red-600 hover:bg-red-500/20 active:scale-95 transition-all cursor-pointer shadow-xs"
              aria-label={`Delete ${character.name}`}
              title="Delete Character"
            >
              <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>

            <div className="shrink-0 rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/60 light:bg-slate-50 px-2.5 py-1.5 sm:px-3 sm:py-2 text-right shadow-xs">
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
                Slot
              </span>
              <p className="font-mono text-[11px] sm:text-xs font-bold text-emerald-500">
                #{characterNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 light:via-slate-200 to-transparent" />

      {/* Farming Overview */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/40 light:bg-slate-50 p-5 shadow-xs">
          <p className={labelClass}>Planted Berry</p>
          <div className="mt-2 flex items-center gap-2">
            <Sprout className="h-4 w-4 text-emerald-500" />
            <p className="text-sm font-bold text-white light:text-slate-900">
              {berry?.name ?? "No berry planted"}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/40 light:bg-slate-50 p-5 shadow-xs">
          <p className={labelClass}>Current Status</p>
          <div className="mt-2">
            <span
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-full
                px-3
                py-1
                text-xs
                font-bold
                ${status.className}
              `}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {status.label}
            </span>
          </div>
        </div>
      </div>

      {/* Farming Timers */}
      <div className="mt-8">
        {/* Section Divider */}
        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 light:via-slate-200 to-transparent" />
        <div className="mb-4 flex items-center justify-between">
          <p className={labelClass}>Farming Timers</p>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Cycle
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Water Timer */}
          <div className={`relative overflow-hidden rounded-xl border p-4 sm:p-6 transition-all ${timerStyles.watering.wrapper}`}>
            {/* Left accent bar */}
            <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full ${timerStyles.watering.accent} opacity-70`} />
            <div className="flex flex-col gap-4 pl-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className={`flex items-center gap-1.5 ${labelClass} ${timerStyles.watering.label}`}>
                    <Droplets className="h-3.5 w-3.5" />
                    Watering Schedule
                    {character.plantedBerryId && profile && (
                      <span className="ml-1 text-[10px] font-semibold opacity-70">
                        ({character.wateringCount ?? 0}/{profile.totalWaterings} done)
                      </span>
                    )}
                  </p>

                  {/* Little (i) Info Button for auto-watered berries */}
                  {isAutoWaterBerry && (
                    <button
                      type="button"
                      onClick={() => setIsManualInfoOpen((prev) => !prev)}
                      className={`
                        inline-flex h-5 w-5 items-center justify-center rounded-full
                        border transition-all duration-200 cursor-pointer
                        ${
                          isManualInfoOpen || showAutoWaterBanner
                            ? "border-sky-400 bg-sky-500/20 text-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                            : "border-sky-500/30 bg-sky-500/10 text-sky-400/80 hover:border-sky-400 hover:text-sky-200"
                        }
                      `}
                      aria-label="Watering information"
                      title="Watering schedule details"
                    >
                      <Info className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* Pop-up and Pop-down Toast / Info Panel */}
                {isAutoWaterBerry && (showAutoWaterBanner || isManualInfoOpen) && (
                  <div
                    className="
                      mt-2.5 flex items-start gap-2 rounded-xl border border-sky-500/30
                      bg-sky-950/70 light:bg-sky-100/90 p-2.5 text-xs text-sky-200 light:text-sky-900
                      backdrop-blur-md shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-top-1
                    "
                  >
                    <Info className="h-4 w-4 shrink-0 text-sky-400 light:text-sky-600 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[11px] leading-tight text-white light:text-slate-900">
                        Auto-watered on planting
                      </p>
                      <p className="mt-0.5 text-[10px] text-sky-300/80 light:text-sky-700 leading-snug">
                        First watering was applied automatically. This timer is for the final scheduled watering.
                      </p>
                    </div>
                    {isManualInfoOpen && (
                      <button
                        type="button"
                        onClick={() => setIsManualInfoOpen(false)}
                        className="text-sky-400/70 hover:text-white p-0.5 text-[10px] font-bold"
                        aria-label="Dismiss info"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )}

                {!character.plantedBerryId ? (
                  <p className="mt-3 text-xs font-semibold text-slate-500">—</p>
                ) : character.nextWaterAt ? (
                  <p className={`mt-3 text-lg font-extrabold flex items-center gap-2 ${timerStyles.watering.value}`}>
                    <Clock className="h-4 w-4 opacity-70" />
                    {formatRemainingTime(character.nextWaterAt, now)}
                  </p>
                ) : (
                  <p className="mt-3 text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Watering Complete — All waterings done
                  </p>
                )}
              </div>
              {character.nextWaterAt && (
                <TimerTimestamp label="Scheduled" value={formatDate(character.nextWaterAt)} />
              )}
            </div>
          </div>

          {/* Harvest Timer */}
          <div className={`relative overflow-hidden rounded-xl border p-4 sm:p-6 transition-all ${timerStyles.harvest.wrapper}`}>
            {/* Left accent bar */}
            <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full ${timerStyles.harvest.accent} opacity-70`} />
            <div className="flex flex-col gap-4 pl-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={`flex items-center gap-1.5 ${labelClass} ${timerStyles.harvest.label}`}>
                  <Wheat className="h-3.5 w-3.5" />
                  Harvest Timer
                </p>
                {character.plantedBerryId ? (
                  <p className={`mt-3 text-lg font-extrabold flex items-center gap-2 ${timerStyles.harvest.value}`}>
                    <Clock className="h-4 w-4 opacity-70" />
                    {status.status === "wilted" ? "Cycle Expired" : formatRemainingTime(character.harvestAt, now)}
                  </p>
                ) : (
                  <p className="mt-3 text-xs font-semibold text-slate-500">—</p>
                )}
              </div>
              {character.plantedBerryId && (
                <TimerTimestamp label="Harvest At" value={formatDate(character.harvestAt)} />
              )}
            </div>
          </div>

          {/* Wilt Timer */}
          <div className={`relative overflow-hidden rounded-xl border p-4 sm:p-6 transition-all ${timerStyles.wilt.wrapper}`}>
            {/* Left accent bar */}
            <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full ${timerStyles.wilt.accent} opacity-70`} />
            <div className="flex flex-col gap-4 pl-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={`flex items-center gap-1.5 ${labelClass} ${timerStyles.wilt.label}`}>
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Wilt Threshold
                </p>
                {character.plantedBerryId ? (
                  <p className={`mt-3 text-lg font-extrabold flex items-center gap-2 ${timerStyles.wilt.value}`}>
                    <Clock className="h-4 w-4 opacity-70" />
                    {status.status === "wilted" ? "Plot Wilted" : formatRemainingTime(character.wiltAt, now)}
                  </p>
                ) : (
                  <p className="mt-3 text-xs font-semibold text-slate-500">—</p>
                )}
              </div>
              {character.plantedBerryId && (
                <TimerTimestamp label="Wilts At" value={formatDate(character.wiltAt)} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions Toolbar */}
      <div className="mt-6 sm:mt-8">
        {/* Section Divider */}
        <div className="mb-4 sm:mb-6 h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 light:via-slate-200 to-transparent" />
      </div>
      <div className="relative z-10 grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-end gap-2 sm:gap-3">
        {!character.plantedBerryId ? (
          <Button size="lg" onClick={onPlant} className="col-span-2">
            <Sprout className="mr-2 h-4.5 w-4.5" />
            Plant Berry
          </Button>
        ) : status.status === "wilted" ? (
          <Button size="lg" variant="danger" onClick={onHarvest} className="col-span-2">
            <Trash2 className="mr-2 h-4.5 w-4.5" />
            Clear Wilted
          </Button>
        ) : status.status === "harvestReady" ? (
          <Button size="lg" onClick={onHarvest} className="col-span-2">
            <Wheat className="mr-2 h-4.5 w-4.5" />
            Harvest
          </Button>
        ) : (
          <Button size="lg" variant="info" onClick={onWater} className="col-span-2">
            <Droplets className="mr-2 h-4.5 w-4.5" />
            Water
          </Button>
        )}

        {character.plantedBerryId &&
          (status.status === "growing" || status.status === "needWater") && (
            <Button size="lg" variant="secondary" onClick={onChangeBerry} className="col-span-2">
              <RefreshCw className="mr-2 h-4.5 w-4.5" />
              Change Berry
            </Button>
          )}

        <Button size="lg" variant="info" onClick={onEdit}>
          <Pencil className="mr-2 h-4.5 w-4.5" />
          Edit
        </Button>

        <Button size="lg" variant="danger" onClick={() => onDelete(character.id)}>
          <Trash2 className="mr-2 h-4.5 w-4.5" />
          Delete
        </Button>
      </div>
    </div>
  );
});

export default CharacterCard;
