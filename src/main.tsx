import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.scss";
import App from "./app/App.tsx";
import "./i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
