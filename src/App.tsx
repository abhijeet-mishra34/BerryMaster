import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import CharactersPage from "./pages/CharactersPage";
import BerriesPage from "./pages/BerriesPage";
import InventoryPage from "./pages/InventoryPage";
import CalendarPage from "./pages/CalendarPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import FeedbackPage from "./pages/FeedbackPage";
export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/berries" element={<BerriesPage />}/>
        <Route path="/settings" element={<SettingsPage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/feedback"element={<FeedbackPage />}/>
        <Route path="/inventory"element={<InventoryPage />}/>
        <Route path="/analytics"element={<AnalyticsPage />}/>
        <Route path="/calendar"element={<CalendarPage />}/>
      </Routes>
    </AppLayout>
  );
}