export interface LoginResponse {
    access: boolean;
    message: string;
    statusCode: number;

    data: {
        accessToken: string;
        refreshToken: string;
        expiresAt: string;
    };
}