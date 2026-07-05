import { useState } from "react";
import axios from "axios";
import {
    createFinancialYear,
    updateFinancialYear,
    deleteFinancialYear,
} from "../../../api/financialYearApi";
import type { FinancialYear } from "../types/financialYear";
import type { FinancialYearFormValues } from "../components/FinancialYearForm";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface UseFinancialYearCrudProps {
    loadFinancialYears: () => Promise<void>;
}

export function useFinancialYearCrud({
    loadFinancialYears,
}: UseFinancialYearCrudProps) {
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<FinancialYear | null>(null);
    const [selectedRow, setSelectedRow] = useState<FinancialYear | null>(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] =
        useState<SnackbarSeverity>("success");

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

    const handleEdit = (row: FinancialYear) => {
        setEditingRow(row);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (data: FinancialYearFormValues) => {
        try {
            const response = editingRow
                ? await updateFinancialYear(editingRow.financialYearId, data)
                : await createFinancialYear(data);

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
                    await loadFinancialYears();
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

    const handleDelete = (row: FinancialYear) => {
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
            const response = await deleteFinancialYear(
                selectedRow.financialYearId
            );

            if (response.success) {
                await loadFinancialYears();
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