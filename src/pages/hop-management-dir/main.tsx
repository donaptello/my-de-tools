import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import HopManagementDir from "./HopManagementDir";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HopManagementDir />
    </BrowserRouter>
  </StrictMode>,
);
