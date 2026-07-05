import { useState } from "react";
import axios from "axios";
import { createRole, deleteRole, updateRole } from "../../../api/roleApi";
import type { Role, RoleFormValues } from "../types/role";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "warning" | "error" | "info";

interface UseRoleCrudProps {
    loadRoles: () => Promise<void>;
}

export function useRoles({
    loadRoles }: UseRoleCrudProps) {
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<Role | null>(null);
    const [selectRow, setSelectRow] = useState<Role | null>(null);

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

    const handleAdd = () => {
        setEditingRow(null);
        setOpenForm(true);
    };

    const handleEdit = (row: Role) => {
        setEditingRow(row);
        setOpenForm(true);
    }

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    }

    const handelSave = async (data: RoleFormValues) => {
        try {
            const response = editingRow
                ? await updateRole(editingRow.roleId, data)
                : await createRole(data);

            switch (response.statusCode) {
                case 409:
                    showSnackbar("warning", response.message);
                    break;

                case 400:
                    showSnackbar("error", response.message);
                    break;

                case 200:
                case 201:
                    handleCloseForm();
                    await loadRoles();
                    showSnackbar("success", response.message)
                    break;
                default:
                    showSnackbar("error", response.message);
                    break;
            }
        } catch (error) {
            showSnackbar(
                "error",
                axios.isAxiosError<ApiResponse<number>>(error)
                    ? error.response?.data.message ?? "Something went wrong."
                    : "Unexpected error."
            );
        }
    };

    const handleDelete = (row: Role) => {
        setSelectRow(row);
        setDeleteOpen(true);
    };

    const handleCloseDelete = () => {
        setDeleteOpen(false);
        setSelectRow(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectRow) return;

        try {
            const response = await deleteRole(
                selectRow.roleId
            );

            if (response.success) {
                await loadRoles();
                handleCloseDelete();
                showSnackbar("info", response.message);
            }
        } catch {
            showSnackbar("error", "Failed to delete Financial Year.");
        }
    };
    return {
        // Form
        openForm,
        editingRow,
        handleAdd,
        handleEdit,
        handelSave,
        handleCloseForm,

        // Delete
        deleteOpen,
        selectRow,
        handleDelete,
        handleConfirmDelete,
        handleCloseDelete,

        // Snackbar
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        closeSnackbar,
    };
}
