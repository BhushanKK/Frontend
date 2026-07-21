import { useState } from "react";
import axios from "axios";

import {
    createMedium,
    updateMedium,
    deleteMedium,
    getMediumById,
} from "../../../api/MediumApi";

import type {
    Medium,
    MediumFormValues,
} from "../types/medium";

import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity =
    | "success"
    | "warning"
    | "error"
    | "info";

interface UseMediumCrudProps {
    loadMediums: () => Promise<void>;
}

export function useMediumCrud({
    loadMediums,
}: UseMediumCrudProps) {

    // Dialog State
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Selected Rows
    const [editingRow, setEditingRow] =
        useState<Medium | null>(null);

    const [selectedRow, setSelectedRow] =
        useState<Medium | null>(null);

    // Snackbar
    const [snackbarOpen, setSnackbarOpen] =
        useState(false);

    const [snackbarMessage, setSnackbarMessage] =
        useState("");

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

    const handleEdit = async (row: Medium) => {
        try {
            const response = await getMediumById(
                row.mediumId
            );

            if (response.success) {
                setEditingRow(response.data);
                setOpenForm(true);
            } else {
                showSnackbar(
                    "error",
                    response.message
                );
            }
        } catch (error) {
            console.error(
                "Failed to load Medium:",
                error
            );

            showSnackbar(
                "error",
                "Failed to load Medium details."
            );
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: MediumFormValues
    ) => {
        try {
            const response = editingRow
                ? await updateMedium(
                      editingRow.mediumId,
                      data
                  )
                : await createMedium(data);

            switch (response.statusCode) {
                case 200:
                case 201:
                    await loadMediums();

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
            if (
                axios.isAxiosError<ApiResponse<number>>(
                    error
                )
            ) {
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
        row: Medium
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
            const response =
                await deleteMedium(
                    selectedRow.mediumId
                );

            if (response.success) {
                await loadMediums();

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
                "Failed to delete Medium."
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