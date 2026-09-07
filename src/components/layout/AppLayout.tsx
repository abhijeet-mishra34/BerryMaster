import { useState, useEffect, useRef } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Cherry, Package, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FloatingLeaves from "../ambient/FloatingLeaves";
import UFOEasterEgg from "../ambient/UFOEasterEgg";
import FarmingBackground from "../background/FarmingBackground";
import ToastContainer from "../ui/Toast";
import FeedbackPromptBot from "../feedback/FeedbackPromptBot";
import MiniHUDOverlay from "../overlay/MiniHUDOverlay";
import { useAndroidBackHandler } from "../../hooks/useAndroidBackHandler";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHUDMode, setIsHUDMode] = useState(false);

  // Close mobile drawer on Android back gesture
  useAndroidBackHandler(mobileMenuOpen, () => setMobileMenuOpen(false));
  // Exit HUD mode on Android back gesture
  useAndroidBackHandler(isHUDMode, () => setIsHUDMode(false));

  const location = useLocation();

  const mainRef = useRef<HTMLElement>(null);
  const scrollPositionsRef = useRef<Record<string, number>>({});
  const currentPathRef = useRef(location.pathname);

  // Close mobile drawer and restore independent page scroll position on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);

    // Save scroll position for previous path
    if (mainRef.current && currentPathRef.current !== location.pathname) {
      scrollPositionsRef.current[currentPathRef.current] = mainRef.current.scrollTop;
    }

    currentPathRef.current = location.pathname;

    // Restore scroll position for current path (defaulting cleanly to 0 for fresh pages)
    const savedTop = scrollPositionsRef.current[location.pathname] ?? 0;
    if (mainRef.current) {
      mainRef.current.scrollTop = savedTop;
    }
  }, [location.pathname]);

  const handleMainScroll = () => {
    if (mainRef.current) {
      scrollPositionsRef.current[location.pathname] = mainRef.current.scrollTop;
    }
  };

  // Ctrl/Cmd + H to toggle HUD Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "h") {
        const tag = (document.activeElement?.tagName ?? "").toLowerCase();
        if (["input", "textarea", "select"].includes(tag)) return;
        e.preventDefault();
        setIsHUDMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function toggleSidebar() {
    setSidebarOpen((current) => !current);
  }

  return (
    <div
      className="app-root relative flex h-[100dvh] overflow-hidden"
      style={{
        background: "var(--bg-app-gradient)",
      }}
    >
      {/* Mini HUD Overlay Mode for PokeMMO */}
      {isHUDMode && <MiniHUDOverlay onClose={() => setIsHUDMode(false)} />}

      {/* Farm background — sparkles and gentle ambient glow */}
      <FarmingBackground />

      {/* Ambient leaves */}
      <FloatingLeaves />

      {/* UFO Easter Egg (occasional ambient visitor that borrows a sample and returns it) */}
      <UFOEasterEgg />

      {/* UI Shell */}
      <div
        className="relative z-10 flex h-full w-full md:p-3.5 lg:p-4 md:gap-3.5 lg:gap-4 overflow-hidden"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <Sidebar
          isOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          isMobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col rounded-none md:rounded-2xl border-0 md:border md:border-white/[0.08] light:md:border-slate-200/80 bg-slate-950/20 light:bg-white/40 backdrop-blur-md shadow-none md:shadow-2xl md:shadow-black/40 overflow-hidden">
          <Header
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
            onToggleHUD={() => setIsHUDMode((prev) => !prev)}
            isHUDActive={isHUDMode}
          />

          <main
            ref={mainRef}
            onScroll={handleMainScroll}
            className="flex-1 overflow-y-auto overscroll-y-contain"
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div
              key={location.pathname}
              className="app-main min-h-full p-3.5 sm:p-6 md:p-8 md:pb-8 page-enter"
              style={{
                paddingBottom: "calc(9.5rem + env(safe-area-inset-bottom, 0px))",
              }}
            >
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {/* ========================================================= */}
      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-30
          flex
          items-center
          justify-around
          border-t
          border-slate-800/80
          light:border-slate-200
          bg-slate-950/95
          light:bg-white/95
          px-2
          backdrop-blur-xl
          shadow-lg
          md:hidden
        "
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 8px)",
          height: "calc(4.25rem + max(env(safe-area-inset-bottom, 0px), 8px))",
        }}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `group flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-bold transition-colors ${
              isActive
                ? "text-emerald-400 light:text-emerald-600"
                : "text-slate-400 light:text-slate-500 hover:text-slate-200"
            }`
          }
        >
          <LayoutDashboard className="h-5 w-5 icon-sway-pop" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/characters"
          className={({ isActive }) =>
            `group flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-bold transition-colors ${
              isActive
                ? "text-emerald-400 light:text-emerald-600"
                : "text-slate-400 light:text-slate-500 hover:text-slate-200"
            }`
          }
        >
          <Users className="h-5 w-5 icon-sway-pop" />
          <span>Farmers</span>
        </NavLink>

        <NavLink
          to="/berries"
          className={({ isActive }) =>
            `group flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-bold transition-colors ${
              isActive
                ? "text-emerald-400 light:text-emerald-600"
                : "text-slate-400 light:text-slate-500 hover:text-slate-200"
            }`
          }
        >
          <Cherry className="h-5 w-5 icon-sway-pop" />
          <span>Berries</span>
        </NavLink>

        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `group flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-bold transition-colors ${
              isActive
                ? "text-emerald-400 light:text-emerald-600"
                : "text-slate-400 light:text-slate-500 hover:text-slate-200"
            }`
          }
        >
          <Package className="h-5 w-5 icon-sway-pop" />
          <span>Inventory</span>
        </NavLink>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="group flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-bold text-slate-400 light:text-slate-500 hover:text-slate-200 cursor-pointer"
        >
          <Menu className="h-5 w-5 icon-sway-pop" />
          <span>More</span>
        </button>
      </nav>

      {/* 6-Hour Feedback Prompt Bot */}
      <FeedbackPromptBot />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}