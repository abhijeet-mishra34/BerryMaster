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
  "BEEP BOOP! BORROWING THIS COW FOR MOO-RESEARCH! 🐄🛸",
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
  | "flyIn" // Flying from random off-screen edge to pickup position
  | "beamDown" // Hovering over ground target, tractor beam turns on
  | "abducting" // Target lifts from ground smoothly up into UFO saucer
  | "cruisingOff" // Target safely absorbed, UFO flies across and off screen
  | "away" // Completely off-screen in space orbit
  | "returnFlyIn" // Flying back into the screen from a DIFFERENT random off-screen edge
  | "returning" // Lowering object down at the new random drop zone
  | "landed" // Object lands safely at new spot, beam powers down
  | "warpOut"; // UFO warps into hyperspace

interface Vec2 {
  x: number;
  y: number;
}

interface TrajectoryPoint {
  x: string;
  y: string;
  angle: number;
}

// Distance from UFO center to ground target (matches tractor beam top: 32px + 180px in-beam)
const GROUND_OFFSET_PX = 212;

function getRandomOffscreenPoint(excludeSide?: "left" | "right" | "top"): TrajectoryPoint {
  const sides: Array<"top" | "right" | "left" | "diagonal"> = ["top", "right", "left", "diagonal"];
  const validSides = excludeSide ? sides.filter((s) => s !== excludeSide) : sides;
  const pickedSide = validSides[Math.floor(Math.random() * validSides.length)];

  switch (pickedSide) {
    case "top":
      return {
        x: `${Math.round(15 + Math.random() * 70)}%`,
        y: "-20%",
        angle: Math.round((Math.random() - 0.5) * 24),
      };
    case "right":
      return {
        x: "120%",
        y: `${Math.round(8 + Math.random() * 55)}%`,
        angle: -16 - Math.round(Math.random() * 8),
      };
    case "left":
      return {
        x: "-20%",
        y: `${Math.round(8 + Math.random() * 55)}%`,
        angle: 16 + Math.round(Math.random() * 8),
      };
    case "diagonal":
    default:
      if (Math.random() > 0.5) {
        return { x: "115%", y: "-15%", angle: -20 };
      } else {
        return { x: "-15%", y: "-15%", angle: 20 };
      }
  }
}

function getRandomExitPoint(currentX: number): TrajectoryPoint {
  if (currentX < 50) {
    return {
      x: "125%",
      y: `${Math.round(5 + Math.random() * 45)}%`,
      angle: -15,
    };
  } else {
    return {
      x: "-25%",
      y: `${Math.round(5 + Math.random() * 45)}%`,
      angle: 15,
    };
  }
}

export default function UFOEasterEgg() {
  const [state, setState] = useState<UFOState>("idle");
  const [target, setTarget] = useState(ABDUCTION_TARGETS[0]);
  const [speech, setSpeech] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  // Dynamic UFO animation coordinates & styling
  const [ufoPos, setUfoPos] = useState<{ x: string; y: string }>({ x: "50%", y: "30%" });
  const [ufoTransform, setUfoTransform] = useState("translate(-50%, -50%) rotate(0deg)");
  const [ufoTransition, setUfoTransition] = useState("all 1.6s cubic-bezier(0.16, 1, 0.3, 1)");

  // Target positions on ground (% of viewport)
  const [pickupPos, setPickupPos] = useState<Vec2>({ x: 45, y: 30 });
  const [dropPos, setDropPos] = useState<Vec2>({ x: 45, y: 30 });

  const activeRef = useRef(false);

  const startAbductionMission = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;

    // Pick random target from farm items
    const randomTarget =
      ABDUCTION_TARGETS[Math.floor(Math.random() * ABDUCTION_TARGETS.length)];
    setTarget(randomTarget);
    setSpeech(null);

    // 1. Randomize pickup position widely across the farm screen (15% to 80% width, 18% to 55% height)
    const pX = Math.round(15 + Math.random() * 65);
    const pY = Math.round(18 + Math.random() * 37);
    const pickup: Vec2 = { x: pX, y: pY };

    // 2. Randomize completely distinct drop position for the return
    let dX = Math.round(15 + Math.random() * 65);
    let dY = Math.round(18 + Math.random() * 37);
    if (Math.abs(dX - pX) < 22 && Math.abs(dY - pY) < 18) {
      dX = pX > 50 ? pX - 32 : pX + 32;
      dY = pY > 35 ? pY - 20 : pY + 20;
    }
    const drop: Vec2 = { x: dX, y: dY };

    setPickupPos(pickup);
    setDropPos(drop);

    // 3. Random appearing entry location (from any random edge of the screen!)
    const spawnEntry = getRandomOffscreenPoint();

    // Place UFO at initial offscreen position without transition
    setUfoPos({ x: spawnEntry.x, y: spawnEntry.y });
    setUfoTransform(`translate(-50%, -50%) rotate(${spawnEntry.angle}deg)`);
    setUfoTransition("none");
    setState("flyIn");

    // 4. In next tick, fly smoothly into pickup location!
    const tFly = setTimeout(() => {
      setUfoPos({ x: `${pickup.x}%`, y: `${pickup.y}%` });
      setUfoTransform("translate(-50%, -50%) rotate(0deg)");
      setUfoTransition("all 1.6s cubic-bezier(0.16, 1, 0.3, 1)");
    }, 50);

    // 5. Arrived over target -> Beam Down (0.8s)
    const tBeam = setTimeout(() => {
      setState("beamDown");

      // 6. Abduct: Farm object rises seamlessly into UFO saucer (1.3s)
      const tAbduct = setTimeout(() => {
        setState("abducting");

        // 7. Object absorbed -> Beam shuts off, UFO cruises off screen to random exit point (1.6s)
        const tCruise = setTimeout(() => {
          setState("cruisingOff");
          const exitPoint = getRandomExitPoint(pickup.x);
          setUfoPos({ x: exitPoint.x, y: exitPoint.y });
          setUfoTransform(`translate(-50%, -50%) rotate(${exitPoint.angle}deg) scale(0.9)`);
          setUfoTransition("all 1.6s cubic-bezier(0.4, 0, 0.2, 1)");

          // 8. UFO stays away in deep orbit researching (4.5 seconds)
          const tAway = setTimeout(() => {
            setState("away");

            const tOrbit = setTimeout(() => {
              // 9. Pick a completely NEW, random re-entry point for coming back!
              const returnSpawn = getRandomOffscreenPoint(exitPoint.x === "125%" ? "right" : "left");

              // Place UFO at new return spawn offscreen instantly
              setUfoPos({ x: returnSpawn.x, y: returnSpawn.y });
              setUfoTransform(`translate(-50%, -50%) rotate(${returnSpawn.angle}deg)`);
              setUfoTransition("none");
              setState("returnFlyIn");

              // 10. Swoop into the new random drop location!
              const tReturnFly = setTimeout(() => {
                setUfoPos({ x: `${drop.x}%`, y: `${drop.y}%` });
                setUfoTransform("translate(-50%, -50%) rotate(0deg)");
                setUfoTransition("all 1.7s cubic-bezier(0.16, 1, 0.3, 1)");

                // 11. Lower object smoothly back down to the new ground coordinate (1.4s)
                const tLower = setTimeout(() => {
                  setState("returning");

                  // 12. Object lands safely on new ground spot with sparkles (1.4s)
                  const tLanded = setTimeout(() => {
                    setState("landed");

                    // 13. UFO warps out into hyperspace! (1.0s)
                    const tWarp = setTimeout(() => {
                      setState("warpOut");
                      const warpExit = getRandomOffscreenPoint();
                      setUfoPos({ x: warpExit.x, y: warpExit.y });
                      setUfoTransform(`translate(-50%, -50%) scale(0.15) rotate(${warpExit.angle * 2}deg)`);
                      setUfoTransition("all 0.9s cubic-bezier(0.55, 0.055, 0.675, 0.19)");

                      // 14. Reset to idle
                      const tReset = setTimeout(() => {
                        setState("idle");
                        activeRef.current = false;
                      }, 1000);

                      return () => clearTimeout(tReset);
                    }, 1400);

                    return () => clearTimeout(tWarp);
                  }, 1400);

                  return () => clearTimeout(tLanded);
                }, 1750);

                return () => clearTimeout(tLower);
              }, 50);

              return () => clearTimeout(tReturnFly);
            }, 4500); // Orbiting research time

            return () => clearTimeout(tOrbit);
          }, 1650);

          return () => clearTimeout(tAway);
        }, 1300);

        return () => clearTimeout(tCruise);
      }, 800);

      return () => clearTimeout(tAbduct);
    }, 1700);

    return () => {
      clearTimeout(tFly);
      clearTimeout(tBeam);
    };
  }, []);

  // Organic randomized visitation schedule (first visit in 15-30s, subsequent visits every 45-90s)
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const scheduleNextMission = (isFirst = false) => {
      const minDelay = isFirst ? 15000 : 45000;
      const maxDelay = isFirst ? 30000 : 90000;
      const randomDelay = Math.floor(minDelay + Math.random() * (maxDelay - minDelay));

      timerId = setTimeout(() => {
        startAbductionMission();
        scheduleNextMission(false);
      }, randomDelay);
    };

    scheduleNextMission(true);

    // Also trigger on custom summon event
    const handleSummon = () => {
      startAbductionMission();
    };
    window.addEventListener("berrymaster:summon-ufo", handleSummon);

    return () => {
      clearTimeout(timerId);
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

  const isBeaming =
    state === "beamDown" ||
    state === "abducting" ||
    state === "returning";

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
      {/* ================================================================= */}
      {/* 1. GROUND TARGET: Sits on ground BEFORE and AS the UFO arrives    */}
      {/* ================================================================= */}
      {(state === "flyIn" || state === "beamDown") && (
        <div
          className="absolute pointer-events-none flex flex-col items-center -translate-x-1/2 -translate-y-1/2 z-30"
          style={{
            left: `${pickupPos.x}%`,
            top: `calc(${pickupPos.y}% + ${GROUND_OFFSET_PX}px)`,
            transition: "opacity 0.2s ease",
          }}
        >
          <span className="text-3xl leading-none select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] animate-pulse">
            {target.icon}
          </span>
          <span className="h-2 w-8 mt-1 rounded-full bg-black/40 blur-xs border border-emerald-500/15" />
        </div>
      )}

      {/* ================================================================= */}
      {/* 2. LANDED TARGET: Bounces cheerfully after safe return drop-off   */}
      {/* ================================================================= */}
      {state === "landed" && (
        <div
          className="absolute pointer-events-none flex flex-col items-center -translate-x-1/2 -translate-y-1/2 z-30 animate-bounce"
          style={{
            left: `${dropPos.x}%`,
            top: `calc(${dropPos.y}% + ${GROUND_OFFSET_PX}px)`,
          }}
        >
          <span className="text-3xl leading-none select-none drop-shadow-[0_0_16px_rgba(16,185,129,0.95)]">
            {target.icon}
          </span>
          <span className="text-xs mt-0.5 text-emerald-400 font-bold drop-shadow-[0_0_8px_#34d399] animate-ping">
            ✨
          </span>
          <span className="h-2 w-8 mt-0.5 rounded-full bg-black/40 blur-xs border border-emerald-500/20" />
        </div>
      )}

      {/* ================================================================= */}
      {/* 3. UFO SAUCER & TRACTOR BEAM CONTAINER                           */}
      {/* ================================================================= */}
      <div
        className="absolute pointer-events-auto cursor-pointer"
        onClick={handleUFOClick}
        style={{
          left: ufoPos.x,
          top: ufoPos.y,
          transform: ufoTransform,
          transition: ufoTransition,
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
            className="absolute left-1/2 top-[32px] -translate-x-1/2 w-48 pointer-events-none transition-opacity duration-300 opacity-90"
            style={{ height: "190px" }}
          >
            {/* Soft Translucent Light Beam */}
            <svg
              viewBox="0 0 160 190"
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
                points="70,0 90,0 155,190 5,190"
                fill="url(#cleanTractorGradient)"
              />
              {/* Laser energy rings */}
              <ellipse
                cx="80"
                cy="95"
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
                cy="155"
                rx="55"
                ry="12"
                fill="none"
                stroke="#6ee7b7"
                strokeWidth="1"
                strokeDasharray="6 6"
                className="animate-pulse opacity-40"
              />
            </svg>

            {/* Farm Item In-Flight Animation: Lifting Up seamlessly into Saucer */}
            {state === "abducting" && (
              <div
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl leading-none select-none drop-shadow-[0_0_16px_rgba(255,255,255,0.95)]"
                style={{
                  animation: "ufoAbductLift 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                }}
              >
                <span className="inline-flex items-center justify-center leading-none text-center">
                  {target.icon}
                </span>
              </div>
            )}

            {/* Farm Item In-Flight Animation: Lowering Down seamlessly from Saucer to Ground */}
            {state === "returning" && (
              <div
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl leading-none select-none drop-shadow-[0_0_16px_rgba(255,255,255,0.95)]"
                style={{
                  animation: "ufoDropLower 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                }}
              >
                <span className="inline-flex items-center justify-center leading-none text-center">
                  {target.icon}
                </span>
              </div>
            )}
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
