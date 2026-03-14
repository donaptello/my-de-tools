import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout";
import App from "../../App";
import ToolsTables from "../../pages/tools-tables/ToolsTables";
import Connection from "../../pages/connections/Connection";
import Monitoring from "../../pages/monitoring/Monitoring";
import MonitoringDetail from "../../pages/monitoring-detail/MonitoringDetail";
import MonitoringConfiguration from "../../pages/monitoring-configuration/MonitoringConfig";
import Login from "../../pages/login/Login";
import UserManagement from "../../pages/user-managements/UserManagements";
import HopManagement from "../../pages/hop-management/HopManagement";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <motion.div
                className="h-full min-h-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <App />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                className="h-full min-h-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/tools"
            element={
              <motion.div
                className="h-full min-h-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ToolsTables />
              </motion.div>
            }
          />
          <Route
            path="/connection"
            element={
              <motion.div
                className="h-full min-h-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Connection />
              </motion.div>
            }
          />
          <Route
            path="/hop-management"
            element={
              <motion.div
                className="h-full min-h-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <HopManagement />
              </motion.div>
            }
          />
          <Route
            path="/user-managements"
            element={
              <motion.div
                className="h-full min-h-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <UserManagement />
              </motion.div>
            }
          />
          <Route
            path="/monitoring"
            element={
              <motion.div
                className="h-full min-h-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Monitoring />
              </motion.div>
            }
          />

          <Route
            path="/monitoring-configuration"
            element={
              <motion.div
                className="h-full min-h-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MonitoringConfiguration />
              </motion.div>
            }
          />

          <Route
            path="/monitoring/:tableName"
            element={
              <motion.div
                className="h-full min-h-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MonitoringDetail />
              </motion.div>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
