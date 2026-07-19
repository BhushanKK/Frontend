import axios, {AxiosError, type InternalAxiosRequestConfig } from "axios";
import API from "./endpoints";
import {getAccessToken,getRefreshToken } from "../services/tokenService";
import { useAuthStore } from "../store/authStore";
import { useLanguageStore } from "../store/languageStore";

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
        const language = useLanguageStore.getState().language;

        if (config.headers) {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            config.headers["Accept-Language"] = language;
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
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                throw new Error("Refresh token not found.");
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}${API.AUTH.REFRESH_TOKEN}`,
                {
                    refreshToken,
                }
            );

            const tokenData = response.data?.data;

            if (!tokenData?.accessToken) {
                throw new Error("Invalid refresh token response.");
            }

            useAuthStore.getState().updateTokens(
                tokenData.accessToken,
                tokenData.refreshToken,
                tokenData.expiresAt
            );

            if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;
            }

            return api(originalRequest);
        } catch (refreshError) {
            useAuthStore.getState().logout();
            window.location.href = "/login";

            return Promise.reject(refreshError);
        }
    }
);

export default api;