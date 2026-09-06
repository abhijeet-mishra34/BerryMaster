import { useState, useEffect } from "react";
import {
  Layers,
  X,
  Droplets,
  Wheat,
  Clock,
  Pin,
  Sparkles,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

import { useCharacters } from "../../context/CharacterContext";
import { useNow } from "../../hooks/useNow";
import { formatRemainingTime } from "../../utils/countdown";
import { formatDate } from "../../utils/date";
import { getCharacterStatus } from "../../utils/characterStatus";
import { berryDatabase } from "../../data/berryDatabase";
import { soundService } from "../../services/soundService";

type MiniHUDOverlayProps = {
  onClose: () => void;
};

export default function MiniHUDOverlay({ onClose }: MiniHUDOverlayProps) {
  const now = useNow();
  const { characters, waterBerry, harvestBerry, waterAllReady, harvestAllReady } = useCharacters();

  const [isPinned, setIsPinned] = useState(true);

  // When HUD mounts in Tauri, pin and resize to compact window
  useEffect(() => {
    async function initHUDWindow() {
      try {
        const { getCurrentWindow, LogicalSize } = await import("@tauri-apps/api/window");
        const appWindow = getCurrentWindow();
        await appWindow.setAlwaysOnTop(true);
        await appWindow.setSize(new LogicalSize(390, 600));
      } catch {
        // Running in web browser
      }
    }

    initHUDWindow();

    return () => {
      // Restore on unmount
      async function restoreWindow() {
        try {
          const { getCurrentWindow, LogicalSize } = await import("@tauri-apps/api/window");
          const appWindow = getCurrentWindow();
          await appWindow.setAlwaysOnTop(false);
          await appWindow.setSize(new LogicalSize(1200, 800));
        } catch {
          // Running in web browser
        }
      }
      restoreWindow();
    };
  }, []);

  async function toggleAlwaysOnTop() {
    const next = !isPinned;
    setIsPinned(next);
    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      await getCurrentWindow().setAlwaysOnTop(next);
    } catch {
      // web browser
    }
  }

  // Count active batch statuses
  const countNeedWater = characters.filter((c) => {
    if (!c.plantedBerryId || !c.nextWaterAt) return false;
    return now.getTime() >= new Date(c.nextWaterAt).getTime();
  }).length;

  const countHarvestReady = characters.filter((c) => {
    if (!c.plantedBerryId || !c.harvestAt) return false;
    return (
      now.getTime() >= new Date(c.harvestAt).getTime() &&
      (!c.wiltAt || now.getTime() < new Date(c.wiltAt).getTime())
    );
  }).length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0b0f19]/95 text-white backdrop-blur-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* HUD Header Bar (Draggable in Tauri) */}
      <div
        data-tauri-drag-region
        className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/90 border-b border-white/[0.08] select-none"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Layers className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-black tracking-wider uppercase text-emerald-400">
            PokéMMO HUD
          </span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <div className="flex items-center gap-1.5">
          {/* Always on top pin */}
          <button
            type="button"
            onClick={toggleAlwaysOnTop}
            title={isPinned ? "Always-on-top Pinned" : "Pin Always-on-top"}
            className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all cursor-pointer ${
              isPinned
                ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-300"
                : "border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
            }`}
          >
            <Pin className={`h-3.5 w-3.5 ${isPinned ? "fill-emerald-400 rotate-45" : ""}`} />
          </button>

          {/* Exit HUD */}
          <button
            type="button"
            onClick={onClose}
            title="Exit HUD Mode (Restore Full App)"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-slate-800/80 text-slate-300 hover:bg-rose-500 hover:border-rose-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Batch Actions (if needed) */}
      {(countNeedWater > 0 || countHarvestReady > 0) && (
        <div className="flex items-center gap-2 p-2.5 bg-slate-950/60 border-b border-white/[0.06]">
          {countNeedWater > 0 && (
            <button
              type="button"
              onClick={() => waterAllReady()}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-sky-400/40 bg-sky-500/20 hover:bg-sky-500 hover:text-slate-950 py-1.5 text-[11px] font-extrabold text-sky-300 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Droplets className="h-3.5 w-3.5" />
              <span>Water All ({countNeedWater})</span>
            </button>
          )}

          {countHarvestReady > 0 && (
            <button
              type="button"
              onClick={() => harvestAllReady()}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 py-1.5 text-[11px] font-extrabold text-amber-300 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Wheat className="h-3.5 w-3.5" />
              <span>Harvest All ({countHarvestReady})</span>
            </button>
          )}
        </div>
      )}

      {/* Plots Stream List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
        {characters.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center text-slate-500">
            <Layers className="h-8 w-8 mb-2 opacity-30" />
            <p className="text-xs font-bold">No characters created yet.</p>
          </div>
        ) : (
          characters.map((char, index) => {
            const berry = berryDatabase.find((b) => b.id === char.plantedBerryId);
            const status = getCharacterStatus(char);

            // Calculate progress percentages
            let moisturePercent: number | null = null;
            if (char.plantedBerryId && char.nextWaterAt) {
              const nextWater = new Date(char.nextWaterAt).getTime();
              const lastWater = char.lastWateredAt
                ? new Date(char.lastWateredAt).getTime()
                : char.plantedAt
                ? new Date(char.plantedAt).getTime()
                : nextWater - 8 * 3600 * 1000;
              const totalTime = Math.max(1, nextWater - lastWater);
              const remaining = nextWater - now.getTime();
              moisturePercent = Math.max(0, Math.min(100, (remaining / totalTime) * 100));
            }

            const needsWater = status.status === "needWater";
            const harvestReady = status.status === "harvestReady";
            const isWilted = status.status === "wilted";

            return (
              <div
                key={char.id}
                className={`relative rounded-xl border p-2.5 transition-all ${
                  harvestReady
                    ? "border-amber-400/60 bg-[#231e14]/90 shadow-[0_0_12px_rgba(251,191,36,0.2)]"
                    : needsWater
                    ? "border-sky-500/50 bg-[#142032]/90 shadow-[0_0_10px_rgba(14,165,233,0.15)]"
                    : "border-white/[0.08] bg-[#181b2a]/90 hover:border-white/20"
                }`}
              >
                {/* Character Name + Slot + Berry Icon */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-300">
                      #{String(index + 1).padStart(3, "0")}
                    </span>
                    <span className="text-xs font-black text-white truncate max-w-[120px]">
                      {char.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {berry?.image ? (
                      <img src={berry.image} alt={berry.name} className="h-4.5 w-4.5 object-contain" />
                    ) : (
                      <span className="text-xs text-slate-500">⚪</span>
                    )}
                    <span className="text-[10.5px] font-bold text-slate-300 truncate max-w-[90px]">
                      {berry?.name ?? "Idle"}
                    </span>
                  </div>
                </div>

                {/* Timers & Action Row */}
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  {/* Left: Water status / Harvest status */}
                  <div className="min-w-0 flex-1 space-y-0.5">
                    {char.plantedBerryId ? (
                      <>
                        <div className="flex items-center gap-1 font-bold text-slate-300 truncate">
                          <Droplets className="h-3 w-3 text-sky-400 shrink-0" />
                          <span>
                            {char.nextWaterAt
                              ? formatRemainingTime(char.nextWaterAt, now)
                              : "Watered"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-bold text-slate-400 truncate text-[10px]">
                          <Wheat className="h-3 w-3 text-amber-400 shrink-0" />
                          <span>
                            {harvestReady
                              ? "Ready to Harvest!"
                              : isWilted
                              ? "Wilted"
                              : char.harvestAt
                              ? formatRemainingTime(char.harvestAt, now)
                              : "—"}
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-semibold italic">
                        Ready to plant
                      </span>
                    )}
                  </div>

                  {/* Right: Instant Quick Action Button */}
                  {char.plantedBerryId && (
                    <div className="shrink-0">
                      {harvestReady ? (
                        <button
                          type="button"
                          onClick={() => harvestBerry(char.id)}
                          className="flex items-center gap-1 rounded-lg border border-amber-400/50 bg-amber-500 px-2.5 py-1 text-[10.5px] font-extrabold text-slate-950 shadow-sm transition-all hover:bg-amber-400 active:scale-95 cursor-pointer animate-pulse"
                        >
                          <Wheat className="h-3 w-3" />
                          <span>Harvest</span>
                        </button>
                      ) : isWilted ? (
                        <button
                          type="button"
                          onClick={() => harvestBerry(char.id)}
                          className="flex items-center gap-1 rounded-lg border border-rose-500/40 bg-rose-500/20 px-2.5 py-1 text-[10.5px] font-bold text-rose-300 transition-all hover:bg-rose-500 hover:text-white active:scale-95 cursor-pointer"
                        >
                          <span>Clear</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => waterBerry(char.id)}
                          className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10.5px] font-bold transition-all active:scale-95 cursor-pointer ${
                            needsWater
                              ? "border-sky-400/50 bg-sky-500 text-slate-950 hover:bg-sky-400 font-extrabold shadow-sm"
                              : "border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20"
                          }`}
                        >
                          <Droplets className="h-3 w-3" />
                          <span>Water</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Moisture mini bar */}
                {moisturePercent !== null && (
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        moisturePercent <= 0
                          ? "bg-rose-500"
                          : moisturePercent < 25
                          ? "bg-amber-400"
                          : "bg-sky-400"
                      }`}
                      style={{ width: `${moisturePercent}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Mini HUD Footer Status */}
      <div className="px-3 py-1.5 bg-slate-950/80 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400">
        <span>{characters.length} Plots Tracked</span>
        <button
          type="button"
          onClick={onClose}
          className="text-emerald-400 hover:underline cursor-pointer font-bold"
        >
          Return to App
        </button>
      </div>
    </div>
  );
}
