import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import ToolsTables from "./ToolsTables";
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToolsTables />
  </StrictMode>
);
