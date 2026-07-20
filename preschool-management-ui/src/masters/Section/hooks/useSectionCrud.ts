import { useState } from "react";
import axios from "axios";
import { createSection, updateSection, deleteSection, getSectionById } from "../../../api/sectionApi";
import type { Section, SectionFormValues } from "../types/section";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "warning" | "error" | "info";

interface UseSectionCrudProps {
    loadSections: () => Promise<void>;
}

export function useSectionCrud({
    loadSections,
}: UseSectionCrudProps) {
    // Dialog State
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Selected Rows
    const [editingRow, setEditingRow] =
        useState<Section | null>(null);

    const [selectedRow, setSelectedRow] =
        useState<Section | null>(null);

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

    const handleEdit = async (row: Section) => {
        try {
            const response = await getSectionById(
                row.sectionId
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
                "Failed to load Section:",
                error
            );

            showSnackbar(
                "error",
                "Failed to load Section details."
            );
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: SectionFormValues
    ) => {
        try {
            const response = editingRow
                ? await updateSection(
                      editingRow.sectionId,
                      data
                  )
                : await createSection(data);

            switch (response.statusCode) {
                case 200:
                case 201:
                    await loadSections();

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
        row: Section
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
                await deleteSection(
                    selectedRow.sectionId
                );

            if (response.success) {
                await loadSections();

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
                "Failed to delete Section."
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