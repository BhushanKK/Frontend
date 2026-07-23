import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type { State, StateFormValues } from "../masters/state/types/state";
import type {
    PaginatedResult,
    PaginationRequest,
} from "../types/pagination";

const BASE_URL = "/StateMaster";

/**
 * Get All States
 */
export const getStates = async (
    request: PaginationRequest
): Promise<ApiResponse<PaginatedResult<State>>> => {
    const response = await api.get<ApiResponse<PaginatedResult<State>>>(
        BASE_URL,
        {
            params: request,
        }
    );

    return response.data;
};

/**
 * Get State By Id
 */
export const getStateById = async (
    id: number
): Promise<ApiResponse<State>> => {
    const response = await api.get<ApiResponse<State>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

/**
 * Create State
 */
export const createState = async (
    data: StateFormValues
): Promise<ApiResponse<State>> => {
    const response = await api.post<ApiResponse<State>>(
        BASE_URL,
        data
    );

    return response.data;
};

/**
 * Update State
 */
export const updateState = async (
    id: number,
    data: StateFormValues
): Promise<ApiResponse<State>> => {
    const response = await api.put<ApiResponse<State>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete State
 */
export const deleteState = async (
    id: number
): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};