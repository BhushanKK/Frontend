import { useState } from "react";
import axios from "axios";

import {
    createStandard,
    updateStandard,
    deleteStandard,
    getStandardById,
} from "../../../api/standardApi";

import type {
    Standard,
    StandardFormValues,
} from "../types/standard";

import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity =
    | "success"
    | "warning"
    | "error"
    | "info";

interface UseStandardCrudProps {
    loadStandards: () => Promise<void>;
}

export function useStandardCrud({
    loadStandards,
}: UseStandardCrudProps) {

    // Dialog State
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Selected Rows
    const [editingRow, setEditingRow] =
        useState<Standard | null>(null);

    const [selectedRow, setSelectedRow] =
        useState<Standard | null>(null);

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

    const handleEdit = async (row: Standard) => {
        try {
            const response = await getStandardById(
                row.standardId
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
                "Failed to load Standard:",
                error
            );

            showSnackbar(
                "error",
                "Failed to load Standard details."
            );
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: StandardFormValues
    ) => {
        try {
            const response = editingRow
                ? await updateStandard(
                      editingRow.standardId,
                      data
                  )
                : await createStandard(data);

            switch (response.statusCode) {
                case 200:
                case 201:
                    await loadStandards();

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
        row: Standard
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
                await deleteStandard(
                    selectedRow.standardId
                );

            if (response.success) {
                await loadStandards();

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
                "Failed to delete Standard."
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