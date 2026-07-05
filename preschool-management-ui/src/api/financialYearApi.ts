import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type {
    FinancialYear,
    FinancialYearResponse,
} from "../masters/financial-year/types/financialYear";
import type { FinancialYearFormValues } from "../masters/financial-year/components/FinancialYearForm";

const BASE_URL = "/FinancialYearMaster";

/**
 * Get All Financial Years
 */
export const getFinancialYears = async () => {
    const response = await api.get<FinancialYearResponse>(BASE_URL);
    return response.data;
};

/**
 * Get Financial Year By Id
 */
export const getFinancialYearById = async (id: number) => {
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
) => {
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
) => {
    const response = await api.put<ApiResponse<FinancialYear>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete Financial Year
 */
export const deleteFinancialYear = async (id: number) => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};