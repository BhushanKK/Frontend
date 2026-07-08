import api from "./axios";
import type { Caste, CasteFormValues, CasteResponse } from "../masters/caste/types/caste";
import { getCategories } from "../api/categoryApi";
import type { ApiResponse } from "../types/auth";

const BASE_URL = "/CasteMaster";

export const getAllCategories = async () => {
    return await getCategories(true);
};

export const getCastes = async () => {
    const response = await api.get<CasteResponse>(BASE_URL);
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