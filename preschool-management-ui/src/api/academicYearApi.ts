import api from "./axios";
import type { ApiResponse } from "../types/auth";
import type { AcademicYear, AcademicYearFormValues } from "../masters/academic-year/types/academicYear";
import type { PaginatedResult, PaginationRequest } from "../types/pagination";

const BASE_URL = "/AcademicYearmaster";

/**
 * Get All Academic Years
 */
export const getAcademicYears = async (request: PaginationRequest): 
Promise<ApiResponse<PaginatedResult<AcademicYear>>> => {
    const response = await api.get<ApiResponse<PaginatedResult<AcademicYear>>>
    (BASE_URL,{params: request});
    return response.data;
};

/**
 * Get Academic Year By Id
 */
export const getAcademicYearById = async (
    id: number
): Promise<ApiResponse<AcademicYear>> => {
    const response = await api.get<ApiResponse<AcademicYear>>(
        `${BASE_URL}/${id}`
    );

    return response.data;
};

/**
 * Create Academic Year
 */
export const createAcademicYear = async (
  data: AcademicYearFormValues
) => {
  const response = await api.post<ApiResponse<AcademicYear>>(
    BASE_URL,
    data
  );

  return response.data;
};

/**
 * Update Academic Year
 */
export const updateAcademicYear = async (
  id: number,
  data: AcademicYearFormValues
) => {
  const response = await api.put<ApiResponse<AcademicYear>>(
    `${BASE_URL}/${id}`,
    data
  );

  return response.data;
};

/**
 * Delete Academic Year
 */
export const deleteAcademicYear = async (id: number) => {
  const response = await api.delete<ApiResponse<null>>(
    `${BASE_URL}/${id}`
  );

  return response.data;
};