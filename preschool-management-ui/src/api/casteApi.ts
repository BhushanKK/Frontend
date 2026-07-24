import api from "./axios";
import type { Caste, CasteFormValues } from "../masters/caste/types/caste";
import type { ApiResponse } from "../types/auth";
import type { PaginatedResult, PaginationRequest } from "../types/pagination";
import { getCategoryDropdown } from "./categoryApi";

const BASE_URL = "/CasteMaster";

// State Dropdown
export const getAllCategories = async () => {
    return await getCategoryDropdown();
};

export const getCastes = async (request: PaginationRequest)
: Promise<ApiResponse<PaginatedResult<Caste>>> => {
    const response =await api.get<ApiResponse<PaginatedResult<Caste>>>(
    BASE_URL,{params: request});
    return response.data;
};

export const getCasteById = async (id: number) => {
    const response = await api.get<ApiResponse<Caste>>(`${BASE_URL}/${id}`);
    return response.data;
};

export const createCaste = async (data: CasteFormValues) => {
    const response = await api.post<ApiResponse<Caste>>(BASE_URL, data);
    return response.data;
};

export const updateCaste = async (
    id: number,
    data: CasteFormValues
) => {
    const response = await api.put<ApiResponse<Caste>>(
        `${BASE_URL}/${id}`,
        data
    );
    return response.data;
};

export const deleteCaste = async (id: number) => {
    const response = await api.delete<ApiResponse<Caste>>(
        `${BASE_URL}/${id}`
    );
    return response.data;
};