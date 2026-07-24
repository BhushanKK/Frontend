import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getPermissionsByRole } from "../api/permissionApi";
import type { UserPermissions } from "../types/userPermission";

interface PermissionState {
    permissions: UserPermissions[];

    loadPermissions: (
        roleId: number
    ) => Promise<UserPermissions[]>;

    clearPermissions: () => void;

    hasPermission: (
        menuUrl: string,
        action: keyof Pick<
            UserPermissions,
            | "canView"
            | "canAdd"
            | "canEdit"
            | "canDelete"
            | "canPrint"
            | "canExport"
        >
    ) => boolean;
}

export const usePermissionStore = create<PermissionState>()(
    persist(
        (set, get) => ({
            permissions: [],

            loadPermissions: async (roleId: number) => {
                const response =
                    await getPermissionsByRole(roleId);

                set({
                    permissions: response.data,
                });

                return response.data;
            },

            clearPermissions: () =>
                set({
                    permissions: [],
                }),

            hasPermission: (menuUrl, action) => {
                const permission = get().permissions.find(
                    (x) =>
                        x.menuUrl?.toLowerCase() ===
                        menuUrl.toLowerCase()
                );

                return permission ? permission[action] : false;
            },
        }),
        {
            name: "permission-storage",
        }
    )
);