import { usePermissionStore } from "../../../store/permissionStore";
import { useAuthStore } from "../../../store/authStore";
import { getJwtPayload } from "../../../utils/jwtHelper";
import { useState } from "react";
import axios from "axios";
import { getRoleMenuPermission, saveRoleMenuPermission } from "../../../api/roleMenuPermissionApi";
import type { RoleMenuPermission, SaveRoleMenuPermission } from "../types/roleMenuPermission";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "warning" | "error" | "info";

export function useRoleMenuPermission() {
    const [permissions, setPermissions] =
        useState<RoleMenuPermission[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>("success");

    const showSnackbar = (
        severity: SnackbarSeverity,
        message: string
    ) => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setSnackbarOpen(false);
    };

    const loadPermissions = async (roleId: number) => {
        setLoading(true);
        try {
            const response =
                await getRoleMenuPermission(roleId);
            if (response.success)
                setPermissions(response.data);

            else
                setPermissions([]);
        }
        finally {
            setLoading(false);
        }
    };

    const updatePermission = (
        menuId: number,
        field: keyof RoleMenuPermission,
        value: boolean
    ) => {
        setPermissions(old =>
            old.map(x =>
                x.menuId === menuId
                    ? {
                        ...x,
                        [field]: value,
                    }
                    : x
            )
        );
    };

    const save = async (roleId: number) => {

        if (roleId === 0) {

            showSnackbar(
                "warning",
                "Please select role."
            );
            return;
        }

        setSaving(true);

        try {

            const request: SaveRoleMenuPermission = {
                roleId,
                permissions,
            };

            const response =
                await saveRoleMenuPermission(request);
            switch (response.statusCode) {

                case 200:
                case 201:
                    showSnackbar(
                        "success",
                        response.message
                    );

                    // Refresh logged-in user's permissions
                    const accessToken =
                        useAuthStore.getState().accessToken;
                    if (accessToken) {
                        const jwt = getJwtPayload(accessToken);
                        if (jwt.roleId === roleId) {
                            await usePermissionStore
                                .getState()
                                .loadPermissions(roleId);
                        }
                    }
                    break;

                case 400:
                    showSnackbar(
                        "error",
                        response.message
                    );
                    break;
                default:
                    showSnackbar(
                        "warning",
                        response.message
                    );
                    break;
            }

        }
        catch (error) {

            showSnackbar(
                "error",
                axios.isAxiosError<ApiResponse<number>>(error)
                    ? error.response?.data.message ??
                    "Something went wrong."
                    : "Unexpected error."
            );

        }
        finally {
            setSaving(false);
        }
    };

    return {
        permissions,
        loading,
        saving,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        loadPermissions,
        updatePermission,
        save,
        closeSnackbar,
    };
}