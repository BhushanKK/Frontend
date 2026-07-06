import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type { Role, RoleResponse,RoleFormValues } from "../../src/masters/role/types/role";

const BASE_URL="/RoleMaster";

export const getRoles = async() => {
    const response =await api.get<RoleResponse>(BASE_URL);
    return response.data;
};

export const getRoleById =async(id:number) =>{
    const response = await api.get<RoleResponse>(`${BASE_URL}/${id}`);
    return response.data;
}

export const createRole = async (data: RoleFormValues) => {
    const response = await api.post<ApiResponse<Role>>(BASE_URL,data);
    return response.data;
}        

export const updateRole = async (id: number,data: RoleFormValues) => {
    const response = await api.put<ApiResponse<Role>>(`${BASE_URL}/${id}`,data);
    return response.data;
}

export const deleteRole = async (id: number) => {
    const response = await api.delete<ApiResponse<Role>>(`${BASE_URL}/${id}`);
    return response.data;
}