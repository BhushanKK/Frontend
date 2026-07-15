import axiosPublic from "./axiosPublic";
import API from "./endpoints";
import type { ChangePasswordRequest, ChangePasswordResponse, 
  LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse 
} from "../types/auth";
import axiosPrivate from "./axiosPrivate";

/**
 * Login API
 */
export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await axiosPublic.post<LoginResponse>(
    API.AUTH.LOGIN,
    request
  );

  return data;
};

/**
 * Refresh Token API
 */
export const refreshToken = async (
  request: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
  const { data } = await axiosPublic.post<RefreshTokenResponse>(
    API.AUTH.REFRESH_TOKEN,
    request
  );

  return data;
};

/**
 * Change Password API
 */
export const changePassword = async (
    request: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
    const { data } = await axiosPrivate.post<ChangePasswordResponse>(
        API.AUTH.CHANGE_PASSWORD,
        request
    );

    return data;
};

