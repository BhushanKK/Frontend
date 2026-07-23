import { useState } from "react";
import axios from "axios";

import type { ApiResponse } from "../../../types/auth";
import type { State, StateFormValues } from "../types/state";

import {
    createState,
    updateState,
    deleteState,
    getStateById,
} from "../../../api/stateApi";

type SnackbarSeverity =
    | "success"
    | "warning"
    | "error"
    | "info";

interface UseStateCrudProps {
    loadStates: () => Promise<void>;
}

export function useStateCrud({
    loadStates,
}: UseStateCrudProps) {

    // Dialog State
    const [openForm, setOpenForm] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    // Selected Rows
    const [editingRow, setEditingRow] =
        useState<State | null>(null);

    const [selectedRow, setSelectedRow] =
        useState<State | null>(null);

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

    const handleEdit = async (
        row: State
    ) => {
        try {

            const response =
                await getStateById(
                    row.stateId
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

            console.error(error);

            showSnackbar(
                "error",
                "Failed to load State details."
            );
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: StateFormValues
    ) => {
        try {

            const response = editingRow
                ? await updateState(
                    editingRow.stateId,
                    data
                )
                : await createState(data);

            switch (response.statusCode) {

                case 200:
                case 201:

                    await loadStates();

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
                axios.isAxiosError<ApiResponse<number>>(error)
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
        row: State
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
                await deleteState(
                    selectedRow.stateId
                );

            if (response.success) {

                await loadStates();

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
                "Failed to delete State."
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