import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import BerryTestPage from "./pages/BerryTestPage";
import DashboardPage from "./pages/DashboardPage";
import CharactersPage from "./pages/CharactersPage";
import InventoryPage from "./pages/InventoryPage";
import CalendarPage from "./pages/CalendarPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route
  path="/berries"
  element={<BerryTestPage />}
/>
      </Routes>
    </AppLayout>
  );
}