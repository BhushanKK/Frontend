import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type { Board, BoardFormValues } from "../masters/board/types/boardApi";

const BASE_URL = "/BoardMaster";

/**
 * Get All Boards
 */
export const getBoards = async (): Promise<ApiResponse<Board[]>> => {
    const response = await api.get<ApiResponse<Board[]>>(BASE_URL);

    return response.data;
};

/**
 * Get Board By Id
 */
export const getBoardById = async (
    id: number
): Promise<ApiResponse<Board>> => {
    const response = await api.get<ApiResponse<Board>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

/**
 * Create Board
 */
export const createBoard = async (
    data: BoardFormValues
): Promise<ApiResponse<Board>> => {
    const response = await api.post<ApiResponse<Board>>(
        BASE_URL,
        data
    );

    return response.data;
};

/**
 * Update Board
 */
export const updateBoard = async (
    id: number,
    data: BoardFormValues
): Promise<ApiResponse<Board>> => {
    const response = await api.put<ApiResponse<Board>>(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete Board
 */
export const deleteBoard = async (
    id: number
): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};