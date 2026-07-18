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
}

export const usePermissionStore = create<PermissionState>()(
    persist(
        (set) => ({

            permissions: [],
            loadPermissions: async (roleId:number) => {
                const response =
                    await getPermissionsByRole(roleId);
                set({
                    permissions: response.data
                });
                return response.data;
            },
            clearPermissions: () =>
                set({
                    permissions:[]
                })
        }),
        {
            name:"permission-storage"
        }
    )
);