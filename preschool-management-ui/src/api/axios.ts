import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5202/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;