import { useState } from "react";
import axios from "axios";

import type { ApiResponse } from "../../../types/auth";
import { createReligion, deleteReligion, updateReligion } from "../../../api/religionApi";
import type { religion, religionFormValues } from "../types/religion";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface UseReligionCrudProps {
    loadReligions: () => Promise<void>;
}

export function useReligionCrud({
    loadReligions,
}: UseReligionCrudProps) {
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<religion | null>(null);
    const [selectedRow, setSelectedRow] = useState<religion | null>(null);
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

    const handleEdit = (row: religion) => {
        setEditingRow(row);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (data: religionFormValues) => {
        try {
            const response = editingRow
                ? await updateReligion(editingRow.religionId, data)
                : await createReligion(data);

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
                    await loadReligions();
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


    const handleDelete = (row: religion) => {
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
            const response = await deleteReligion(selectedRow.religionId);

            if (response.success) {
                await loadReligions();
                handleCloseDelete();
                showSnackbar("info", response.message);
            }
        } catch (error) {
            showSnackbar("error", "Failed to delete Religion.");
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