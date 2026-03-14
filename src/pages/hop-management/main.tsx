import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import HopManagement from "./HopManagement";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HopManagement />
    </BrowserRouter>
  </StrictMode>,
);
