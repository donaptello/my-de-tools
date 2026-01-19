import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MonitoringConfiguration from "./MonitoringConfig";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MonitoringConfiguration />
    </BrowserRouter>
  </StrictMode>
);
