import { useState, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Droplets,
  Sprout,
  X,
} from "lucide-react";
import type { Character } from "../../types/Character";
import { berryDatabase } from "../../data/berryDatabase";
import { farmingProfiles } from "../../data/farmingProfiles";
import { calculateNextWaterTime } from "../../utils/wateringCalculator";
import { formatDate } from "../../utils/date";

export type TimerTarget = "planted" | "water";

type TimerPickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  target: TimerTarget;
  onSave: (updates: {
    plantedAt?: string;
    lastWateredAt?: string;
    nextWaterAt?: string;
    harvestAt?: string;
    wiltAt?: string;
  }) => void;
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TimerPickerModal({
  isOpen,
  onClose,
  character,
  target,
  onSave,
}: TimerPickerModalProps) {
  const berry = berryDatabase.find((b) => b.id === character.plantedBerryId);
  const profile = berry
    ? farmingProfiles.find((p) => Math.abs(p.growthTime - berry.growthTime) < 0.001)
    : undefined;

  // Initialize date from character
  const initialDate = useMemo(() => {
    if (target === "water") {
      if (character.lastWateredAt) return new Date(character.lastWateredAt);
      if (character.nextWaterAt) {
        // approximate when it was watered by subtracting repeat interval
        const repeat = profile?.repeatWaterEveryHours ?? 10;
        return new Date(new Date(character.nextWaterAt).getTime() - repeat * 3600 * 1000);
      }
    }
    if (character.plantedAt) {
      return new Date(character.plantedAt);
    }
    return new Date();
  }, [character, target, profile]);

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [activeTab, setActiveTab] = useState<"date" | "time">("date");

  // Calendar month/year navigation state
  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth());

  if (!isOpen) return null;

  const year = selectedDate.getFullYear();
  const monthName = MONTH_NAMES[selectedDate.getMonth()];
  const day = selectedDate.getDate();
  const hours = String(selectedDate.getHours()).padStart(2, "0");
  const minutes = String(selectedDate.getMinutes()).padStart(2, "0");

  // Calculate calendar grid days
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (dayNum: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(viewYear);
    newDate.setMonth(viewMonth);
    newDate.setDate(dayNum);
    setSelectedDate(newDate);
  };

  const handleHourChange = (newHour: number) => {
    const clamped = Math.max(0, Math.min(23, newHour));
    const newDate = new Date(selectedDate);
    newDate.setHours(clamped);
    setSelectedDate(newDate);
  };

  const handleMinuteChange = (newMin: number) => {
    const clamped = Math.max(0, Math.min(59, newMin));
    const newDate = new Date(selectedDate);
    newDate.setMinutes(clamped);
    setSelectedDate(newDate);
  };

  const adjustMinutes = (delta: number) => {
    const newDate = new Date(selectedDate.getTime() + delta * 60 * 1000);
    setSelectedDate(newDate);
    setViewYear(newDate.getFullYear());
    setViewMonth(newDate.getMonth());
  };

  const handleSetToNow = () => {
    const now = new Date();
    setSelectedDate(now);
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
  };

  // Live recalculations for all timers
  const calculated = useMemo(() => {
    if (!berry) return null;

    if (target === "water") {
      // User changed when the berry was watered
      const nextWaterIso = calculateNextWaterTime(
        berry,
        character.wateringCount ?? 1,
        selectedDate
      ) || new Date(
        selectedDate.getTime() + (profile?.repeatWaterEveryHours ?? 10) * 3600 * 1000
      ).toISOString();

      return {
        lastWateredAt: selectedDate.toISOString(),
        nextWaterAt: nextWaterIso,
      };
    }

    // target === "planted" -> Recalculates ALL timers
    const firstWaterHours = profile
      ? profile.autoWaterOnPlant
        ? profile.repeatWaterEveryHours
        : profile.firstWaterAfterHours
      : berry.growthTime / 2;

    const nextWater = new Date(selectedDate.getTime() + firstWaterHours * 3600 * 1000);
    const harvest = new Date(selectedDate.getTime() + berry.growthTime * 3600 * 1000);
    const wilt = new Date(harvest.getTime() + berry.harvestWindow * 3600 * 1000);

    return {
      plantedAt: selectedDate.toISOString(),
      lastWateredAt: profile?.autoWaterOnPlant ? selectedDate.toISOString() : undefined,
      nextWaterAt: nextWater.toISOString(),
      harvestAt: harvest.toISOString(),
      wiltAt: wilt.toISOString(),
    };
  }, [berry, character.wateringCount, profile, selectedDate, target]);

  const handleConfirm = () => {
    if (!calculated) {
      onClose();
      return;
    }
    onSave(calculated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Outer Card: Smooth, spacious, no clipping curves */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-b from-[#23273c] via-[#1a1d2e] to-[#141624] border border-white/[0.1] shadow-2xl shadow-black/90 text-white p-6 sm:p-7">
        {/* Soft Ambient Rim Light */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* ========================================================= */}
        {/* HEADER: TITLE + CLOSE BUTTON (AMPLE INSET, NO CLIPPING)   */}
        {/* ========================================================= */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-sky-400">
              {target === "planted" ? (
                <>
                  <Sprout className="h-3.5 w-3.5" />
                  <span>Planting Time Recalculator</span>
                </>
              ) : (
                <>
                  <Droplets className="h-3.5 w-3.5" />
                  <span>Watered Time Adjuster</span>
                </>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-2">
              {target === "planted" ? "Adjust Planted Time" : "When Was It Watered?"}
            </h2>

            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {target === "planted"
                ? "Changing this will automatically recalculate all water, harvest, and wilt timers."
                : "Updates your watering interval based on when you watered in PokéMMO."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* DATE & TIME READOUT HERO (LARGE, CRISP, NO HARD BORDERS)  */}
        {/* ========================================================= */}
        <div className="rounded-xl bg-white/[0.04] p-4 flex items-center justify-between mb-5">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Selected Date
            </span>
            <span className="text-base sm:text-lg font-bold text-white">
              {monthName} {day}, {year}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Time (24h)
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-black text-sky-400 tracking-tight">
              {hours}:{minutes}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODE SWITCHER PILLS (NO HARSH DIVIDER LINES)              */}
        {/* ========================================================= */}
        <div className="flex gap-2 p-1 rounded-xl bg-[#121422] mb-5">
          <button
            type="button"
            onClick={() => setActiveTab("date")}
            className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "date"
                ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/25"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <CalendarIcon className="h-4 w-4" />
            <span>Select Date</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("time")}
            className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "time"
                ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/25"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Select Time</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB CONTENT: CALENDAR GRID OR TIME SELECTOR               */}
        {/* ========================================================= */}
        {activeTab === "date" ? (
          <div>
            {/* Month & Year Navigation */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-base font-bold text-white">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next Month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 text-center mb-2">
              {DAYS_OF_WEEK.map((d, i) => (
                <span
                  key={i}
                  className="text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Days Grid: Larger, comfortable buttons */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {calendarDays.map((d, idx) => {
                if (d === null) {
                  return <div key={`empty-${idx}`} className="h-10 w-10 sm:h-11 sm:w-11" />;
                }

                const isSelected =
                  selectedDate.getFullYear() === viewYear &&
                  selectedDate.getMonth() === viewMonth &&
                  selectedDate.getDate() === d;

                return (
                  <button
                    key={`day-${d}`}
                    type="button"
                    onClick={() => handleSelectDay(d)}
                    className={`h-10 w-10 sm:h-11 sm:w-11 mx-auto flex items-center justify-center rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30 scale-105"
                        : "text-slate-200 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="py-2">
            {/* Time input boxes */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="flex flex-col items-center">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Hours (0-23)
                </label>
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={selectedDate.getHours()}
                  onChange={(e) => handleHourChange(parseInt(e.target.value) || 0)}
                  className="w-20 h-14 rounded-xl bg-[#121422] border border-white/15 text-center text-3xl font-mono font-black text-white focus:border-sky-400 focus:outline-none"
                />
              </div>

              <span className="text-3xl font-black text-slate-500 mt-5">:</span>

              <div className="flex flex-col items-center">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Minutes (0-59)
                </label>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={selectedDate.getMinutes()}
                  onChange={(e) => handleMinuteChange(parseInt(e.target.value) || 0)}
                  className="w-20 h-14 rounded-xl bg-[#121422] border border-white/15 text-center text-3xl font-mono font-black text-white focus:border-sky-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Adjustment Buttons (Larger, comfortable) */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              <button
                type="button"
                onClick={() => adjustMinutes(-60)}
                className="h-10 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-slate-200 transition-colors cursor-pointer"
              >
                -1 Hour
              </button>
              <button
                type="button"
                onClick={() => adjustMinutes(-15)}
                className="h-10 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-slate-200 transition-colors cursor-pointer"
              >
                -15 Min
              </button>
              <button
                type="button"
                onClick={() => adjustMinutes(15)}
                className="h-10 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-slate-200 transition-colors cursor-pointer"
              >
                +15 Min
              </button>
              <button
                type="button"
                onClick={() => adjustMinutes(60)}
                className="h-10 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-slate-200 transition-colors cursor-pointer"
              >
                +1 Hour
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleSetToNow}
                className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-sky-500/15 border border-sky-400/30 text-xs font-bold text-sky-400 hover:bg-sky-500/25 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset to Current Time</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* FOOTER ACTIONS (NO DIVIDING LINE, LARGE BUTTONS)          */}
        {/* ========================================================= */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-5 rounded-xl bg-transparent hover:bg-white/[0.06] text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="h-11 px-7 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-sky-500/25 active:scale-95 transition-all cursor-pointer"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
