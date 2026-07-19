import { useState } from "react";
import axios from "axios";
import { createSection, updateSection, deleteSection } from "../../../api/SectionApi";
import type { Section, SectionFormValues } from "../types/Section";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface UseSectionCrudProps {
    loadSections: () => Promise<void>;
}

export function useSectionCrud({
    loadSections,
}: UseSectionCrudProps) {
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<Section | null>(null);
    const [selectedRow, setSelectedRow] = useState<Section | null>(null);

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

    const handleEdit = (row: Section) => {
        setEditingRow(row);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (data: SectionFormValues) => {
        try {
            const response = editingRow
                ? await updateSection(editingRow.SectionId, data)
                : await createSection(data);

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
                    await loadSections();
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
                    ? error.response?.data?.message ?? "Something went wrong."
                    : "Unexpected error."
            );
        }
    };

    const handleDelete = (row: Section) => {
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
            const response = await deleteSection(selectedRow.SectionId);

            if (response.success) {
                await loadSections();
                handleCloseDelete();
                showSnackbar("info", response.message);
            }
        } catch {
            showSnackbar("error", "Failed to delete Section.");
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