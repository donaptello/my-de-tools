import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Connection from "./Connection";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Connection />
    </BrowserRouter>
  </StrictMode>
);
