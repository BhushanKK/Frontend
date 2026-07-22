
import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import DashboardPage from "../pages/Components/Dashboard/Dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import AcademicYearPage from "../../src/masters/academic-year/pages/AcademicYearPage";
import FinancialYearPage from "../masters/financial-year/pages/FinancialYearPage";
import CategoryPage from "../masters/category/pages/CategoryPage";
import CastePage from "../masters/caste/pages/CastePage";
import MenuPage from "../masters/menu/pages/MenuPage";
import RoleMenuPermissionPage from "../masters/rolemenu-permission/pages/RoleMenuPermissionPage";
import ChangePasswordPage from "../features/auth/ChangePasswordPage";
import ForgotPasswordPage from "../features/auth/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/ResetPasswordPage";
import RolePage from "../masters/role/pages/RolePage";
import HolidayPage from "../masters/holiday/pages/HolidayPage";
import SectionPage from "../masters/Section/pages/SectionPage";
import ReligionPage from "../masters/religion/pages/ReligionPage";
import DistrictPage from "../masters/district/pages/DistrictPage";
import DivisionPage from "../masters/division/pages/DivisionPage";
import BoardPage from "../masters/board/pages/BoardPage";
import CommitteePage from "../masters/committee/pages/CommitteePage";
import MediumPage from "../masters/Medium/pages/MediumPage";
import StandardPage from "../masters/standard/pages/StandardPage";
import DesignationPage from "../masters/designation/pages/DesignationPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={<LoginPage />}
      />
       <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />
      <Route
        path="/reset-password"
        element={<ResetPasswordPage />}
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
          <Route
            path="/change-password"
            element={<ChangePasswordPage />}
          />
          <Route
            path="/masters/section"
            element={<SectionPage />}
          />
           <Route
            path="/masters/holiday"
            element={<HolidayPage />}
          />
           <Route
            path="/masters/religion"
            element={<ReligionPage />}
          />
           <Route
            path="/masters/division"
            element={<DivisionPage />}
          />
          <Route
            path="/masters/district"
            element={<DistrictPage />}
          />
          <Route
            path="/masters/board"
            element={<BoardPage />}
          />
          <Route
            path="/masters/medium"
            element={<MediumPage />}
          />
          <Route
            path="/masters/committee"
            element={<CommitteePage />}
          />
          <Route
            path="/masters/standard"
            element={<StandardPage />}
          />
          <Route
            path="/masters/designation"
            element={<DesignationPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
