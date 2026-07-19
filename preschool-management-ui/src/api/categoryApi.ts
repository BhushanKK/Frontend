import api from "./axios";
import type { Category,CategoryFormValues } from "../masters/category/types/category";
import type { ApiResponse } from "../types/auth";

const BASE_URL="/CategoryMaster";

export const getCategories = async (filter: boolean) => {
    const response = await api.get<ApiResponse<Category[]>>(
        `${BASE_URL}/${filter}`
    );

    return response.data;
};

export const getCategoryById = async (id: number) => {
    const response = await api.get<ApiResponse<Category>>(
        `${BASE_URL}/${id}`
    );
    return response.data;
};

export const createCategory = async(data:CategoryFormValues)=>{
    const response = await api.post<ApiResponse<Category>>(BASE_URL,data);
    return response.data;
}

export const updateCategory = async(id:number,data:CategoryFormValues)=>{
    const response = await api.put<ApiResponse<Category>>(`${BASE_URL}/${id}`,data);
    return response.data;
}

export const deleteCategory = async(id:number) => {
    const response = await api.delete<ApiResponse<Category>>(`${BASE_URL}/${id}`);
    return response.data;
}