import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type { district, districtFormValues, districtResponse } from "../masters/district/types/district";

const BASE_URL="/DistrictMaster";

export const getDistricts = async() => {
    const response =await api.get<districtResponse>(BASE_URL);
    return response.data;
};

export const getDistrictById =async(id:number) =>{
    const response = await api.get<districtResponse>(`${BASE_URL}/${id}`);
    return response.data;
}

export const createDistrict = async (data: districtFormValues) => {
    const response = await api.post<ApiResponse<district>>(BASE_URL,data);
    return response.data;
}        

export const updateDistrict = async (id: number,data: districtFormValues) => {
    const response = await api.put<ApiResponse<district>>(`${BASE_URL}/${id}`,data);
    return response.data;
}

export const deleteDistrict = async (id: number) => {
    const response = await api.delete<ApiResponse<district>>(`${BASE_URL}/${id}`);
    return response.data;
}