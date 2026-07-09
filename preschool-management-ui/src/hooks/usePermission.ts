import { useLocation } from "react-router-dom";
import { usePermissionStore } from "../store/permissionStore";

export default function usePermission(){
    const location = useLocation();
    const permissions =
        usePermissionStore(
            state => state.permissions
        );

    const currentPath =
        location.pathname;

    const permission =
        permissions.find(
            x =>
                x.menuUrl === currentPath
        );

    return {
        canAdd:
            permission?.canAdd ?? false,
        canEdit:
            permission?.canEdit ?? false,
        canDelete:
            permission?.canDelete ?? false,
        canExport:
            permission?.canExport ?? false,
        canPrint:
            permission?.canPrint ?? false
    };
}