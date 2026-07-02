import axiosInstance from "./axios";
import API from "./endpoints";

import type {
  LoginRequest,
  LoginResponse,
} from "../types/auth";

/**
 * Login API
 */
export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    API.AUTH.LOGIN,
    request
  );

  return response.data;
};