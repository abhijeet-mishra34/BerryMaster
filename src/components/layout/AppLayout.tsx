import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FloatingLeaves from "../ambient/FloatingLeaves";
import FarmingBackground from "../background/FarmingBackground";
import ToastContainer from "../ui/Toast";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  function toggleSidebar() {
    setSidebarOpen((current) => !current);
  }

  return (
    <div
      className="relative flex h-screen overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(16,185,129,0.07) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(14,165,233,0.05) 0%, transparent 50%), #080e1a",
      }}
    >
      {/* Farm background — grassy hills + wheat */}
      <FarmingBackground />

      {/* Ambient leaves */}
      <FloatingLeaves />

      {/* UI Shell */}
      <div className="relative z-10 flex h-full w-full">
        <Sidebar isOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="flex-1 overflow-y-auto">
            <div
              key={location.pathname}
              className="min-h-full p-6 sm:p-8 page-enter"
              style={{
                background: "rgba(8,14,26,0.4)",
              }}
            >
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}