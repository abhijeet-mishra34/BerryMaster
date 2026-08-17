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
} from "lucide-react";

import berryMasterIcon from "../../assets/brand/berrymaster-icon.png";
import { CURRENT_APP_VERSION } from "../../services/updateService";

type SidebarProps = {
  isOpen: boolean;
  onToggleSidebar: () => void;
};

const menuItems = [
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
];

export default function Sidebar({
  isOpen,
  onToggleSidebar,
}: SidebarProps) {
  return (
    <aside
      className={`
        relative
        z-20
        flex
        shrink-0
        flex-col
        border-r
        border-slate-800/80
        light:border-slate-200
        bg-slate-950/90
        light:bg-white/95
        backdrop-blur-md
        transition-all
        duration-300
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      {/* Sidebar Header */}
      <div
        className={`
          flex
          h-16
          items-center
          border-b
          border-slate-800/80
          light:border-slate-200
          px-4
          ${isOpen ? "justify-between" : "justify-center"}
        `}
      >
        {isOpen ? (
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <img
                src={berryMasterIcon}
                alt="BerryMaster logo"
                className="h-9 w-9 object-contain drop-shadow-[0_2px_10px_rgba(225,29,72,0.45)] transition-transform duration-200 hover:scale-110"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950 light:ring-white" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight text-white light:text-slate-900 flex items-center gap-1.5">
                Berry<span className="text-emerald-400 light:text-emerald-600">Master</span>
              </h1>
              <span className="text-[10px] font-medium tracking-wider text-slate-400 light:text-slate-500 uppercase">
                PokeMMO Assistant
              </span>
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            <img
              src={berryMasterIcon}
              alt="BerryMaster logo"
              className="h-9 w-9 object-contain drop-shadow-[0_2px_10px_rgba(225,29,72,0.45)] transition-transform duration-200 hover:scale-110"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950 light:ring-white" />
          </div>
        )}

        <button
          type="button"
          onClick={onToggleSidebar}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            border
            border-slate-800
            light:border-slate-200
            bg-slate-900/60
            light:bg-slate-100
            text-slate-400
            light:text-slate-600
            transition-all
            duration-200
            hover:border-slate-700
            light:hover:border-slate-300
            hover:bg-slate-800
            light:hover:bg-slate-200
            hover:text-white
            light:hover:text-slate-900
            cursor-pointer
          "
          aria-label="Toggle sidebar"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-1 flex-col gap-2 p-3 overflow-y-auto">
        {menuItems.map((item) => {
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
                  py-3.5
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  ${isOpen ? "gap-3.5 px-3.5" : "justify-center px-2"}
                  ${
                    isActive
                      ? "bg-emerald-500/15 light:bg-emerald-50 text-emerald-300 light:text-emerald-800 font-semibold shadow-inner border border-emerald-500/20 light:border-emerald-200"
                      : "text-slate-400 light:text-slate-600 hover:bg-slate-800/60 light:hover:bg-slate-100 hover:text-slate-200 light:hover:text-slate-900"
                  }
                `
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                  )}

                  <IconComponent
                    className={`
                      h-5
                      w-5
                      shrink-0
                      transition-transform
                      duration-200
                      group-hover:scale-110
                      ${isActive ? "text-emerald-400 light:text-emerald-600" : "text-slate-400 light:text-slate-500 group-hover:text-slate-200 light:group-hover:text-slate-900"}
                    `}
                  />

                  {isOpen && (
                    <span className="truncate">{item.label}</span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      {isOpen && (
        <div className="p-3 border-t border-slate-800/80 light:border-slate-200">
          <div className="rounded-xl border border-emerald-500/20 light:border-emerald-200 bg-emerald-950/20 light:bg-emerald-50/70 p-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-200 light:text-slate-800">v{CURRENT_APP_VERSION} Ready</span>
              <span className="text-[10px] text-emerald-400/80 light:text-emerald-700">All systems online</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
