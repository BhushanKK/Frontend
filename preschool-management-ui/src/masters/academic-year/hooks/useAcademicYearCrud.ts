import { useState } from "react";
import axios from "axios";
import { createAcademicYear, updateAcademicYear, deleteAcademicYear, getAcademicYearById } from "../../../api/academicYearApi";
import type { AcademicYear, AcademicYearFormValues } from "../types/academicYear";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "warning" | "error" | "info";

interface UseAcademicYearCrudProps {
    loadAcademicYears: () => Promise<void>;
}

export function useAcademicYearCrud({
    loadAcademicYears,
}: UseAcademicYearCrudProps) {

    // Dialog State
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Selected Rows
    const [editingRow, setEditingRow] =
        useState<AcademicYear | null>(null);

    const [selectedRow, setSelectedRow] =
        useState<AcademicYear | null>(null);

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

    const handleEdit = async (row: AcademicYear) => {
    try {
        const response = await getAcademicYearById(row.academicYearId);

        if (response.success) {
            setEditingRow(response.data);
            setOpenForm(true);
        } else {
            showSnackbar("error", response.message);
        }
    } catch (error) {
        console.error("Failed to load Academic Year:", error);

        showSnackbar(
            "error",
            "Failed to load Academic Year details."
        );
    }
};

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: AcademicYearFormValues
    ) => {
        try {
            const response = editingRow
                ? await updateAcademicYear(
                    editingRow.academicYearId,
                    data
                )
                : await createAcademicYear(data);

            switch (response.statusCode) {
                case 200:
                case 201:
                    await loadAcademicYears();

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
                "Failed to delete Academic Year."
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