import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type {
    RoleMenuPermissionResponse,
    SaveRoleMenuPermission,
} from "../masters/rolemenu-permission/types/roleMenuPermission";
import type { PaginationRequest } from "../types/pagination";
import { getRoles } from "./roleApi";

const BASE_URL = "/RoleMenuPermission";

export const getActiveRoles = async (
    request: PaginationRequest
) => {
    return await getRoles(request);
};

export const getRoleMenuPermission = async (roleId: number) => {
    const response = await api.get<RoleMenuPermissionResponse>(
        `${BASE_URL}/${roleId}`
    );

    return response.data;
};

export const saveRoleMenuPermission = async (
    data: SaveRoleMenuPermission
) => {
    const response = await api.post<ApiResponse<boolean>>(
        BASE_URL,
        data
    );
    return response.data;
};