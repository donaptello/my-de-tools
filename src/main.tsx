import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ToolsTables from './pages/tools-tables/ToolsTables.tsx'
import Monitoring from './pages/monitoring/Monitoring.tsx'
import Connection from './pages/connections/Connection.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/tools" element={<ToolsTables />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/monitoring" element={<Monitoring />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
