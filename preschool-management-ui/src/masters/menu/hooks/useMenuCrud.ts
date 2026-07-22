import { useState } from "react";
import axios from "axios";
import { createMenu, updateMenu, deleteMenu, getMenuById } from "../../../api/menuApi";
import type { Menu, MenuFormValues } from "../types/menu";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface UseMenuCrudProps {
    loadMenus: () => Promise<void>;
}

export function useMenuCrud({
    loadMenus,
}: UseMenuCrudProps) {

    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [editingRow, setEditingRow] = useState<Menu | null>(null);
    const [selectedRow, setSelectedRow] = useState<Menu | null>(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] =
        useState<SnackbarSeverity>("success");

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

    // Add
    const handleAdd = () => {
        setEditingRow(null);
        setOpenForm(true);
    };

    // Edit
    const handleEdit = async (row: Menu) => {
        console.log("Menu Row:", row);

        try {
            const response = await getMenuById(row.menuId);
            console.log("GetById Response:", response);
            console.log("GetById Data:", response.data);
            console.log("Menu Id:", response.data?.menuId);
            if (response.success) {
                setEditingRow({
                    ...response.data,
                    menuId: row.menuId
                });

                setOpenForm(true);
            } else {
                showSnackbar("error", response.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Close Form
    const handleCloseForm = () => {
        setEditingRow(null);
        setOpenForm(false);
    };

    // Save
    const handleSave = async (data: MenuFormValues) => {

        const payload: MenuFormValues = {
            ...data,
            roleIds: (data.roles ?? [])
                .map(role => role.roleId)
                .join(","),
            translations: data.translations ?? []
        };

        try {

            const response = editingRow

                ? await updateMenu(editingRow.menuId, payload)
                : await createMenu(payload);

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
                    await loadMenus();
                    showSnackbar("success", response.message);
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

    // Delete
    const handleDelete = (row: Menu) => {
        setSelectedRow(row);
        setDeleteOpen(true);
    };

    const handleCloseDelete = () => {
        setDeleteOpen(false);
        setSelectedRow(null);
    };

    const handleConfirmDelete = async () => {

        if (!selectedRow) return;

        try {

            const response = await deleteMenu(selectedRow.menuId);

            if (response.success) {

                await loadMenus();

                handleCloseDelete();

                showSnackbar("info", response.message);
            }

        } catch (error) {

            showSnackbar(
                "error",
                axios.isAxiosError<ApiResponse<number>>(error)
                    ? error.response?.data.message ?? "Failed to delete menu."
                    : "Failed to delete menu."
            );
        }
    };

    return {

        // Form
        openForm,
        editingRow,
        handleAdd,
        handleEdit,
        handleSave,
        handleCloseForm,

        // Delete
        deleteOpen,
        selectedRow,
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