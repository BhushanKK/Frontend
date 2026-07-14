import api from "./axios";

import type { ApiResponse } from "../types/auth";
import type { holiday, holidayFormValues, holidayResponse } from "../masters/holiday/types/Holiday";

const BASE_URL="/HolidayMaster";

export const getCategories = async(filter:boolean) =>{
    const response = await api.get<holidayResponse>(`${BASE_URL}/${filter}`);
    return response.data;
}
export const getHolidayById= async (id:number) => {
    const response=await api.get<holidayResponse>(`${BASE_URL}/${id}`);
    return response.data;
}

export const createHoliday = async(data:holidayFormValues)=>{
    const response = await api.post<ApiResponse<holiday>>(BASE_URL,data);
    return response.data;
}

export const updateHoliday = async(id:number,data:holidayFormValues)=>{
    const response = await api.put<ApiResponse<holiday>>(`${BASE_URL}/${id}`,data);
    return response.data;
}

export const deleteHoliday = async(id:number) => {
    const response = await api.delete<ApiResponse<holiday>>(`${BASE_URL}/${id}`);
    return response.data;
}