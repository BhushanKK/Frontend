import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import API from "./endpoints";
import { getAccessToken, getRefreshToken } from "../services/tokenService";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_REQUEST_TIMEOUT),
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------- REQUEST --------------------
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------- RESPONSE --------------------
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = getRefreshToken();

        if (!refresh) {
          useAuthStore.getState().logout();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}${API.AUTH.REFRESH_TOKEN}`,
          { refreshToken: refresh }
        );

        const tokenData = res.data?.data;

        if (!tokenData?.accessToken) {
          throw new Error("Invalid refresh response");
        }

        useAuthStore.getState().updateTokens(
          tokenData.accessToken,
          tokenData.refreshToken,
          tokenData.expiresAt
        );

        // SAFE HEADER UPDATE
        if (originalRequest.headers) {
          originalRequest.headers.Authorization =
            `Bearer ${tokenData.accessToken}`;
        }

        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;