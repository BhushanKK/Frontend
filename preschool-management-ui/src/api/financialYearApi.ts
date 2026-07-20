import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type { FinancialYear, FinancialYearFormValues } from "../masters/financial-year/types/financialYear";

const BASE_URL = "/FinancialYearMaster";

/**
 * Get All Financial Years
 */
export const getFinancialYears = async (
    filter: boolean
): Promise<ApiResponse<FinancialYear[]>> => {
    const response = await api.get<ApiResponse<FinancialYear[]>>(
        `${BASE_URL}/${filter}`
    );

    return response.data;
};

/**
 * Get Financial Year By Id
 */
export const getFinancialYearById = async (
    id: number
): Promise<ApiResponse<FinancialYear>> => {
    const response = await api.get<ApiResponse<FinancialYear>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

/**
 * Create Financial Year
 */
export const createFinancialYear = async (
    data: FinancialYearFormValues
): Promise<ApiResponse<FinancialYear>> => {
    const response = await api.post<ApiResponse<FinancialYear>>(
        BASE_URL,
        data
    );

    return response.data;
};

/**
 * Update Financial Year
 */
export const updateFinancialYear = async (
    id: number,
    data: FinancialYearFormValues
): Promise<ApiResponse<FinancialYear>> => {
    const response = await api.put<ApiResponse<FinancialYear>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete Financial Year
 */
export const deleteFinancialYear = async (
    id: number
): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};