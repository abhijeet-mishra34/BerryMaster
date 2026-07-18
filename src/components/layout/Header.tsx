import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

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
    subtitle:
      "Manage your berry farming characters.",
  },

  "/berries": {
    title: "Berry Database",
    subtitle:
      "Browse and explore all available berries.",
  },

  "/inventory": {
    title: "Inventory",
    subtitle:
      "Track your berries, seeds, and farming resources.",
  },

  "/calendar": {
    title: "Calendar",
    subtitle:
      "Keep track of your upcoming farming activities.",
  },

  "/analytics": {
    title: "Analytics",
    subtitle:
      "Review your farming performance and progress.",
  },

  "/settings": {
    title: "Settings",
    subtitle:
      "Customize your BerryMaster experience.",
  },

  "/feedback": {
    title: "Feedback",
    subtitle:
      "Help us make BerryMaster better.",
  },

  "/about": {
    title: "About BerryMaster",
    subtitle:
      "Learn more about your berry farming companion.",
  },
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [
    isProfileMenuOpen,
    setIsProfileMenuOpen,
  ] = useState(false);

  const currentPage =
    pageInfo[location.pathname] ??
    pageInfo["/"];

  return (
    <header
      className="
        relative
        flex
        items-center
        justify-between
        border-b
        border-slate-800
        bg-slate-900
        px-8
        py-4
      "
    >

      {/* =====================================
          Header Title
      ===================================== */}

      <div>

        <h2 className="text-xl font-semibold">
          {currentPage.title}
        </h2>

        <p className="text-sm text-slate-400">
          {currentPage.subtitle}
        </p>

      </div>


      {/* =====================================
          Header Actions
      ===================================== */}

      <div className="flex items-center gap-4">

        {/* Notifications */}

        <NotificationBell />


        {/* Settings */}

        <button
          type="button"
          onClick={() =>
            navigate("/settings")
          }
          className="
            rounded-xl
            p-2
            text-2xl
            transition-all
            duration-200
            hover:scale-105
            hover:bg-slate-800
          "
          aria-label="Open settings"
        >
          ⚙️
        </button>


        {/* Profile */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setIsProfileMenuOpen(
                (current) => !current
              )
            }
            className="
              rounded-xl
              p-2
              text-2xl
              transition-all
              duration-200
              hover:scale-105
              hover:bg-slate-800
            "
            aria-label="Open profile menu"
          >
            👤
          </button>


          {/* Profile Menu */}

          {isProfileMenuOpen && (

            <div
              className="
                absolute
                right-0
                top-14
                z-50
                w-56
                rounded-2xl
                border
                border-slate-700
                bg-slate-900
                p-3
                shadow-2xl
                shadow-black/30
              "
            >

              <div
                className="
                  rounded-xl
                  bg-slate-800/60
                  px-4
                  py-3
                "
              >

                <p className="font-semibold text-white">
                  BerryMaster User
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Profile features coming soon
                </p>

              </div>


              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate("/settings");
                }}
                className="
                  mt-2
                  w-full
                  rounded-xl
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-slate-300
                  transition
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                ⚙️ Open Settings
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}