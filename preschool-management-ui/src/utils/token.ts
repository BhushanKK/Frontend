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
 * Updates the stored tokens after a refresh.
 */
export const updateTokens = (
  accessToken: string,
  refreshToken: string,
  expiresAt: string
): void => {
  useAuthStore
    .getState()
    .updateTokens(accessToken, refreshToken, expiresAt);
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

/**
 * Returns true if the access token will expire soon.
 * (Useful for proactive refresh.)
 */
export const willTokenExpireSoon = (
  minutes = 2
): boolean => {
  const expiresAt = getTokenExpiry();

  if (!expiresAt) {
    return true;
  }

  const expiry = new Date(expiresAt).getTime();
  const now = Date.now();

  return expiry - now <= minutes * 60 * 1000;
};