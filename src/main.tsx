import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import App from "./App";
import { CharacterProvider } from "./context/CharacterContext";
import { ActivityProvider } from "./context/ActivityContext";
import "./index.css";
import { SettingsProvider } from "./context/SettingsContext";
import { validateBerryDatabase } from "./utils/validation/validateBerryDatabase";
import { NotificationProvider } from "./context/NotificationContext";
validateBerryDatabase();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
     <ActivityProvider>
       <SettingsProvider>
       <CharacterProvider>
         <FavoritesProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </FavoritesProvider>
        </CharacterProvider>
        </SettingsProvider>
      </ActivityProvider>
    </BrowserRouter>
  </React.StrictMode>
);