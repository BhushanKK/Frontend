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
 * Checks whether the user is authenticated.
 */
export const isAuthenticated = (): boolean => {
  return useAuthStore.getState().isAuthenticated;
};

/**
 * Clears authentication state.
 */
export const clearTokens = (): void => {
  useAuthStore.getState().logout();
};

/**
 * Returns true if the access token has expired.
 */
export const isTokenExpired = (): boolean => {
  const expiresAt = getTokenExpiry();

  if (!expiresAt) {
    return true;
  }

  return new Date(expiresAt).getTime() <= Date.now();
};