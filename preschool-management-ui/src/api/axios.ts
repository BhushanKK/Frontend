import axios from "axios";
import { getAccessToken } from "../services/tokenService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_REQUEST_TIMEOUT),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) 
      config.headers.Authorization = `Bearer ${token}`;
  
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;