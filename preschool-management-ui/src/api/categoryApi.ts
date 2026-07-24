import api from "./axios";
import type { Category,CategoryDropdown,CategoryFormValues } from "../masters/category/types/category";
import type { ApiResponse } from "../types/auth";
import type { PaginatedResult, PaginationRequest } from "../types/pagination";

const BASE_URL="/CategoryMaster";

export const getCategories = async (request: PaginationRequest)
: Promise<ApiResponse<PaginatedResult<Category>>> => {
    const response =await api.get<ApiResponse<PaginatedResult<Category>>>(
    BASE_URL,{params: request});
    return response.data;
};

export const getCategoryById = async (id: number) => {
    const response = await api.get<ApiResponse<Category>>(
        `${BASE_URL}/${id}`
    );
    return response.data;
};

/**
 * Get State data for Dropdown bind
 */
export const getCategoryDropdown = async () => {
    const response = await api.get<ApiResponse<CategoryDropdown[]>>(
       `${BASE_URL}/dropdown`);
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