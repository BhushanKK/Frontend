import api from "./axios";
import type { Section, SectionFormValues, SectionResponse } from "../masters/Section/types/section";
import { getCategories } from "../api/categoryApi";
import type { ApiResponse } from "../types/auth";

const BASE_URL = "/SectionMaster";

export const getAllCategories = async () => {
    return await getCategories(true);
};

export const getSections = async (filter:boolean) => {
    const response = await api.get<SectionResponse>(`${BASE_URL}/${filter}`);
    return response.data;
};

export const getSectionById = async (id: number) => {
    const response = await api.get<ApiResponse<Section>>(`${BASE_URL}/${id}`);
    return response.data;
};

export const createSection = async (data: SectionFormValues) => {
    const response = await api.post<ApiResponse<Section>>(BASE_URL, data);
    return response.data;
};

export const updateSection = async (
    id: number,
    data: SectionFormValues
) => {
    const response = await api.put<ApiResponse<Section>>(
        `${BASE_URL}/${id}`,
        data
    );
    return response.data;
};

export const deleteSection = async (id: number) => {
    const response = await api.delete<ApiResponse<Section>>(
        `${BASE_URL}/${id}`
    );
    return response.data;
};