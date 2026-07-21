import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type { Holiday, HolidayFormValues } from "../masters/holiday/types/Holiday";

const BASE_URL = "/HolidayMaster";

/**
 * Get All Holidays
 */
export const getHolidays = async (): Promise<ApiResponse<Holiday[]>> => {
    const response = await api.get<ApiResponse<Holiday[]>>(BASE_URL);
    return response.data;
};

/**
 * Get Holiday By Id
 */
export const getHolidayById = async (
    id: number
): Promise<ApiResponse<Holiday>> => {
    const response = await api.get<ApiResponse<Holiday>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

/**
 * Create Holiday
 */
export const createHoliday = async (
    data: HolidayFormValues
): Promise<ApiResponse<Holiday>> => {
    const response = await api.post<ApiResponse<Holiday>>(
        BASE_URL,
        data
    );

    return response.data;
};

/**
 * Update Holiday
 */
export const updateHoliday = async (
    id: number,
    data: HolidayFormValues
): Promise<ApiResponse<Holiday>> => {
    const response = await api.put<ApiResponse<Holiday>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete Holiday
 */
export const deleteHoliday = async (
    id: number
): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};