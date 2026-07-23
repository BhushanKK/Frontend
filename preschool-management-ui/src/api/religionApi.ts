import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type { Religion, ReligionFormValues } from "../masters/religion/types/religion";
import type { PaginatedResult, PaginationRequest } from "../types/pagination";

const BASE_URL = "/ReligionMaster";

/**
 * Get All Religions
 */
export const getReligions = async (request: PaginationRequest): 
Promise<ApiResponse<PaginatedResult<Religion>>> => {
    const response = await api.get<ApiResponse<PaginatedResult<Religion>>>
    (BASE_URL,{params: request});
    return response.data;
};

/**
 * Get Religion By Id
 */
export const getReligionById = async (id: number)
    : Promise<ApiResponse<Religion>> => {
    const response = await api.get<ApiResponse<Religion>>(`${BASE_URL}/${id}`);
    return response.data;
};

/**
 * Create Religion
 */
export const createReligion = async (data: ReligionFormValues)
    : Promise<ApiResponse<Religion>> => {
    const response = await api.post<ApiResponse<Religion>>(BASE_URL, data);
    return response.data;
};

/**
 * Update Religion
 */
export const updateReligion = async (id: number, data: ReligionFormValues)
    : Promise<ApiResponse<Religion>> => {
    const response = await api.put<ApiResponse<Religion>>(`${BASE_URL}/${id}`, data);
    return response.data;
};

/**
 * Delete Religion
 */
export const deleteReligion = async (id: number)
    : Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(`${BASE_URL}/${id}`);
    return response.data;
};