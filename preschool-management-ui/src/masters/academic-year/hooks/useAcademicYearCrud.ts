import { useState } from "react";
import axios from "axios";
import { createAcademicYear, updateAcademicYear, deleteAcademicYear } from "../../../api/academicYearApi";
import type { AcademicYear } from "../types/academicYear";
import type { AcademicYearFormValues } from "../components/AcademicYearForm";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface UseAcademicYearCrudProps {
    loadAcademicYears: () => Promise<void>;
}

export function useAcademicYearCrud({
    loadAcademicYears,
}: UseAcademicYearCrudProps) {
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<AcademicYear | null>(null);
    const [selectedRow, setSelectedRow] = useState<AcademicYear | null>(null);
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

    const handleEdit = (row: AcademicYear) => {
        setEditingRow(row);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (data: AcademicYearFormValues) => {
        try {
            const response = editingRow
                ? await updateAcademicYear(editingRow.academicYearId, data)
                : await createAcademicYear(data);

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
                    await loadAcademicYears();
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

    const handleDelete = (row: AcademicYear) => {
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
            const response = await deleteAcademicYear(
                selectedRow.academicYearId
            );

            if (response.success) {
                await loadAcademicYears();
                handleCloseDelete();
                showSnackbar("info", response.message);
            }
        } catch {
            showSnackbar("error", "Failed to delete Academic Year.");
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