import type { ApiResponse } from "../types/auth";
import type { UserPermissions } from "../types/userPermission";
import api from "./axios";

export const getPermissionsByRole = async (roleId: number) => {
    const response = await api.get<ApiResponse<UserPermissions[]>>(
        `/RoleMenuPermission/GetPermissionByRole/${roleId}`
    );

    return response.data;
};