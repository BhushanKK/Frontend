import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type { Section, SectionFormValues } from "../masters/Section/types/section"
import type { PaginatedResult, PaginationRequest } from "../types/pagination";

const BASE_URL = "/SectionMaster";

/**
 * Get All Sections
 */
export const getSections = async (request: PaginationRequest): 
Promise<ApiResponse<PaginatedResult<Section>>> => {
    const response = await api.get<ApiResponse<PaginatedResult<Section>>>
    (BASE_URL,{params: request});
    return response.data;
};

/**
 * Get Section By Id
 */
export const getSectionById = async (
    id: number
): Promise<ApiResponse<Section>> => {
    const response = await api.get<ApiResponse<Section>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

/**
 * Create Section
 */
export const createSection = async (
    data: SectionFormValues
): Promise<ApiResponse<Section>> => {
    const response = await api.post<ApiResponse<Section>>(
        BASE_URL,
        data
    );

    return response.data;
};

/**
 * Update Section
 */
export const updateSection = async (
    id: number,
    data: SectionFormValues
): Promise<ApiResponse<Section>> => {
    const response = await api.put<ApiResponse<Section>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete Section
 */
export const deleteSection = async (
    id: number
): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};