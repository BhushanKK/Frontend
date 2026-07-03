import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_REQUEST_TIMEOUT),
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;