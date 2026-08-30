import { useState, useEffect, useCallback } from "react";
import berryMasterIcon from "../../assets/brand/berrymaster-icon.png";
import { CURRENT_APP_VERSION } from "../../services/updateService";
import { Shield, Cpu, Database, Radio } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

const LOADING_STAGES = [
  { at: 15, text: "INITIALIZING POKEMMO FARMING SUITE..." },
  { at: 38, text: "CALIBRATING LEPPA SEED YIELD MATRICES..." },
  { at: 62, text: "SYNCHRONIZING REGIONAL PLOTS (UNOVA • HOENN • SINNOH)..." },
  { at: 85, text: "ARMING WATERING SCHEDULES & WILT ALARMS..." },
  { at: 100, text: "SYSTEMS ONLINE. WELCOME, MASTER FARMER." },
];

export default function LoadingScreen({
  onComplete,
  durationMs = 2400,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState(LOADING_STAGES[0].text);
  const [isExiting, setIsExiting] = useState(false);

  const finishLoading = useCallback(() => {
    setIsExiting(true);
    const timeout = setTimeout(() => {
      onComplete();
    }, 600);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  // Smooth progress increment
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / durationMs) * 100));

      setProgress(rawPct);

      // Update current diagnostic status
      const currentStage =
        LOADING_STAGES.find((s) => rawPct <= s.at) ||
        LOADING_STAGES[LOADING_STAGES.length - 1];
      setStageText(currentStage.text);

      if (rawPct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          finishLoading();
        }, 250);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [durationMs, finishLoading]);

  // Allow clicking anywhere or pressing Escape / Space to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        finishLoading();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finishLoading]);

  return (
    <div
      onClick={finishLoading}
      className={`
        fixed
        inset-0
        z-[99999]
        flex
        flex-col
        items-center
        justify-between
        bg-[#060b14]
        text-white
        overflow-hidden
        select-none
        transition-all
        duration-700
        ease-out
        ${
          isExiting
            ? "opacity-0 scale-105 pointer-events-none filter blur-sm"
            : "opacity-100 scale-100"
        }
      `}
    >
      {/* ========================================================= */}
      {/* ATMOSPHERIC BACKGROUND (CYBER GRID & NEON ORBS) */}
      {/* ========================================================= */}
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-60" />

      {/* Emerald Atmospheric Core Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[120px]" />

      {/* Ruby Berry Ambient Flare */}
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-[30rem] w-[30rem] rounded-full bg-rose-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-[28rem] w-[28rem] rounded-full bg-emerald-600/10 blur-[130px]" />

      {/* Cyber Vignette Mask */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050811_85%)]" />

      {/* ========================================================= */}
      {/* TOP STATUS BAR / METRICS */}
      {/* ========================================================= */}
      <header className="relative z-10 flex w-full items-center justify-between px-6 py-6 sm:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
              STATUS: INITIALIZING
            </span>
            <span className="text-[9px] font-mono text-slate-500 tracking-wider">
              CLIENT ID: BERRYMASTER-{CURRENT_APP_VERSION}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-slate-900/60 px-4 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
            OFFLINE ENGINE SECURED
          </span>
        </div>
      </header>

      {/* ========================================================= */}
      {/* CENTER HOLOGRAPHIC CREST & BRAND */}
      {/* ========================================================= */}
      <main className="relative z-10 flex flex-col items-center justify-center gap-7 px-4">
        {/* Holographic Tactical Ring System */}
        <div className="relative flex h-52 w-52 sm:h-64 sm:w-64 items-center justify-center">
          {/* Outer Rotating Tactical Tick Ring */}
          <div className="absolute inset-0 cyber-spin pointer-events-none">
            <svg viewBox="0 0 240 240" className="h-full w-full opacity-40">
              <circle
                cx="120"
                cy="120"
                r="114"
                fill="none"
                stroke="url(#outerEmeraldGradient)"
                strokeWidth="1.5"
                strokeDasharray="4 8 16 8"
              />
              <defs>
                <linearGradient
                  id="outerEmeraldGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#34d399" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#e11d48" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Inner Counter-Rotating Hex Orbit */}
          <div className="absolute inset-4 cyber-spin-reverse pointer-events-none">
            <svg viewBox="0 0 200 200" className="h-full w-full opacity-50">
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.2"
                strokeDasharray="18 36"
              />
              {/* Orbital Nodes */}
              <circle cx="100" cy="8" r="3.5" fill="#34d399" />
              <circle cx="100" cy="192" r="3.5" fill="#e11d48" />
            </svg>
          </div>

          {/* Subtle Ambient Pulse Ring */}
          <div className="absolute inset-8 rounded-full border border-emerald-500/25 bg-gradient-to-tr from-emerald-500/10 via-transparent to-rose-500/10 shadow-[0_0_50px_rgba(16,185,129,0.2)]" />

          {/* Center Glass Dais with BerryMaster Logo */}
          <div className="relative z-20 flex h-32 w-32 sm:h-36 sm:w-36 items-center justify-center rounded-3xl border border-white/20 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-2xl hologram-pulse">
            {/* Hologram Scanner Line */}
            <div className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent scan-line opacity-75" />

            <img
              src={berryMasterIcon}
              alt="BerryMaster Logo"
              className="h-full w-full object-contain drop-shadow-[0_8px_24px_rgba(16,185,129,0.6)]"
            />
          </div>

          {/* Tactical Corner Accents */}
          <div className="pointer-events-none absolute -top-2 -left-2 h-4 w-4 border-t-2 border-l-2 border-emerald-400" />
          <div className="pointer-events-none absolute -top-2 -right-2 h-4 w-4 border-t-2 border-r-2 border-emerald-400" />
          <div className="pointer-events-none absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-emerald-400" />
          <div className="pointer-events-none absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-emerald-400" />
        </div>

        {/* Branding Typography */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight flex items-center justify-center gap-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            <span className="text-white tracking-widest font-mono">BERRY</span>
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent tracking-wider font-mono">
              MASTER
            </span>
          </h1>

          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-emerald-500/60" />
            <p className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-slate-400 uppercase">
              PokeMMO Farming & Economics Suite
            </p>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-emerald-500/60" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* PROGRESS BAR & DIAGNOSTICS */}
        {/* ========================================================= */}
        <div className="w-full max-w-sm sm:max-w-md space-y-3 pt-2">
          {/* Status Diagnostic Message */}
          <div className="flex items-center justify-between text-xs font-mono px-1">
            <span className="flex items-center gap-2 text-[11px] font-semibold text-emerald-400/90 truncate max-w-[80%]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">{stageText}</span>
            </span>
            <span className="font-extrabold text-white text-xs tracking-wider">
              {progress}%
            </span>
          </div>

          {/* Futuristic Track */}
          <div className="relative h-2.5 w-full overflow-hidden rounded-full border border-emerald-500/30 bg-slate-950/80 p-[2px] shadow-inner shadow-black/60">
            {/* Progress Fill */}
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 shadow-[0_0_16px_rgba(52,211,153,0.7)] transition-all duration-150 ease-out overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Light */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer-gleam" />
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* BOTTOM TELEMETRY BAR */}
      {/* ========================================================= */}
      <footer className="relative z-10 flex w-full flex-col sm:flex-row items-center justify-between gap-3 px-6 py-6 sm:px-12 border-t border-white/[0.06] bg-slate-950/40 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Database className="h-3 w-3 text-emerald-400" />
            LOCAL DATABASE: <strong className="text-emerald-400">ACTIVE</strong>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Shield className="h-3 w-3 text-emerald-400" />
            ANTI-CHEAT COMPLIANT: <strong className="text-emerald-400">100% EXTERNAL</strong>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-slate-300">
            <Cpu className="h-3 w-3 text-emerald-400" />
            POKEMMO REGIONS: <strong className="text-emerald-400">4 LOADED</strong>
          </span>
        </div>

        <div className="text-[10px] font-mono text-slate-500 tracking-wider flex items-center gap-2">
          <span>Click anywhere to start</span>
          <span className="hidden sm:inline-block rounded border border-slate-700/80 bg-slate-800/80 px-1.5 py-0.5 text-[9px] text-slate-400">
            ESC / SPACE
          </span>
        </div>
      </footer>
    </div>
  );
}
