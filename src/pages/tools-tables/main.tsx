import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ToolsTables from "./ToolsTables";
import "./index.css";
import { BrowserRouter} from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToolsTables />
    </BrowserRouter>
  </StrictMode>
);
