import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CharacterProvider } from "./context/CharacterContext";

import "./index.css";
import { validateBerryDatabase } from "./utils/validation/validateBerryDatabase";
import { NotificationProvider } from "./context/NotificationContext";
validateBerryDatabase();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CharacterProvider>
        <NotificationProvider>
         <App />
        </NotificationProvider>
      </CharacterProvider>
    </BrowserRouter>
  </React.StrictMode>
);