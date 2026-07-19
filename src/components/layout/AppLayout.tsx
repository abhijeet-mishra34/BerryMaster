import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({
  children,
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  function toggleSidebar() {
    setSidebarOpen((current) => !current);
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-slate-950 text-white">


      {/* =====================================
          Farming Environment Background
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >

        {/* Grassland atmosphere */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-emerald-950/40
            via-green-950/30
            to-slate-950
          "
        />


        {/* Soft horizon glow */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-1/2
            bg-gradient-to-t
            from-emerald-950/40
            via-green-950/10
            to-transparent
          "
        />


        {/* Wheat field */}

        <div className="wheat-field">

          {Array.from({ length: 24 }).map(
            (_, index) => (
              <span
                key={index}
                className="wheat-stalk"
                style={{
                  left: `${index * 4.5}%`,
                  animationDelay: `${index * 0.12}s`,
                }}
              >
                🌾
              </span>
            )
          )}

        </div>

      </div>


      {/* =====================================
          Application UI
      ===================================== */}

      <div className="relative z-10 flex h-full w-full">

        <Sidebar
          isOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
        />

        <div className="flex min-w-0 flex-1 flex-col">

          <Header />

          <main className="flex-1 overflow-y-auto">

            <div
              className="
                min-h-full
                bg-slate-900/50
                p-8
                backdrop-blur-[2px]
              "
            >
              {children}
            </div>

          </main>

        </div>

      </div>

    </div>
  );
}