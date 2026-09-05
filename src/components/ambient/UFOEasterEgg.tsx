import { useState, useEffect, useRef, useCallback } from "react";

// Farm targets the UFO borrows for research: haybales, cows, sheeps, goats, dogs, farmer tools
const ABDUCTION_TARGETS = [
  { name: "Golden Haybale", icon: "🌾" },
  { name: "Farm Cow", icon: "🐄" },
  { name: "Spotted Dairy Cow", icon: "🐮" },
  { name: "Fluffy Sheep", icon: "🐑" },
  { name: "Farm Ram", icon: "🐏" },
  { name: "Farm Goat", icon: "🐐" },
  { name: "Loyal Farm Dog", icon: "🐕" },
  { name: "Playful Farm Puppy", icon: "🐶" },
  { name: "Farm Tractor", icon: "🚜" },
  { name: "Watering Bucket & Can", icon: "🪣" },
  { name: "Farmer's Hoe & Pick", icon: "⛏️" },
  { name: "Farmer's Tool Box", icon: "🧰" },
  { name: "Woodcutter's Ax", icon: "🪓" },
];

const ALIEN_MESSAGES = [
  "BEEP BOOP! BORROWING THIS COW FOR MOO-SEARCH! 🐄🛸",
  "ANALYZING POKEMMO HAY NUTRITION! 🌾",
  "WHO IS A GOOD FARM DOGGO? THE ALIENS AGREE! 🐕",
  "UPGRADING YOUR FARMING TOOLS WITH ALIEN TECH! 🧰⚡",
  "CALCULATING MAXIMUM FLUFFINESS ON THIS SHEEP! 🐑",
  "GOAT EXPERIMENT COMPLETE! RETURNING TO A RANDOM COORDINATE! 🐐",
  "DROPPING OFF YOUR TOOLS AT A BRAND NEW PLOT! 🪣✨",
  "DON'T MIND US, MASTER FARMER! 🌾",
];

type UFOState =
  | "idle" // Off-screen, waiting
  | "flyIn" // Flying to random pickup position
  | "beamDown" // Hovering, tractor beam turns on
  | "abducting" // Object lifts from ground into UFO
  | "cruisingOff" // UFO flies across and off the screen
  | "away" // Completely off-screen in space for 5-8 seconds
  | "returnFlyIn" // Flying back into the screen to a NEW random drop zone
  | "returning" // Lowering object down at the new random drop zone
  | "landed" // Object lands safely at new spot, beam powers down
  | "warpOut"; // UFO warps into hyperspace

interface Vec2 {
  x: number;
  y: number;
}

export default function UFOEasterEgg() {
  const [state, setState] = useState<UFOState>("idle");
  const [target, setTarget] = useState(ABDUCTION_TARGETS[0]);
  const [speech, setSpeech] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  // Position coordinates (% of viewport)
  const [currentPos, setCurrentPos] = useState<Vec2>({ x: 45, y: 30 });

  // Entry & Exit directions for variety
  const [entrySide, setEntrySide] = useState<"top-right" | "top-left">("top-right");
  const [exitSide, setExitSide] = useState<"left" | "right">("left");

  const activeRef = useRef(false);

  const startAbductionMission = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;

    // Pick random target from farm items (haybale, cow, sheep, goat, dog, tools)
    const randomTarget =
      ABDUCTION_TARGETS[Math.floor(Math.random() * ABDUCTION_TARGETS.length)];
    setTarget(randomTarget);
    setSpeech(null);

    // Randomize initial pickup position (15% to 80% screen width, 15% to 45% screen height)
    const pX = Math.round(15 + Math.random() * 65);
    const pY = Math.round(15 + Math.random() * 32);
    const pickup: Vec2 = { x: pX, y: pY };

    // Randomize completely distinct drop position for the return
    let dX = Math.round(15 + Math.random() * 65);
    const dY = Math.round(15 + Math.random() * 32);
    // Ensure drop position is noticeably different from pickup
    if (Math.abs(dX - pX) < 20) {
      dX = pX > 50 ? pX - 30 : pX + 30;
    }
    const drop: Vec2 = { x: dX, y: dY };

    setCurrentPos(pickup);

    // Randomize flight angles
    const entry = Math.random() > 0.5 ? "top-right" : "top-left";
    const exit = entry === "top-right" ? "left" : "right";
    setEntrySide(entry);
    setExitSide(exit);

    // Step 1: Fly In to random pickup spot (1.6s)
    setState("flyIn");

    // Step 2: Hover & Beam Down (0.8s)
    setTimeout(() => {
      setState("beamDown");

      // Step 3: Farm object rises from ground into UFO (1.4s)
      setTimeout(() => {
        setState("abducting");

        // Step 4: UFO absorbs item, beam shuts off, flies across and OFF screen (1.4s)
        setTimeout(() => {
          setState("cruisingOff");

          // Step 5: UFO stays away off-screen in orbit (5-7 seconds)
          setTimeout(() => {
            setState("away");

            setTimeout(() => {
              // Update target position to the NEW random drop location!
              setCurrentPos(drop);

              // Step 6: UFO returns from deep sky to the NEW random drop coordinate
              setState("returnFlyIn");

              // Step 7: Beam turns back on & lowers object to this new location
              setTimeout(() => {
                setState("returning");

                // Step 8: Object lands safely on the new ground spot with sparkles
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
            }, 6000); // Orbiting research time
          }, 1800);
        }, 1400);
      }, 800);
    }, 1600);
  }, []);

  // Periodic automatic visitation (every 2 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.2) {
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
    setTimeout(() => setSpeech(null), 3500);
  };

  if (state === "idle" || state === "away") return null;

  // Determine UFO Position & Trajectory Animation
  let ufoLeft = `${currentPos.x}%`;
  let ufoTop = `${currentPos.y}%`;
  let transform = "translate(-50%, -50%)";
  let transitionDuration = "0.8s";

  if (state === "flyIn") {
    // Coming from off-screen top
    ufoLeft = entrySide === "top-right" ? "115%" : "-15%";
    ufoTop = "6%";
    transform = entrySide === "top-right" ? "translate(0, 0) rotate(-15deg)" : "translate(0, 0) rotate(15deg)";
    transitionDuration = "1.6s";
  } else if (state === "cruisingOff") {
    // Flying completely across and OFF screen
    ufoLeft = exitSide === "left" ? "-25%" : "125%";
    ufoTop = "12%";
    transform = exitSide === "left" ? "translate(0, 0) rotate(18deg) scale(0.9)" : "translate(0, 0) rotate(-18deg) scale(0.9)";
    transitionDuration = "1.8s";
  } else if (state === "returnFlyIn") {
    // Returning from sky into NEW random drop location
    ufoLeft = `${currentPos.x}%`;
    ufoTop = `${currentPos.y}%`;
    transform = "translate(-50%, -50%) rotate(0deg)";
    transitionDuration = "1.6s";
  } else if (state === "warpOut") {
    // Accelerating into hyperspace
    ufoLeft = entrySide === "top-right" ? "-25%" : "125%";
    ufoTop = "-25%";
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

        {/* TRACTOR BEAM */}
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
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#10b981" stopOpacity="0.4" />
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

            {/* Farm Item in Transit inside Tractor Beam */}
            {(state === "beamDown" || state === "abducting" || state === "returning") && (
              <div
                className="absolute left-1/2 w-16 h-16 flex items-center justify-center text-3xl select-none drop-shadow-[0_0_16px_rgba(255,255,255,0.95)] pointer-events-none"
                style={{
                  top: state === "abducting" ? "8%" : "72%",
                  transform: `translateX(-50%) scale(${
                    state === "abducting" ? 0.85 : 1.15
                  }) rotate(${clickCount * 180}deg)`,
                  transition:
                    state === "abducting" || state === "returning"
                      ? "all 1.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      : "none",
                }}
              >
                <span className="inline-flex items-center justify-center leading-none text-center">
                  {target.icon}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Landed item bounce at new random drop coordinate */}
        {state === "landed" && (
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[210px] pointer-events-none flex flex-col items-center justify-center animate-bounce"
          >
            <div className="w-16 h-16 flex items-center justify-center">
              <span className="inline-flex items-center justify-center text-3xl leading-none drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]">
                {target.icon}
              </span>
            </div>
            <span className="text-xs -mt-2 text-emerald-400 font-bold drop-shadow-[0_0_8px_#34d399] animate-ping">
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
            <span className="inline-flex items-center justify-center text-sm leading-none select-none animate-pulse">👽</span>
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
