import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type { Medium, MediumFormValues } from "../masters/Medium/types/medium";
import type { PaginatedResult, PaginationRequest } from "../types/pagination";

const BASE_URL = "/MediumMaster";

/**
 * Get All Mediums
 */
export const getMediums = async (request: PaginationRequest): 
Promise<ApiResponse<PaginatedResult<Medium>>> => {
    const response = await api.get<ApiResponse<PaginatedResult<Medium>>>
    (BASE_URL,{params: request});
    return response.data;
};

/**
 * Get Medium By Id
 */
export const getMediumById = async (
    id: number
): Promise<ApiResponse<Medium>> => {
    const response = await api.get<ApiResponse<Medium>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

/**
 * Create Medium
 */
export const createMedium = async (
    data: MediumFormValues
): Promise<ApiResponse<Medium>> => {
    const response = await api.post<ApiResponse<Medium>>(
        BASE_URL,
        data
    );

    return response.data;
};

/**
 * Update Medium
 */
export const updateMedium = async (
    id: number,
    data: MediumFormValues
): Promise<ApiResponse<Medium>> => {
    const response = await api.put<ApiResponse<Medium>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete Medium
 */
export const deleteMedium = async (
    id: number
): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};