import { useState, useEffect, useRef, useCallback } from "react";

// Funny objects the UFO borrows for research
const ABDUCTION_TARGETS = [
  { name: "Leppa Berry", icon: "🍒" },
  { name: "Farm Miltank", icon: "🐄" },
  { name: "Golden Magikarp", icon: "🐟" },
  { name: "Oran Berry", icon: "🫐" },
  { name: "Sprout Pot", icon: "🌱" },
  { name: "Psyduck", icon: "🦆" },
];

const ALIEN_MESSAGES = [
  "BEEP BOOP! BORROWING THIS FOR SCIENCE! 🛸",
  "INVESTIGATING POKEMMO SOIL QUALITY! 🌱",
  "RETURNING IN 7 SECONDS! ⏳",
  "DON'T MIND US, MASTER FARMER! 🍒",
  "TASTES LIKE SWEET LEPPA! 😋",
];

type UFOState =
  | "idle" // Off-screen, waiting
  | "flyIn" // Flying to target position
  | "beamDown" // Hovering, tractor beam turns on
  | "abducting" // Object lifts from ground into UFO
  | "cruisingOff" // UFO flies across and off the screen
  | "away" // Completely off-screen for 5-10 seconds
  | "returnFlyIn" // Flying back into the screen to drop zone
  | "returning" // Lowering object back down to original place
  | "landed" // Object lands safely, beam powers down
  | "warpOut"; // UFO warps into hyperspace

export default function UFOEasterEgg() {
  const [state, setState] = useState<UFOState>("idle");
  const [target, setTarget] = useState(ABDUCTION_TARGETS[0]);
  const [speech, setSpeech] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  // Position coordinates (% of viewport)
  const [pos, setPos] = useState({ x: 50, y: 32 });
  const activeRef = useRef(false);

  const startAbductionMission = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;

    // Pick random target
    const randomTarget =
      ABDUCTION_TARGETS[
        Math.floor(Math.random() * ABDUCTION_TARGETS.length)
      ];
    setTarget(randomTarget);
    setSpeech(null);

    // Pick a safe visible sky location
    const targetX = 30 + Math.random() * 40;
    const targetY = 20 + Math.random() * 25;
    setPos({ x: targetX, y: targetY });

    // Step 1: Fly In (takes 1.6s)
    setState("flyIn");

    // Step 2: Hover & Beam Down (takes 0.8s)
    setTimeout(() => {
      setState("beamDown");

      // Step 3: Object rises into UFO (takes 1.4s)
      setTimeout(() => {
        setState("abducting");

        // Step 4: UFO absorbs item, beam shuts off, UFO flies across and OFF screen
        setTimeout(() => {
          setState("cruisingOff");

          // Step 5: UFO stays away off-screen for 7 seconds (5-10s requirement)
          setTimeout(() => {
            setState("away");

            setTimeout(() => {
              // Step 6: UFO returns from across the screen back to original spot
              setState("returnFlyIn");

              // Step 7: Beam turns back on & lowers object to original place
              setTimeout(() => {
                setState("returning");

                // Step 8: Object lands safely on original place with sparkle
                setTimeout(() => {
                  setState("landed");

                  // Step 9: UFO warps out into hyperspace
                  setTimeout(() => {
                    setState("warpOut");

                    // Step 10: Reset to idle
                    setTimeout(() => {
                      setState("idle");
                      activeRef.current = false;
                    }, 1200);
                  }, 1800);
                }, 1400);
              }, 1600);
            }, 7000); // Away for 7 seconds!
          }, 1800);
        }, 1400);
      }, 800);
    }, 1600);
  }, []);

  // Periodic automatic visitation (every 2 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.25) {
        startAbductionMission();
      }
    }, 120000);

    // Also trigger on custom summon event
    const handleSummon = () => {
      startAbductionMission();
    };
    window.addEventListener("berrymaster:summon-ufo", handleSummon);

    return () => {
      clearInterval(interval);
      window.removeEventListener("berrymaster:summon-ufo", handleSummon);
    };
  }, [startAbductionMission]);

  // Click on the UFO to make it spin or talk
  const handleUFOClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClickCount((c) => c + 1);
    const msg =
      ALIEN_MESSAGES[Math.floor(Math.random() * ALIEN_MESSAGES.length)];
    setSpeech(msg);
    setTimeout(() => setSpeech(null), 3000);
  };

  if (state === "idle" || state === "away") return null;

  // Determine UFO Position & Animation
  let ufoLeft = `${pos.x}%`;
  let ufoTop = `${pos.y}%`;
  let transform = "translate(-50%, -50%)";
  let transitionDuration = "0.8s";

  if (state === "flyIn") {
    // Coming from off-screen top right
    ufoLeft = "115%";
    ufoTop = "8%";
    transform = "translate(0, 0) rotate(-15deg)";
    transitionDuration = "1.6s";
  } else if (state === "cruisingOff") {
    // Flying completely across and OFF the left screen
    ufoLeft = "-25%";
    ufoTop = "15%";
    transform = "translate(0, 0) rotate(18deg) scale(0.9)";
    transitionDuration = "1.8s";
  } else if (state === "returnFlyIn") {
    // Returning from the left sky back to exact position
    ufoLeft = `${pos.x}%`;
    ufoTop = `${pos.y}%`;
    transform = "translate(-50%, -50%) rotate(0deg)";
    transitionDuration = "1.6s";
  } else if (state === "warpOut") {
    // Accelerating off into top-right hyperspace
    ufoLeft = "120%";
    ufoTop = "-20%";
    transform = "translate(0, 0) scale(0.2) rotate(-35deg)";
    transitionDuration = "0.9s";
  }

  const isBeaming =
    state === "beamDown" ||
    state === "abducting" ||
    state === "returning";

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
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

        {/* TRACTOR BEAM (NON-OVERLAYING CONICAL LIGHT) */}
        {isBeaming && (
          <div
            className="absolute left-1/2 top-12 -translate-x-1/2 w-48 h-56 pointer-events-none transition-opacity duration-300 opacity-90"
          >
            {/* Soft Translucent Light Beam */}
            <svg
              viewBox="0 0 160 200"
              className="w-full h-full drop-shadow-[0_0_24px_rgba(16,185,129,0.7)]"
            >
              <defs>
                <linearGradient
                  id="cleanTractorGradient"
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polygon
                points="70,0 90,0 155,200 5,200"
                fill="url(#cleanTractorGradient)"
              />
              {/* Laser energy rings */}
              <ellipse
                cx="80"
                cy="100"
                rx="35"
                ry="8"
                fill="none"
                stroke="#6ee7b7"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="animate-pulse opacity-60"
              />
              <ellipse
                cx="80"
                cy="160"
                rx="55"
                ry="12"
                fill="none"
                stroke="#6ee7b7"
                strokeWidth="1"
                strokeDasharray="6 6"
                className="animate-pulse opacity-40"
              />
            </svg>

            {/* Object in transit inside the beam */}
            {(state === "abducting" || state === "returning") && (
              <div
                className={`
                  absolute left-1/2 -translate-x-1/2 text-3xl
                  drop-shadow-[0_0_16px_rgba(255,255,255,0.95)]
                  transition-all duration-1000 ease-in-out
                `}
                style={{
                  top: state === "abducting" ? "10%" : "82%",
                  transform: `translateX(-50%) scale(${
                    state === "abducting" ? 0.9 : 1.2
                  }) rotate(${clickCount * 180}deg)`,
                }}
              >
                {target.icon}
              </div>
            )}
          </div>
        )}

        {/* Landed item bounce on ground before fading out */}
        {state === "landed" && (
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[220px] pointer-events-none flex flex-col items-center animate-bounce"
          >
            <span className="text-3xl drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]">
              {target.icon}
            </span>
            <span className="text-xs -mt-1 text-emerald-400 font-bold drop-shadow-[0_0_8px_#34d399] animate-ping">
              ✨
            </span>
          </div>
        )}

        {/* UFO SAUCER CRAFT */}
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
