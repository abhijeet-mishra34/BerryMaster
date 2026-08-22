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
      className="app-root relative flex h-screen overflow-hidden"
      style={{
        background: "var(--bg-app-gradient)",
      }}
    >
      {/* Farm background — sparkles and gentle ambient glow */}
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
              className="app-main min-h-full p-6 sm:p-8 page-enter"
              style={{
                background: "var(--bg-main)",
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