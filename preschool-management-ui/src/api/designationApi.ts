import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type {
    Designation,
    DesignationFormValues,
} from "../masters/designation/types/designation";

const BASE_URL = "/DesignationMaster";

/**
 * Get All Designations
 */
export const getDesignations = async (
    filter: boolean
): Promise<ApiResponse<Designation[]>> => {
    const response = await api.get<ApiResponse<Designation[]>>(
        `${BASE_URL}/${filter}`
    );

    return response.data;
};

/**
 * Get Designation By Id
 */
export const getDesignationById = async (
    id: number
): Promise<ApiResponse<Designation>> => {
    const response = await api.get<ApiResponse<Designation>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

/**
 * Create Designation
 */
export const createDesignation = async (
    data: DesignationFormValues
) => {
    const response = await api.post<ApiResponse<Designation>>(
        BASE_URL,
        data
    );

    return response.data;
};

/**
 * Update Designation
 */
export const updateDesignation = async (
    id: number,
    data: DesignationFormValues
) => {
    const response = await api.put<ApiResponse<Designation>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete Designation
 */
export const deleteDesignation = async (
    id: number
) => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};