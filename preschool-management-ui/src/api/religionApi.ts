import api from "./axios";
import type { religion,religionFormValues,religionResponse } from "../masters/religion/types/religion";
import type { ApiResponse } from "../types/auth";

const BASE_URL="/religionMaster";

export const getReligions = async(filter:boolean) =>{
    const response = await api.get<religionResponse>(`${BASE_URL}/${filter}`);
    return response.data;
}
export const getReligionById= async (id:number) => {
    const response=await api.get<religionResponse>(`${BASE_URL}/${id}`);
    return response.data;
}

export const createReligion = async(data:religionFormValues)=>{
    const response = await api.post<ApiResponse<religion>>(BASE_URL,data);
    return response.data;
}

export const updateReligion = async(id:number,data:religionFormValues)=>{
    const response = await api.put<ApiResponse<religion>>(`${BASE_URL}/${id}`,data);
    return response.data;
}

export const deleteReligion = async(id:number) => {
    const response = await api.delete<ApiResponse<religion>>(`${BASE_URL}/${id}`);
    return response.data;
}