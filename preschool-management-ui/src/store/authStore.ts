  import { create } from "zustand";
  import { persist } from "zustand/middleware";

  import type { AuthState, LoginData } from "../types/auth";

  export const useAuthStore = create<AuthState>()(
    persist(
      (set) => ({
        isAuthenticated: false,

        accessToken: null,
        refreshToken: null,
        expiresAt: null,

        login: (data: LoginData) =>
          set({
            isAuthenticated: true,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expiresAt: data.expiresAt,
          }),

        logout: () =>
          set({
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            expiresAt: null,
          }),
      }),
      {
        name: "auth-storage",
      }
    )
  );