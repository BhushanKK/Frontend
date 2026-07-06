import { useState } from "react";
import axios from "axios";
import { createCategory, deleteCategory, updateCategory } from "../../../api/categoryApi"
import type { Category, CategoryFormValues } from "../types/category";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface UseCategoryCrudProps {
    loadCategories: () => Promise<void>;
}

export function useCategoryCrud({
    loadCategories,
}: UseCategoryCrudProps) {
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<Category | null>(null);
    const [selectedRow, setSelectedRow] = useState<Category | null>(null);
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
    }

    const handleAdd = () => {
        setEditingRow(null);
        setOpenForm(true);
    };

    const handleEdit = (row: Category) => {
        setEditingRow(row);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (data: CategoryFormValues) => {
        try {
            const response = editingRow
                ? await updateCategory(editingRow.categoryId, data)
                : await createCategory(data);

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
                    await loadCategories();
                    showSnackbar("success", response.message);
                    break;
                default:
                    showSnackbar("error", response.message);
                    break;
            }

        } catch (error) {
            showSnackbar("error",
                axios.isAxiosError<ApiResponse<number>>(error)
                    ? error.request?.data.message ?? "something went wrong"
                    : "Unexpected error."
            );
        }
    };


    const handleDelete = (row: Category) => {
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
            const response = await deleteCategory(selectedRow.categoryId);

            if (response.success) {
                await loadCategories();
                handleCloseDelete();
                showSnackbar("info", response.message);
            }
        } catch (error) {
            showSnackbar("error", "Failed to delete category.");
        }
    }

    return {
        //Form
        openForm,
        editingRow,
        handleAdd,
        handleEdit,
        handleSave,
        handleCloseForm,

        //Delete
        deleteOpen,
        selectedRow,
        handleDelete,
        handleConfirmDelete,
        handleCloseDelete,

        //Snackbar
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        closeSnackbar
    }
}