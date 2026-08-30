import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Cherry,
  Package,
  Calendar,
  LineChart,
  Settings,
  MessageSquareHeart,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Radio,
} from "lucide-react";

import berryMasterIcon from "../../assets/brand/berrymaster-icon.png";
import { CURRENT_APP_VERSION } from "../../services/updateService";

type SidebarProps = {
  isOpen: boolean;
  onToggleSidebar: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
};

const menuGroups = [
  {
    title: "Farming",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
      },
      {
        label: "Characters",
        icon: Users,
        path: "/characters",
      },
      {
        label: "Berries",
        icon: Cherry,
        path: "/berries",
      },
      {
        label: "Inventory",
        icon: Package,
        path: "/inventory",
      },
      {
        label: "Calendar",
        icon: Calendar,
        path: "/calendar",
      },
    ],
  },
  {
    title: "System & Tools",
    items: [
      {
        label: "Analytics",
        icon: LineChart,
        path: "/analytics",
      },
      {
        label: "Settings",
        icon: Settings,
        path: "/settings",
      },
      {
        label: "Feedback",
        icon: MessageSquareHeart,
        path: "/feedback",
      },
      {
        label: "About Us",
        icon: Info,
        path: "/about",
      },
    ],
  },
];

export default function Sidebar({
  isOpen,
  onToggleSidebar,
  isMobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  return (
    <>
      {/* ========================================================= */}
      {/* MOBILE DRAWER OVERLAY BACKDROP */}
      {/* ========================================================= */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* ========================================================= */}
      {/* MOBILE SLIDE-IN DRAWER */}
      {/* ========================================================= */}
      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          w-76
          max-w-[85vw]
          flex-col
          border-r
          border-slate-800/80
          light:border-slate-200
          bg-slate-950/95
          light:bg-white/95
          backdrop-blur-2xl
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          md:hidden
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800/80 light:border-slate-200 px-5">
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center">
              <img
                src={berryMasterIcon}
                alt="BerryMaster logo"
                className="h-10 w-10 object-contain drop-shadow-[0_2px_10px_rgba(225,29,72,0.45)]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-slate-950 light:ring-white" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-lg font-black tracking-tight text-white light:text-slate-900 flex items-center gap-1">
                Berry<span className="text-emerald-400 light:text-emerald-600">Master</span>
              </h1>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 light:text-slate-500 uppercase">
                PokeMMO Assistant
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-800
              light:border-slate-200
              bg-slate-900/80
              light:bg-slate-100
              text-slate-400
              light:text-slate-600
              transition-all
              hover:bg-slate-800
              hover:text-white
              active:scale-95
              cursor-pointer
            "
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-1 flex-col gap-5 p-4 overflow-y-auto">
          {menuGroups.map((group) => (
            <div key={group.title} className="space-y-1.5">
              <p className="px-3 pb-1 text-[11px] font-black uppercase tracking-widest text-slate-500 light:text-slate-400">
                {group.title}
              </p>
              <div className="space-y-1.5">
                {group.items.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `
                          group
                          relative
                          flex
                          items-center
                          gap-4
                          rounded-xl
                          px-4
                          py-3.5
                          text-sm
                          font-extrabold
                          transition-all
                          duration-200
                          ${
                            isActive
                              ? "bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-transparent text-emerald-300 light:text-emerald-700 shadow-inner border border-emerald-500/30 light:border-emerald-300"
                              : "text-slate-300 light:text-slate-700 hover:bg-slate-900/80 light:hover:bg-slate-100 hover:text-white light:hover:text-slate-950"
                          }
                        `
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                          )}

                          <IconComponent
                            className={`
                              h-5.5
                              w-5.5
                              shrink-0
                              transition-all
                              duration-200
                              ${isActive ? "text-emerald-400 light:text-emerald-600 scale-110" : "text-slate-400 light:text-slate-500 group-hover:text-emerald-400"}
                            `}
                          />

                          <span className="truncate">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Mobile Drawer Footer */}
        <div className="p-4 border-t border-slate-800/80 light:border-slate-200">
          <div className="rounded-xl border border-emerald-500/20 light:border-emerald-200 bg-emerald-950/20 light:bg-emerald-50/70 p-3.5 flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-200 light:text-slate-800">v{CURRENT_APP_VERSION} Mobile</span>
              <span className="text-[10px] text-emerald-400 light:text-emerald-700 font-semibold">Companion Live</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* DESKTOP SIDEBAR (DETACHED FLOATING ISLAND) */}
      {/* ========================================================= */}
      <aside
        className={`
          relative
          z-20
          hidden
          md:flex
          shrink-0
          flex-col
          rounded-2xl
          border
          border-slate-800/80
          light:border-slate-200/90
          bg-slate-950/85
          light:bg-white/95
          backdrop-blur-xl
          shadow-2xl
          shadow-black/40
          transition-all
          duration-300
          overflow-hidden
          ${isOpen ? "w-68" : "w-22"}
        `}
      >
        {/* Desktop Sidebar Header */}
        <div
          className={`
            flex
            h-18
            shrink-0
            items-center
            border-b
            border-slate-800/80
            light:border-slate-200
            px-4
            ${isOpen ? "justify-between" : "justify-center"}
          `}
        >
          {isOpen ? (
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative flex items-center justify-center shrink-0">
                <img
                  src={berryMasterIcon}
                  alt="BerryMaster logo"
                  className="h-10 w-10 object-contain drop-shadow-[0_2px_12px_rgba(225,29,72,0.5)] transition-transform duration-300 hover:scale-115 hover:rotate-3"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-slate-950 light:ring-white shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>

              <div className="flex flex-col min-w-0">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white light:text-slate-900 flex items-center gap-1 truncate">
                  Berry<span className="text-emerald-400 light:text-emerald-600">Master</span>
                </h1>
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 light:text-slate-500 uppercase truncate">
                  PokeMMO Assistant
                </span>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <img
                src={berryMasterIcon}
                alt="BerryMaster logo"
                className="h-10 w-10 object-contain drop-shadow-[0_2px_12px_rgba(225,29,72,0.5)] transition-transform duration-300 hover:scale-115"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-slate-950 light:ring-white shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
          )}

          {isOpen && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-800
                light:border-slate-200
                bg-slate-900/70
                light:bg-slate-100
                text-slate-400
                light:text-slate-600
                transition-all
                duration-200
                hover:border-emerald-400/50
                hover:bg-slate-800
                hover:text-emerald-400
                hover:scale-105
                hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]
                active:scale-95
                cursor-pointer
              "
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
            >
              <ChevronLeft className="h-5 w-5 transition-transform duration-200" />
            </button>
          )}
        </div>

        {/* Collapsed Expand Button */}
        {!isOpen && (
          <div className="flex justify-center pt-3 pb-2 border-b border-slate-800/50">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-slate-800
                light:border-slate-200
                bg-slate-900/70
                light:bg-slate-100
                text-slate-400
                light:text-slate-600
                transition-all
                duration-200
                hover:border-emerald-400/50
                hover:bg-slate-800
                hover:text-emerald-400
                hover:scale-110
                hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]
                active:scale-95
                cursor-pointer
              "
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Desktop Navigation Links (Grouped with BIGGER buttons and rich hover animation) */}
        <nav className="flex flex-1 flex-col gap-5 p-3.5 overflow-y-auto overflow-x-hidden">
          {menuGroups.map((group) => (
            <div key={group.title} className="space-y-1.5">
              {isOpen && (
                <p className="px-3 pb-1 text-[10px] font-black uppercase tracking-widest text-slate-500 light:text-slate-400">
                  {group.title}
                </p>
              )}
              <div className="space-y-1.5">
                {group.items.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      title={!isOpen ? item.label : undefined}
                      className={({ isActive }) =>
                        `
                          group
                          relative
                          flex
                          items-center
                          rounded-xl
                          transition-all
                          duration-200
                          cursor-pointer
                          ${
                            isOpen
                              ? "py-3 px-3.5 gap-3.5 text-sm font-extrabold"
                              : "h-12 w-12 mx-auto justify-center"
                          }
                          ${
                            isActive
                              ? "bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-transparent text-emerald-300 light:text-emerald-700 shadow-inner border border-emerald-500/35 light:border-emerald-300 font-black"
                              : "border border-transparent text-slate-300 light:text-slate-700 hover:bg-slate-900/80 light:hover:bg-slate-100 hover:border-slate-800 light:hover:border-slate-200 hover:text-white light:hover:text-slate-950 hover:translate-x-1.5 hover:shadow-md hover:shadow-black/20"
                          }
                        `
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" />
                          )}

                          <IconComponent
                            className={`
                              h-5.5
                              w-5.5
                              shrink-0
                              transition-all
                              duration-200
                              group-hover:scale-120
                              group-hover:rotate-6
                              ${
                                isActive
                                  ? "text-emerald-400 light:text-emerald-600 drop-shadow-[0_0_8px_rgba(52,211,153,0.7)] scale-110"
                                  : "text-slate-400 light:text-slate-500 group-hover:text-emerald-400 light:group-hover:text-emerald-600 group-hover:drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]"
                              }
                            `}
                          />

                          {isOpen && (
                            <span className="truncate tracking-wide">{item.label}</span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Desktop Sidebar Footer */}
        {isOpen ? (
          <div className="p-3.5 border-t border-slate-800/80 light:border-slate-200">
            <div className="rounded-xl border border-emerald-500/25 light:border-emerald-200 bg-emerald-950/20 light:bg-emerald-50/70 p-3.5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-200 light:text-slate-800">v{CURRENT_APP_VERSION}</span>
                  <span className="text-[10px] text-emerald-400/90 light:text-emerald-700 font-bold">PokéMMO Ready</span>
                </div>
              </div>
              <Sparkles className="h-4 w-4 text-emerald-400/80 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="p-3 border-t border-slate-800/80 light:border-slate-200 flex justify-center">
            <span className="relative flex h-2.5 w-2.5" title="v1.0.0 Online">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </span>
          </div>
        )}
      </aside>
    </>
  );
}
