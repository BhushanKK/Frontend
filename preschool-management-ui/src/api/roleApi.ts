import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type {
    Role,
    RoleFormValues,
} from "../masters/role/types/role";
import type { PaginatedResult, PaginationRequest } from "../types/pagination";

const BASE_URL = "/RoleMaster";

/**
 * Get All Roles
 */
export const getRoles = async (request: PaginationRequest): 
Promise<ApiResponse<PaginatedResult<Role>>> => {
    const response = await api.get<ApiResponse<PaginatedResult<Role>>>
    (BASE_URL,{params: request});
    return response.data;
};

/**
 * Bind Roles for Dropdown
 */
export const getRoleDropdown = async () => {
    const response = await api.get<ApiResponse<Role[]>>(
       `${BASE_URL}/Dropdown`
    );

    return response.data;
};

/**
 * Get Role By Id
 */
export const getRoleById = async (
    id: number
): Promise<ApiResponse<Role>> => {
    const response = await api.get<ApiResponse<Role>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

/**
 * Create Role
 */
export const createRole = async (
    data: RoleFormValues
): Promise<ApiResponse<Role>> => {
    const response = await api.post<ApiResponse<Role>>(
        BASE_URL,
        data
    );

    return response.data;
};

/**
 * Update Role
 */
export const updateRole = async (
    id: number,
    data: RoleFormValues
): Promise<ApiResponse<Role>> => {
    const response = await api.put<ApiResponse<Role>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete Role
 */
export const deleteRole = async (
    id: number
): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};