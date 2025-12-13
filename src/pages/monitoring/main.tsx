import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Monitoring from "./Monitoring";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Monitoring />
    </BrowserRouter>
  </StrictMode>
);
