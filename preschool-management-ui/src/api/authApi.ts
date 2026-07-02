import axiosInstance from "./axiosInstance";
import type { LoginRequest} from "../types/auth";

export const login = async (request: LoginRequest) => {
    const response = await axiosInstance.post("/api/auth/login", request);
    return response.data;
};