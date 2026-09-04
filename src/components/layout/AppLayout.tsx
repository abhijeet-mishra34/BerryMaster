import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Cherry, Package, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FloatingLeaves from "../ambient/FloatingLeaves";
import UFOEasterEgg from "../ambient/UFOEasterEgg";
import FarmingBackground from "../background/FarmingBackground";
import ToastContainer from "../ui/Toast";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
          <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

          <main className="flex-1 overflow-y-auto">
            <div
              key={location.pathname}
              className="app-main min-h-full p-3.5 sm:p-6 md:p-8 md:pb-8 page-enter"
              style={{
                paddingBottom: "calc(6.5rem + env(safe-area-inset-bottom, 0px))",
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
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          height: "calc(4rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-bold transition-colors ${
              isActive
                ? "text-emerald-400 light:text-emerald-600"
                : "text-slate-400 light:text-slate-500 hover:text-slate-200"
            }`
          }
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/characters"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-bold transition-colors ${
              isActive
                ? "text-emerald-400 light:text-emerald-600"
                : "text-slate-400 light:text-slate-500 hover:text-slate-200"
            }`
          }
        >
          <Users className="h-5 w-5" />
          <span>Farmers</span>
        </NavLink>

        <NavLink
          to="/berries"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-bold transition-colors ${
              isActive
                ? "text-emerald-400 light:text-emerald-600"
                : "text-slate-400 light:text-slate-500 hover:text-slate-200"
            }`
          }
        >
          <Cherry className="h-5 w-5" />
          <span>Berries</span>
        </NavLink>

        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-bold transition-colors ${
              isActive
                ? "text-emerald-400 light:text-emerald-600"
                : "text-slate-400 light:text-slate-500 hover:text-slate-200"
            }`
          }
        >
          <Package className="h-5 w-5" />
          <span>Inventory</span>
        </NavLink>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center gap-1 flex-1 py-1 text-[10px] font-bold text-slate-400 light:text-slate-500 hover:text-slate-200 cursor-pointer"
        >
          <Menu className="h-5 w-5" />
          <span>More</span>
        </button>
      </nav>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}