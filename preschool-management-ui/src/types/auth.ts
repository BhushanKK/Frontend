export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginData {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
}

export interface LoginResponse {
    access: boolean;
    message: string;
    statusCode: number;

    data: LoginData;
}