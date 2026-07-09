import type { ApiResponse } from "../types/auth";
import type { UserPermission } from "../types/UserPermission";
import api from "./axios";

export const getPermissionsByRole = async (roleId: number) => {
    const response = await api.get<ApiResponse<UserPermission[]>>(
        `/RoleMenuPermission/GetPermissionByRole/${roleId}`
    );

    return response.data;
};