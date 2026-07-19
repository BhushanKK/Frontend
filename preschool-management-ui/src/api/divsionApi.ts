import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type { division, divisionResponse,divisionFormValues } from "../../src/masters/division/types/division";

const BASE_URL="/divisionMaster";

export const getdivisions = async() => {
    const response =await api.get<divisionResponse>(BASE_URL);
    return response.data;
};

export const getdivisionById =async(id:number) =>{
    const response = await api.get<divisionResponse>(`${BASE_URL}/${id}`);
    return response.data;
}

export const createdivision = async (data: divisionFormValues) => {
    const response = await api.post<ApiResponse<division>>(BASE_URL,data);
    return response.data;
}        

export const updatedivision = async (id: number,data: divisionFormValues) => {
    const response = await api.put<ApiResponse<division>>(`${BASE_URL}/${id}`,data);
    return response.data;
}

export const deletedivision = async (id: number) => {
    const response = await api.delete<ApiResponse<division>>(`${BASE_URL}/${id}`);
    return response.data;
}