import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import FloatingLeaves from "../ambient/FloatingLeaves";

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
    <div
      className="
        relative
        flex
        h-screen
        overflow-hidden
        bg-slate-950
        text-white
      "
    >

      {/* =====================================
          Ambient Effects
      ===================================== */}

      <FloatingLeaves />


      {/* =====================================
          Application UI
      ===================================== */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          w-full
        "
      >

        <Sidebar
          isOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
        />

        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
          "
        >

          <Header />

          <main
            className="
              flex-1
              overflow-y-auto
            "
          >

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