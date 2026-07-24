import api from "./axios";

import type { ApiResponse } from "../types/auth";
import type { PaginatedResult, PaginationRequest } from "../types/pagination";
import type { District, DistrictFormValues } from "../masters/district/types/district";
import { getStateDropdown } from "./stateApi";

const BASE_URL = "/DistrictMaster";

// State Dropdown
export const getAllStates = async () => {
    return await getStateDropdown();
};

// Get Districts
export const getDistricts = async (request: PaginationRequest)
: Promise<ApiResponse<PaginatedResult<District>>> => {
    const response = await api.get<ApiResponse<PaginatedResult<District>>>
    (BASE_URL, {params: request,});
    return response.data;
};

// Get By Id
export const getDistrictById = async (id: number) => {
    const response = await api.get<ApiResponse<District>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

// Create
export const createDistrict = async (
    data: DistrictFormValues
) => {
    const response = await api.post<ApiResponse<District>>(
        BASE_URL,
        data
    );

    return response.data;
};

// Update
export const updateDistrict = async (
    id: number,
    data: DistrictFormValues
) => {
    const response = await api.put<ApiResponse<District>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

// Delete
export const deleteDistrict = async (id: number) => {
    const response = await api.delete<ApiResponse<District>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};