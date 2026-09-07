import { forwardRef } from "react";
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
} from "lucide-react";

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
  focused?: boolean;
  onPlant: () => void;
  onWater: () => void;
  onHarvest: () => void;
  onChangeBerry: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onOpenTimerPicker?: (target: "planted" | "water") => void;
};

const CharacterCard = forwardRef<HTMLDivElement, CharacterCardProps>(
  function CharacterCard(
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
      onOpenTimerPicker,
    },
    ref
  ) {
    const now = useNow();

    const berry = berryDatabase.find((b) => b.id === character.plantedBerryId);
    const status = getCharacterStatus(character);
    const characterNumber = String(index + 1).padStart(3, "0");

    // Calculate Moisture & Ripeness Progress Percentages
    let moisturePercent: number | null = null;
    if (character.plantedBerryId && character.nextWaterAt) {
      const nextWater = new Date(character.nextWaterAt).getTime();
      const lastWater = character.lastWateredAt
        ? new Date(character.lastWateredAt).getTime()
        : character.plantedAt
        ? new Date(character.plantedAt).getTime()
        : nextWater - 8 * 3600 * 1000;
      const totalWaterTime = Math.max(1, nextWater - lastWater);
      const remainingWaterTime = nextWater - now.getTime();
      moisturePercent = Math.max(0, Math.min(100, (remainingWaterTime / totalWaterTime) * 100));
    }

    let growthPercent: number | null = null;
    if (character.plantedBerryId && character.harvestAt && character.plantedAt) {
      const planted = new Date(character.plantedAt).getTime();
      const harvest = new Date(character.harvestAt).getTime();
      const totalGrowth = Math.max(1, harvest - planted);
      const elapsed = now.getTime() - planted;
      growthPercent = Math.max(0, Math.min(100, (elapsed / totalGrowth) * 100));
    }

    return (
      <div
        ref={ref}
        className={`
          card-shine
          relative
          overflow-hidden
          rounded-2xl
          sm:rounded-3xl
          p-4
          sm:p-5
          backdrop-blur-2xl
          transition-all
          duration-300
          h-full
          flex
          flex-col
          bg-gradient-to-b from-[#2e3248] via-[#212437] to-[#171927]
          border
          shadow-[0_16px_36px_rgba(0,0,0,0.5)]
          hover:-translate-y-1.5
          hover:shadow-[0_24px_50px_rgba(0,0,0,0.7)]
          ${
            highlight === "plant"
              ? "scale-[1.01] border-emerald-400/80 shadow-2xl shadow-emerald-500/20 ring-2 ring-emerald-500/20"
              : focused
              ? "border-slate-300/40 ring-2 ring-white/10 shadow-2xl shadow-white/5"
              : status.status === "harvestReady"
              ? "border-amber-400/70 shadow-[0_0_30px_rgba(251,191,36,0.3)] ring-2 ring-amber-400/50 hover:border-amber-300"
              : "border-white/[0.09] hover:border-white/[0.22]"
          }
        `}
      >
        {/* Top Rim Accent Glow */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] ${
            status.status === "harvestReady"
              ? "bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.8)] animate-pulse"
              : "bg-gradient-to-r from-transparent via-white/20 to-transparent"
          }`}
        />

        {/* ========================================================= */}
        {/* TOP SECTION: PROFILE ROW (PFP TOP LEFT WITH BREATHING ROOM)*/}
        {/* ========================================================= */}
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-4.5">
          {/* Left: Avatar + Name + Slot */}
          <div className="flex items-center gap-4 sm:gap-5 min-w-0">
            {/* PFP Avatar (Circular with clean light border matching profile pic reference) */}
            <div className="relative shrink-0">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-white/80 bg-[#282c42] p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.35)] overflow-hidden">
                {berry?.image ? (
                  <img
                    src={berry.image}
                    alt={berry.name}
                    className="h-8.5 w-8.5 sm:h-10 sm:w-10 object-contain drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-110"
                  />
                ) : character.plantedBerryId ? (
                  <span className="text-xl sm:text-2xl select-none filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                    🌱
                  </span>
                ) : (
                  <User className="h-5.5 w-5.5 sm:h-6 sm:w-6 text-white/90" />
                )}
              </div>

              {/* Status Indicator Badge on PFP */}
              <div className="absolute -bottom-0.5 -right-0.5 flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 border-[#212437] bg-[#171927] shadow-sm">
                {status.status === "needWater" ? (
                  <Droplets className="h-2.5 w-2.5 text-sky-400 animate-bounce" />
                ) : status.status === "harvestReady" ? (
                  <Wheat className="h-2.5 w-2.5 text-amber-400 animate-pulse" />
                ) : status.status === "wilted" ? (
                  <AlertTriangle className="h-2.5 w-2.5 text-rose-400" />
                ) : character.plantedBerryId ? (
                  <Sprout className="h-2.5 w-2.5 text-emerald-400" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                )}
              </div>
            </div>

            {/* Name & Subtitle */}
            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] sm:text-[9.5px] font-extrabold uppercase tracking-widest text-slate-300">
                  Slot #{characterNumber}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white truncate leading-tight">
                {character.name}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                {berry ? `Planted: ${berry.name}` : "Ready to Plant"}
              </p>
            </div>
          </div>

          {/* Right: Status Pill */}
          <div className="shrink-0">
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
                shadow-xs
                ${status.className}
              `}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {status.label}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TIER 1: TOP ROW (PLANTED & WATER IN - FULL WIDTH CARDS)   */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-0">
          {/* Card 1: Planted Berry & Planted Time */}
          <div className="relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#25283c]/85 p-2 sm:p-2.5 min-h-[78px] sm:min-h-[82px] transition-all duration-200 hover:bg-[#2e324a]/95 hover:-translate-y-0.5 hover:shadow-lg hover:border-white/20">
            {/* Top: Icon + Label + Changer Button */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  {berry?.image ? (
                    <img src={berry.image} alt={berry.name} className="h-4 w-4 object-contain" />
                  ) : (
                    <Sprout className="h-3.5 w-3.5" />
                  )}
                </div>
                <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 truncate">
                  Planted
                </span>
              </div>

              {character.plantedBerryId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenTimerPicker?.("planted");
                  }}
                  title="Change Planted Time (Recalculates all timers)"
                  className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-lg bg-sky-500 hover:bg-sky-400 text-white shadow-sm transition-all cursor-pointer hover:scale-110 active:scale-95"
                >
                  <Clock className="h-2.5 w-2.5" />
                </button>
              )}
            </div>

            {/* Middle: Berry Name */}
            <p className="text-xs sm:text-[13px] font-extrabold text-white truncate my-0.5">
              {berry?.name ?? "No Berry Planted"}
            </p>

            {/* Bottom: Planted Timestamp */}
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-200 truncate">
              <Clock className="h-3 w-3 text-emerald-400 shrink-0" />
              <span className="truncate">
                {character.plantedAt ? formatDate(character.plantedAt) : "Ready to Plant"}
              </span>
            </div>
          </div>

          {/* Card 2: Water Timer & Schedule */}
          <div className="relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#25283c]/85 p-2 sm:p-2.5 min-h-[78px] sm:min-h-[82px] transition-all duration-200 hover:bg-[#2e324a]/95 hover:-translate-y-0.5 hover:shadow-lg hover:border-white/20">
            {/* Top: Icon + Label + Changer Button */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400">
                  <Droplets className="h-3.5 w-3.5" />
                </div>
                <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 truncate">
                  Water In
                </span>
              </div>

              {character.plantedBerryId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenTimerPicker?.("water");
                  }}
                  title="Change When Berry Was Watered"
                  className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-lg bg-sky-500 hover:bg-sky-400 text-white shadow-sm transition-all cursor-pointer hover:scale-110 active:scale-95"
                >
                  <Clock className="h-2.5 w-2.5" />
                </button>
              )}
            </div>

            {/* Middle: Live Countdown / Status */}
            <p className="text-xs sm:text-[13px] font-extrabold text-white truncate my-0.5">
              {character.nextWaterAt
                ? formatRemainingTime(character.nextWaterAt, now)
                : character.plantedBerryId
                ? "Fully Watered"
                : "—"}
            </p>

            {/* Bottom: Next Due Timestamp & Moisture Gauge */}
            <div>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-200 truncate">
                <Clock className="h-3 w-3 text-sky-400 shrink-0" />
                <span className="truncate">
                  {character.nextWaterAt
                    ? `Due ${formatDate(character.nextWaterAt)}`
                    : character.plantedBerryId
                    ? "Watered"
                    : "No Schedule"}
                </span>
              </div>
              {moisturePercent !== null && (
                <div className="w-full h-1 bg-slate-800/90 rounded-full overflow-hidden mt-1.5 border border-white/[0.05]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      moisturePercent <= 0
                        ? "bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                        : moisturePercent < 25
                        ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                        : "bg-gradient-to-r from-sky-500 to-teal-400 shadow-[0_0_6px_rgba(14,165,233,0.5)]"
                    }`}
                    style={{ width: `${moisturePercent}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TIER 2: BOTTOM ROW (HARVEST & WILT - CENTERED & PROPORTIONAL) */}
        {/* ========================================================= */}
        <div className="w-full flex justify-center mb-4 sm:mb-4.5" style={{ marginBottom: "18px" }}>
          <div className="w-[92%] sm:w-[90%] max-w-[370px] grid grid-cols-2 gap-2.5 sm:gap-3">
            {/* Card 3: Harvest Timer */}
            <div className="relative flex flex-col justify-between rounded-xl border border-white/[0.07] bg-[#1c1f32]/85 p-2 sm:p-2.5 min-h-[72px] sm:min-h-[76px] transition-all duration-200 hover:bg-[#25283c]/90 hover:-translate-y-0.5 hover:shadow-md hover:border-white/15">
              {/* Top: Icon + Label */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                    <Wheat className="h-3 w-3" />
                  </div>
                  <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 truncate">
                    Harvest In
                  </span>
                </div>
              </div>

              {/* Middle: Live Countdown / Status */}
              <p className="text-xs sm:text-sm font-extrabold text-white truncate my-0.5">
                {character.plantedBerryId
                  ? status.status === "wilted"
                    ? "Cycle Expired"
                    : status.status === "harvestReady"
                    ? "Ready!"
                    : formatRemainingTime(character.harvestAt, now)
                  : "—"}
              </p>

              {/* Bottom: Harvest Timestamp & Ripeness Gauge */}
              <div>
                <div className="flex items-center gap-1 text-[10.5px] sm:text-[11.5px] font-bold text-slate-200 truncate">
                  <Clock className="h-3 w-3 text-amber-400 shrink-0" />
                  <span className="truncate">
                    {character.harvestAt ? formatDate(character.harvestAt) : "No Cycle"}
                  </span>
                </div>
                {growthPercent !== null && (
                  <div className="w-full h-1 bg-slate-800/90 rounded-full overflow-hidden mt-1.5 border border-white/[0.05]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        growthPercent >= 100
                          ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.7)] animate-pulse"
                          : "bg-gradient-to-r from-emerald-500 to-amber-400 shadow-[0_0_6px_rgba(16,185,129,0.5)]"
                      }`}
                      style={{ width: `${growthPercent}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Card 4: Wilt Threshold */}
            <div className="relative flex flex-col justify-between rounded-xl border border-white/[0.07] bg-[#1c1f32]/85 p-2 sm:p-2.5 min-h-[72px] sm:min-h-[76px] transition-all duration-200 hover:bg-[#25283c]/90 hover:-translate-y-0.5 hover:shadow-md hover:border-white/15">
              {/* Top: Icon + Label */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-lg bg-rose-500/15 text-rose-400">
                    <AlertTriangle className="h-3 w-3" />
                  </div>
                  <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 truncate">
                    Wilt Threshold
                  </span>
                </div>
              </div>

              {/* Middle: Live Countdown / Status */}
              <p className="text-xs sm:text-sm font-extrabold text-white truncate my-0.5">
                {character.plantedBerryId
                  ? status.status === "wilted"
                    ? "Plot Wilted"
                    : formatRemainingTime(character.wiltAt, now)
                  : "—"}
              </p>

              {/* Bottom: Wilts At Timestamp */}
              <div className="flex items-center gap-1 text-[10.5px] sm:text-[11.5px] font-bold text-slate-200 truncate">
                <Clock className="h-3 w-3 text-rose-400 shrink-0" />
                <span className="truncate">
                  {character.wiltAt ? formatDate(character.wiltAt) : "No Wilt"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2X2 ACTION BUTTONS GRID: EQUAL SIZED, BALANCED             */}
        {/* ========================================================= */}
        <div className="mt-auto pt-1">
          <div className="grid grid-cols-2 gap-x-2 sm:gap-x-2.5 gap-y-2.5 sm:gap-y-3">
            {/* Button 1: Primary Action (Plant / Water / Harvest / Clear) */}
            {!character.plantedBerryId ? (
              <Button
                size="md"
                className="w-full h-10 sm:h-10.5 justify-center font-bold text-xs sm:text-sm shadow-md"
                onClick={onPlant}
              >
                <Sprout className="mr-1.5 h-4 w-4 shrink-0" />
                <span>Plant Berry</span>
              </Button>
            ) : status.status === "wilted" ? (
              <Button
                size="md"
                variant="danger"
                className="w-full h-10 sm:h-10.5 justify-center font-bold text-xs sm:text-sm shadow-md"
                onClick={onHarvest}
              >
                <Trash2 className="mr-1.5 h-4 w-4 shrink-0" />
                <span>Clear Wilted</span>
              </Button>
            ) : status.status === "harvestReady" ? (
              <Button
                size="md"
                className="w-full h-10 sm:h-10.5 justify-center font-bold text-xs sm:text-sm shadow-md bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400"
                onClick={onHarvest}
              >
                <Wheat className="mr-1.5 h-4 w-4 shrink-0" />
                <span>Harvest</span>
              </Button>
            ) : (
              <Button
                size="md"
                variant="info"
                className="w-full h-10 sm:h-10.5 justify-center font-bold text-xs sm:text-sm shadow-md"
                onClick={onWater}
              >
                <Droplets className="mr-1.5 h-4 w-4 shrink-0" />
                <span>Water</span>
              </Button>
            )}

            {/* Button 2: Change Berry (or Choose Berry) - Purple on Hover */}
            {character.plantedBerryId ? (
              <Button
                size="md"
                variant="purple"
                className="w-full h-10 sm:h-10.5 justify-center font-bold text-xs sm:text-sm shadow-md"
                onClick={onChangeBerry}
              >
                <RefreshCw className="mr-1.5 h-3.5 w-3.5 shrink-0" />
                <span>Change Berry</span>
              </Button>
            ) : (
              <Button
                size="md"
                variant="purple"
                className="w-full h-10 sm:h-10.5 justify-center font-bold text-xs sm:text-sm shadow-md"
                onClick={onPlant}
              >
                <Sprout className="mr-1.5 h-4 w-4 shrink-0" />
                <span>Select Berry</span>
              </Button>
            )}

            {/* Button 3: Edit - Orange on Hover */}
            <Button
              size="md"
              variant="orange"
              className="w-full h-10 sm:h-10.5 justify-center font-bold text-xs sm:text-sm shadow-md"
              onClick={onEdit}
            >
              <Pencil className="mr-1.5 h-3.5 w-3.5 shrink-0" />
              <span>Edit</span>
            </Button>

            {/* Button 4: Delete */}
            <Button
              size="md"
              variant="danger"
              className="w-full h-10 sm:h-10.5 justify-center font-bold text-xs sm:text-sm"
              onClick={() => onDelete(character.id)}
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5 shrink-0" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default CharacterCard;
