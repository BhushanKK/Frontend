import { useState } from "react";
import axios from "axios";
import { createCategory, updateCategory, deleteCategory, getCategoryById } from "../../../api/categoryApi";
import type { Category, CategoryFormValues } from "../types/category";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "warning" | "error" | "info";

interface UseCategoryCrudProps {
    loadCategories: () => Promise<void>;
}

export function useCategoryCrud({
    loadCategories,
}: UseCategoryCrudProps) {

    // Dialog State
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Selected Rows
    const [editingRow, setEditingRow] = useState<Category | null>(null);
    const [selectedRow, setSelectedRow] = useState<Category | null>(null);
    // Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>("success");

    //#region Snackbar

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

    //#endregion

    //#region Form

    const handleAdd = () => {
        setEditingRow(null);
        setOpenForm(true);
    };

    const handleEdit = async (row: Category) => {
        try {
            const response = await getCategoryById(row.categoryId);

            if (!response.success) {
                showSnackbar("error", response.message);
                return;
            }

            setEditingRow(response.data);
            setOpenForm(true);
        } catch (error) {
            console.error("Get Category By Id Error:", error);

            if (axios.isAxiosError(error)) {
                console.log(error.response?.status);
                console.log(error.response?.data);
            }

            showSnackbar(
                "error",
                "Failed to load category details."
            );
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: CategoryFormValues
    ) => {
        try {
            const response = editingRow
                ? await updateCategory(
                    editingRow.categoryId,
                    data
                )
                : await createCategory(data);

            switch (response.statusCode) {
                case 200:
                case 201:
                    await loadCategories();
                    handleCloseForm();
                    showSnackbar(
                        "success",
                        response.message
                    );
                    break;

                case 400:
                    showSnackbar(
                        "error",
                        response.message
                    );
                    break;

                case 409:
                    showSnackbar(
                        "warning",
                        response.message
                    );
                    break;
                default:
                    showSnackbar(
                        "error",
                        response.message
                    );
                    break;
            }
        } catch (error) {
            if (axios.isAxiosError<ApiResponse<number>>(error)) {
                showSnackbar(
                    "error",
                    error.response?.data.message ??
                    "Something went wrong."
                );
            } else {

                showSnackbar(
                    "error",
                    "Unexpected error occurred."
                );
            }
        }
    };
    //#endregion

    //#region Delete

    const handleDelete = (
        row: Category
    ) => {
        setSelectedRow(row);
        setDeleteOpen(true);
    };

    const handleCloseDelete = () => {
        setDeleteOpen(false);
        setSelectedRow(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectedRow)
            return;
        try {
            const response =
                await deleteCategory(
                    selectedRow.categoryId
                );
            if (response.success) {
                await loadCategories();
                handleCloseDelete();
                showSnackbar(
                    "info",
                    response.message
                );
            }
            else {
                showSnackbar(
                    "error",
                    response.message
                );
            }
        } catch {
            showSnackbar(
                "error",
                "Failed to delete Category."
            );
        }
    };

    //#endregion

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