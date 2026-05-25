import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GrainProvider } from "@flodesk/grain";
import "./styles/global.css";
import { App } from "./app/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GrainProvider>
      <App />
    </GrainProvider>
  </StrictMode>,
);
