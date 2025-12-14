import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/main/Routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>
);
