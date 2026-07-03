import { useAuthStore } from "../store/authStore";

/**
 * Returns the current access token.
 */
export const getAccessToken = (): string | null => {
  return useAuthStore.getState().accessToken;
};

/**
 * Returns the current refresh token.
 */
export const getRefreshToken = (): string | null => {
  return useAuthStore.getState().refreshToken;
};

/**
 * Returns the token expiry date.
 */
export const getTokenExpiry = (): string | null => {
  return useAuthStore.getState().expiresAt;
};

/**
 * Clears authentication state.
 */
export const clearTokens = (): void => {
  useAuthStore.getState().logout();
};