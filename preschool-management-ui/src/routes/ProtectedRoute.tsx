import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { usePermissionStore } from "../store/permissionStore";

export default function ProtectedRoute() {
    const location = useLocation();

    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );

    const hasPermission = usePermissionStore(
        (state) => state.hasPermission
    );

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (!hasPermission(location.pathname, "canView")) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    return <Outlet />;
}