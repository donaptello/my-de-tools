import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import HopManagementDetail from "./HopManagementDetail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HopManagementDetail />
    </BrowserRouter>
  </StrictMode>,
);
