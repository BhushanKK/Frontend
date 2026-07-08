
import { Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";
import DashboardPage from "../pages/Components/Dashboard/Dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import AcademicYearPage from "../../src/masters/academic-year/pages/AcademicYearPage";
import FinancialYearPage from "../masters/financial-year/pages/FinancialYearPage";
import RolePage from "../masters/role/pages/RolePage";
import CategoryPage from "../masters/category/pages/CategoryPage";
import CastePage from "../masters/caste/pages/CastePage";
import MenuPage from "../masters/menu/pages/MenuPage";
import RoleMenuPermissionPage from "../masters/rolemenu-permission/pages/RoleMenuPermissionPage";

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
          <Route
            path="/masters/category"
            element={<CategoryPage />}
          />
          <Route
            path="/masters/caste"
            element={<CastePage />}
          />
          <Route
            path="/masters/menu"
            element={<MenuPage />}
          />
          <Route
            path="/masters/rolemenu-permission"
            element={<RoleMenuPermissionPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
