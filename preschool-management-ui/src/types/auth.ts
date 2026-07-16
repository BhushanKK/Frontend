/**
 * Login Request
 */
export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginFormData extends LoginRequest {
  rememberMe: boolean;
}

/**
 * JWT Token Data
 */
export interface LoginData {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

/**
 * Login API Response
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: LoginData;
}

/**
 * Refresh Token Request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Refresh Token Response
 */
export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: LoginData;
}

/**
 * Generic API Response
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

/**
 * Authentication Store State
 */
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;

  login: (data: LoginData) => void;

  updateTokens: (
    accessToken: string,
    refreshToken: string,
    expiresAt: string
  ) => void;

  logout: () => void;
}

/*change password*/

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ChangePasswordResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: {
        success: boolean;
        message: string;
    };
}

export interface ResetPasswordFormData {
    newPassword: string;
    confirmPassword: string;
}

export interface ForgotPasswordFormData {
    email: string;
}