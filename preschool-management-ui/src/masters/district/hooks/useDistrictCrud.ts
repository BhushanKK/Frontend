import { useState } from "react";
import axios from "axios";

import type { ApiResponse } from "../../../types/auth";
import type { district, districtFormValues } from "../types/district";
import { createDistrict, deleteDistrict, updateDistrict } from "../../../api/districtApi";

type SnackbarSeverity = "success" | "warning" | "error" | "info";

interface UseDistrictCrudProps {
    loadDistricts: () => Promise<void>;
}

export function useDistrictCrud({
    loadDistricts }: UseDistrictCrudProps) {
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<district | null>(null);
    const [selectRow, setSelectRow] = useState<district | null>(null);

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

    const handleEdit = (row: district) => {
        setEditingRow(row);
        setOpenForm(true);
    }

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    }

    const handelSave = async (data: districtFormValues) => {
        try {
            const response = editingRow
                ? await updateDistrict(editingRow.districtId, data)
                : await createDistrict(data);

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
                    await loadDistricts();
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

    const handleDelete = (row: district) => {
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
            const response = await deleteDistrict(
                selectRow.districtId
            );

            if (response.success) {
                await loadDistricts();
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
