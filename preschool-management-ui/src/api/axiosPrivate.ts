import axios from "axios";
import { useAuthStore } from "../store/authStore";

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_REQUEST_TIMEOUT),
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every authenticated request
axiosPrivate.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) 
            config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosPrivate;