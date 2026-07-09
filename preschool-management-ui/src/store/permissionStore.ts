import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getPermissionsByRole } from "../api/permissionApi";
import type { UserPermission } from "../types/UserPermission";

interface PermissionState {
    permissions: UserPermission[];
    loadPermissions: (
        roleId: number
    ) => Promise<UserPermission[]>;
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