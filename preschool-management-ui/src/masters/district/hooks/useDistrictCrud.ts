import { useState } from "react";
import axios from "axios";

import {
    createDistrict,
    updateDistrict,
    deleteDistrict,
    getDistrictById,
} from "../../../api/districtApi";

import type {
    District,
    DistrictFormValues,
} from "../types/district";

import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "warning" | "error" | "info";

interface UseDistrictCrudProps {
    loadDistricts: () => Promise<void>;
}

export function useDistrictCrud({
    loadDistricts,
}: UseDistrictCrudProps) {
    // Dialog State
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Selected Rows
    const [editingRow, setEditingRow] =
        useState<District | null>(null);

    const [selectedRow, setSelectedRow] =
        useState<District | null>(null);

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

    const handleEdit = async (row: District) => {
        try {
            const response = await getDistrictById(
                row.districtId
            );

            if (!response.success) {
                showSnackbar("error", response.message);
                return;
            }

            setEditingRow(response.data);
            setOpenForm(true);
        } catch (error) {
            console.error(
                "Get District By Id Error:",
                error
            );

            showSnackbar(
                "error",
                "Failed to load district details."
            );
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: DistrictFormValues
    ) => {
        try {
            const response = editingRow
                ? await updateDistrict(
                      editingRow.districtId,
                      data
                  )
                : await createDistrict(data);

            switch (response.statusCode) {
                case 200:
                case 201:
                    await loadDistricts();
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
        row: District
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
            const response = await deleteDistrict(
                selectedRow.districtId
            );

            if (response.success) {
                await loadDistricts();
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
                "Failed to delete district."
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