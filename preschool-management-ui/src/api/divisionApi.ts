import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type {
    Division,
    DivisionFormValues,
} from "../masters/division/types/division";
import type { PaginatedResult, PaginationRequest } from "../types/pagination";

const BASE_URL = "/DivisionMaster";

/**
 * Get All Divisions
 */
export const getDivisions = async (request: PaginationRequest): 
Promise<ApiResponse<PaginatedResult<Division>>> => {
    const response = await api.get<ApiResponse<PaginatedResult<Division>>>
    (BASE_URL,{params: request});
    return response.data;
};

/**
 * Get Division By Id
 */
export const getDivisionById = async (
    id: number
): Promise<ApiResponse<Division>> => {
    const response = await api.get<ApiResponse<Division>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

/**
 * Create Division
 */
export const createDivision = async (
    data: DivisionFormValues
): Promise<ApiResponse<Division>> => {
    const response = await api.post<ApiResponse<Division>>(
        BASE_URL,
        data
    );

    return response.data;
};

/**
 * Update Division
 */
export const updateDivision = async (
    id: number,
    data: DivisionFormValues
): Promise<ApiResponse<Division>> => {
    const response = await api.put<ApiResponse<Division>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete Division
 */
export const deleteDivision = async (
    id: number
): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};