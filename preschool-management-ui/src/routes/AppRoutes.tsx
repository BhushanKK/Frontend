import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";

import Dashboard from "../pages/Components/Dashboard/Dashboard";

import DashboardLayout from "../components/layout/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "../pages/Components/Dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}

      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Protected */}

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Future Pages */}

          <Route
            path="/students"
            element={<h2>Students</h2>}
          />

          <Route
            path="/teachers"
            element={<h2>Teachers</h2>}
          />

          <Route
            path="/classes"
            element={<h2>Classes</h2>}
          />

          <Route
            path="/attendance"
            element={<h2>Attendance</h2>}
          />

          <Route
            path="/fees"
            element={<h2>Fees</h2>}
          />

          <Route
            path="/library"
            element={<h2>Library</h2>}
          />

          <Route
            path="/reports"
            element={<h2>Reports</h2>}
          />

          <Route
            path="/settings"
            element={<h2>Settings</h2>}
          />
        </Route>
      </Route>

      {/* Default */}

      <Route
  path="/dashboard"
  element={<DashboardPage />}
/>

      {/* 404 */}

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}