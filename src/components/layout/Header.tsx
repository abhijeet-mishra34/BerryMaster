import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Settings, User, ChevronDown } from "lucide-react";

import NotificationBell from "../notifications/NotificationBell";

const pageInfo: Record<
  string,
  {
    title: string;
    subtitle: string;
  }
> = {
  "/": {
    title: "Dashboard",
    subtitle: "Welcome back! 🌿",
  },
  "/characters": {
    title: "Characters",
    subtitle: "Manage your berry farming characters.",
  },
  "/berries": {
    title: "Berry Database",
    subtitle: "Browse and explore all available berries.",
  },
  "/inventory": {
    title: "Inventory",
    subtitle: "Track your berries, seeds, and farming resources.",
  },
  "/calendar": {
    title: "Calendar",
    subtitle: "Keep track of your upcoming farming activities.",
  },
  "/analytics": {
    title: "Analytics",
    subtitle: "Review your farming performance and progress.",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Customize your BerryMaster experience.",
  },
  "/feedback": {
    title: "Feedback",
    subtitle: "Help us make BerryMaster better.",
  },
  "/about": {
    title: "About BerryMaster",
    subtitle: "Learn more about your berry farming companion.",
  },
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isProfileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isProfileMenuOpen]);

  const currentPage = pageInfo[location.pathname] ?? pageInfo["/"];

  return (
    <header
      className="
        relative
        z-10
        flex
        h-16
        items-center
        justify-between
        border-b
        border-slate-800/80
        light:border-slate-200
        bg-slate-950/80
        light:bg-white/90
        px-8
        backdrop-blur-md
      "
    >
      {/* Header Title */}
      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-bold text-white light:text-slate-900 tracking-tight">
          {currentPage.title}
        </h2>
        <p className="text-xs text-slate-400 light:text-slate-500">
          {currentPage.subtitle}
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications Bell */}
        <NotificationBell />

        {/* Settings Button */}
        <button
          type="button"
          onClick={() => navigate("/settings")}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
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
            hover:text-emerald-400
            cursor-pointer
          "
          aria-label="Open settings"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen((current) => !current)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-800
              light:border-slate-200
              bg-slate-900/60
              light:bg-slate-100
              px-3
              py-1.5
              text-slate-300
              light:text-slate-700
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
            aria-label="Open profile menu"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <User className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-semibold">Farmer</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 light:text-slate-500" />
          </button>

          {/* Profile Menu Dropdown */}
          {isProfileMenuOpen && (
            <div
              className="
                theme-modal
                absolute
                right-0
                top-12
                z-50
                w-60
                rounded-2xl
                p-3
                backdrop-blur-xl
                shadow-2xl
              "
            >
              <div className="rounded-xl bg-slate-800/50 light:bg-slate-100 p-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                    BM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white light:text-slate-900">BerryMaster User</p>
                    <p className="text-[11px] text-slate-400 light:text-slate-500">PokeMMO Trainer</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}