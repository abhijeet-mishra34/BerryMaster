import { useState, useEffect, useRef, useCallback } from "react";

// Funny objects the UFO can "borrow" for research
const ABDUCTION_TARGETS = [
  { name: "Leppa Berry", icon: "🍒", label: "Harvest Sample #42" },
  { name: "Farm Miltank", icon: "🐄", label: "Specimen Cow" },
  { name: "Golden Magikarp", icon: "🐟", label: "Confused Fish" },
  { name: "Oran Berry", icon: "🫐", label: "Juicy Specimen" },
  { name: "Sprout Pot", icon: "🌱", label: "Soil Sample" },
  { name: "Psyduck", icon: "🦆", label: "Headache Alien" },
];

const ALIEN_MESSAGES = [
  "BEEP BOOP! BORROWING THIS FOR SCIENCE! 🛸",
  "INVESTIGATING POKEMMO SOIL QUALITY! 🌱",
  "RETURN POLICY: 5 SECONDS OR LESS! ⏳",
  "DON'T MIND US, MASTER FARMER! 🍒",
  "TASTES LIKE SWEET LEPPA! 😋",
];

type UFOState =
  | "idle" // Waiting off-screen
  | "flyIn" // Entering from sky
  | "beamDown" // Shining tractor beam
  | "abducting" // Object lifting into UFO
  | "cruising" // Holding object, cruising around
  | "returnTrip" // Flying back to original spot
  | "returning" // Lowering object back down
  | "warpOut"; // Hyper-drive exit

export default function UFOEasterEgg() {
  const [state, setState] = useState<UFOState>("idle");
  const [target, setTarget] = useState(ABDUCTION_TARGETS[0]);
  const [speech, setSpeech] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  // Random landing coordinates (percent of viewport)
  const [pos, setPos] = useState({ x: 50, y: 35 });
  const [cruiseOffset, setCruiseOffset] = useState({ x: 0, y: 0 });

  const activeRef = useRef(false);

  const startAbductionMission = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;

    // Pick random target & location
    const randomTarget =
      ABDUCTION_TARGETS[
        Math.floor(Math.random() * ABDUCTION_TARGETS.length)
      ];
    setTarget(randomTarget);
    setSpeech(null);

    // Position somewhere visible but not offscreen (between 25% and 75% X, 25% and 55% Y)
    const targetX = 25 + Math.random() * 50;
    const targetY = 22 + Math.random() * 32;
    setPos({ x: targetX, y: targetY });
    setCruiseOffset({ x: 0, y: 0 });

    // Step 1: Fly In (takes ~1.8s)
    setState("flyIn");

    // Step 2: Beam Down
    setTimeout(() => {
      setState("beamDown");

      // Step 3: Abduct Object
      setTimeout(() => {
        setState("abducting");

        // Step 4: UFO absorbs object and cruises around
        setTimeout(() => {
          setState("cruising");
          // Drift around
          setCruiseOffset({
            x: (Math.random() - 0.5) * 140,
            y: (Math.random() - 0.5) * 50,
          });

          // Step 5: After 5 seconds, return to drop zone
          setTimeout(() => {
            setState("returnTrip");
            setCruiseOffset({ x: 0, y: 0 });

            // Step 6: Lower object back down
            setTimeout(() => {
              setState("returning");

              // Step 7: Object safe on ground, UFO warps away!
              setTimeout(() => {
                setState("warpOut");

                // Reset to idle
                setTimeout(() => {
                  setState("idle");
                  activeRef.current = false;
                }, 1200);
              }, 2200);
            }, 1200);
          }, 4500);
        }, 2200);
      }, 1000);
    }, 1800);
  }, []);

  // Periodic automatic visitation (every 90 to 180 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        startAbductionMission();
      }
    }, 110000);

    // Also trigger on custom event from settings
    const handleSummon = () => {
      startAbductionMission();
    };
    window.addEventListener("berrymaster:summon-ufo", handleSummon);

    return () => {
      clearInterval(interval);
      window.removeEventListener("berrymaster:summon-ufo", handleSummon);
    };
  }, [startAbductionMission]);

  // Click on the UFO to make it spin or talk!
  const handleUFOClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClickCount((c) => c + 1);
    const msg = ALIEN_MESSAGES[Math.floor(Math.random() * ALIEN_MESSAGES.length)];
    setSpeech(msg);
    setTimeout(() => setSpeech(null), 3000);
  };

  if (state === "idle") return null;

  // Calculate current coordinates based on state
  let ufoLeft = `${pos.x}%`;
  let ufoTop = `${pos.y}%`;
  let transform = "translate(-50%, -50%)";
  let transitionDuration = "0.8s";

  if (state === "flyIn") {
    ufoLeft = "110%";
    ufoTop = "5%";
    transform = "translate(0, 0) rotate(-15deg)";
  } else if (state === "cruising") {
    transform = `translate(calc(-50% + ${cruiseOffset.x}px), calc(-50% + ${cruiseOffset.y}px)) rotate(${
      cruiseOffset.x > 0 ? 8 : -8
    }deg)`;
    transitionDuration = "4.5s";
  } else if (state === "returnTrip") {
    transform = "translate(-50%, -50%) rotate(0deg)";
    transitionDuration = "1.2s";
  } else if (state === "warpOut") {
    ufoLeft = "-30%";
    ufoTop = "-20%";
    transform = "translate(0, 0) scale(0.2) rotate(-35deg)";
    transitionDuration = "0.9s";
  }

  const isBeaming =
    state === "beamDown" ||
    state === "abducting" ||
    state === "returning";

  const isObjectInFlight =
    state === "abducting" || state === "returning";

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
      {/* Target Ground Area Marker & Object */}
      {state !== "flyIn" && state !== "warpOut" && (
        <div
          className="absolute transition-opacity duration-500"
          style={{
            left: `${pos.x}%`,
            top: `calc(${pos.y}% + 190px)`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Ground Holo-Reticule */}
          <div
            className={`
              relative flex flex-col items-center justify-center
              transition-all duration-700
              ${isBeaming ? "opacity-100 scale-100" : "opacity-0 scale-75"}
            `}
          >
            {/* Pulsing ground ring */}
            <div className="h-20 w-32 rounded-[50%] border-2 border-emerald-400/60 bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.5)] animate-pulse" />
            <span className="mt-1 text-[9px] font-mono font-bold tracking-widest text-emerald-400 bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
              TARGET: {target.name}
            </span>
          </div>

          {/* Abducted Item on ground before pickup or after return */}
          {(state === "beamDown" || state === "returning") && (
            <div
              className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                text-3xl transition-all duration-700
                ${
                  state === "returning"
                    ? "animate-bounce"
                    : "scale-100 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                }
              `}
            >
              {target.icon}
            </div>
          )}
        </div>
      )}

      {/* UFO SAUCER & TRACTOR BEAM CONTAINER */}
      <div
        className="absolute pointer-events-auto cursor-pointer"
        onClick={handleUFOClick}
        style={{
          left: ufoLeft,
          top: ufoTop,
          transform,
          transition: `all ${transitionDuration} cubic-bezier(0.25, 1, 0.5, 1)`,
        }}
      >
        {/* Alien Speech Bubble */}
        {speech && (
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-emerald-400 bg-slate-950/95 px-3 py-1.5 text-xs font-bold text-emerald-300 shadow-xl backdrop-blur-md animate-bounce z-50">
            {speech}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-r border-b border-emerald-400 bg-slate-950" />
          </div>
        )}

        {/* TRACTOR BEAM */}
        {isBeaming && (
          <div
            className={`
              absolute left-1/2 top-14 -translate-x-1/2
              w-44 h-52 pointer-events-none
              transition-opacity duration-500
              ${isBeaming ? "opacity-90" : "opacity-0"}
            `}
          >
            {/* Conical Light Beam SVG */}
            <svg
              viewBox="0 0 160 200"
              className="w-full h-full drop-shadow-[0_0_20px_rgba(16,185,129,0.7)]"
            >
              <defs>
                <linearGradient
                  id="tractorBeamGradient"
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <polygon
                points="70,0 90,0 155,200 5,200"
                fill="url(#tractorBeamGradient)"
              />
              {/* Internal scanning lines */}
              <line
                x1="20"
                y1="100"
                x2="140"
                y2="100"
                stroke="#6ee7b7"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="animate-pulse"
              />
              <line
                x1="35"
                y1="150"
                x2="125"
                y2="150"
                stroke="#6ee7b7"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
            </svg>

            {/* Levitating / Ascending Object */}
            {isObjectInFlight && (
              <div
                className={`
                  absolute left-1/2 -translate-x-1/2 text-3xl
                  drop-shadow-[0_0_16px_rgba(255,255,255,0.9)]
                  transition-all duration-1000 ease-in-out
                `}
                style={{
                  top: state === "abducting" ? "15%" : "85%",
                  transform: `translateX(-50%) rotate(${
                    clickCount * 180
                  }deg) scale(1.2)`,
                }}
              >
                {target.icon}
              </div>
            )}
          </div>
        )}

        {/* UFO SAUCER BODY */}
        <div
          className={`
            relative flex flex-col items-center
            transition-transform duration-300 hover:scale-110 active:scale-95
            ${clickCount > 0 ? "animate-spin" : ""}
          `}
          style={{
            animationDuration: clickCount > 0 ? "0.6s" : "undefined",
            animationIterationCount: 1,
          }}
        >
          {/* Glass Cockpit Dome with Little Alien */}
          <div className="relative -mb-3 h-10 w-16 rounded-t-full border border-teal-300/40 bg-gradient-to-b from-teal-200/40 via-emerald-400/20 to-transparent backdrop-blur-xs flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.5)]">
            <span className="text-sm select-none animate-pulse">👽</span>
          </div>

          {/* Saucer Hull Metallic Ring */}
          <div className="relative z-10 flex h-7 w-32 items-center justify-around rounded-[50%] border border-emerald-400/80 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_25px_rgba(16,185,129,0.5)] px-3">
            {/* Hull Lights (Alternating Colors) */}
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-ping" />
            <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse" />
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-ping" />
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-ping" />
          </div>

          {/* Bottom Tractor Beam Emitter Lens */}
          <div className="relative -mt-1.5 h-3.5 w-10 rounded-b-full border border-emerald-300 bg-emerald-400 shadow-[0_0_18px_#34d399] flex items-center justify-center">
            <div className="h-1 w-6 rounded-full bg-white animate-pulse" />
          </div>

          {/* Ambient Thruster Glow */}
          <div className="pointer-events-none absolute -bottom-4 h-6 w-20 rounded-full bg-emerald-500/30 blur-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}
