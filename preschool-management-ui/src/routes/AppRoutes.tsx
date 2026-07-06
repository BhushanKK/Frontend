
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";
import DashboardPage from "../pages/Components/Dashboard/Dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import AcademicYearPage from "../../src/masters/academic-year/pages/AcademicYearPage";
import FinancialYearPage from "../masters/financial-year/pages/FinancialYearPage";
import RolePage from "../masters/role/pages/RolePage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          {/* Masters */}
          <Route
            path="/masters/role"
            element={<RolePage />}
          />
          <Route
            path="/masters/academic-year"
            element={<AcademicYearPage />}
          />

          <Route
            path="/masters/financial-year"
            element={<FinancialYearPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
