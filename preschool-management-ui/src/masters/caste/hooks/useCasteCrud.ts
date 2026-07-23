import { useState } from "react";
import axios from "axios";
import {
    createCaste,
    updateCaste,
    deleteCaste,
    getCasteById,
} from "../../../api/casteApi";
import type { Caste, CasteFormValues } from "../types/caste";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "warning" | "error" | "info";

interface UseCasteCrudProps {
    loadCastes: () => Promise<void>;
}

export function useCasteCrud({
    loadCastes,
}: UseCasteCrudProps) {
    // Dialog State
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Selected Rows
    const [editingRow, setEditingRow] = useState<Caste | null>(null);
    const [selectedRow, setSelectedRow] = useState<Caste | null>(null);

    // Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] =
        useState<SnackbarSeverity>("success");

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

    const handleEdit = async (row: Caste) => {
        try {
            const response = await getCasteById(row.casteId);

            if (!response.success) {
                showSnackbar("error", response.message);
                return;
            }

            setEditingRow(response.data);
            setOpenForm(true);
        } catch (error) {
            console.error("Get Caste By Id Error:", error);

            showSnackbar(
                "error",
                "Failed to load caste details."
            );
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: CasteFormValues
    ) => {
        try {
            const response = editingRow
                ? await updateCaste(
                      editingRow.casteId,
                      data
                  )
                : await createCaste(data);

            switch (response.statusCode) {
                case 200:
                case 201:
                    await loadCastes();
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
        row: Caste
    ) => {
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
            const response = await deleteCaste(
                selectedRow.casteId
            );

            if (response.success) {
                await loadCastes();
                handleCloseDelete();
                showSnackbar(
                    "info",
                    response.message
                );
            } else {
                showSnackbar(
                    "error",
                    response.message
                );
            }
        } catch {
            showSnackbar(
                "error",
                "Failed to delete caste."
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