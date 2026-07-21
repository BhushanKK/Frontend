import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type {
    Standard,
    StandardFormValues,
} from "../masters/standard/types/standard";

const BASE_URL = "/StandardMaster";

/**
 * Get All Standards
 */
export const getStandards = async (filter: boolean): Promise<ApiResponse<Standard[]>> => {
    const response = await api.get<ApiResponse<Standard[]>>(`${BASE_URL}/${filter}`);
    return response.data;
};

/**
 * Get Standard By Id
 */
export const getStandardById = async (
    id: number
): Promise<ApiResponse<Standard>> => {
    const response = await api.get<ApiResponse<Standard>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

/**
 * Create Standard
 */
export const createStandard = async (
    data: StandardFormValues
): Promise<ApiResponse<Standard>> => {
    const response = await api.post<ApiResponse<Standard>>(
        BASE_URL,
        data
    );

    return response.data;
};

/**
 * Update Standard
 */
export const updateStandard = async (
    id: number,
    data: StandardFormValues
): Promise<ApiResponse<Standard>> => {
    const response = await api.put<ApiResponse<Standard>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete Standard
 */
export const deleteStandard = async (
    id: number
): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};