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
    <div className="flex h-screen bg-slate-950 text-white">

      <Sidebar
        isOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      <div className="flex flex-1 flex-col">

        <Header />

        <main className="flex-1 overflow-y-auto">

          <div className="min-h-full bg-slate-900/40 p-8">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}