import { useState } from "react";
import axios from "axios";

import {
    createCommittee,
    updateCommittee,
    deleteCommittee,
} from "../../../api/committeeApi";

import type {
    CommitteeMaster,
    CommitteeMasterFormValues,
} from "../types/committee";

import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface UseCommitteeCrudProps {
    loadCommittees: () => Promise<void>;
}

export function useCommitteeCrud({
    loadCommittees,
}: UseCommitteeCrudProps) {
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [editingRow, setEditingRow] =
        useState<CommitteeMaster | null>(null);

    const [selectedRow, setSelectedRow] =
        useState<CommitteeMaster | null>(null);

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

    const handleEdit = (row: CommitteeMaster) => {
        setEditingRow(row);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: CommitteeMasterFormValues
    ) => {
        try {
            const response = editingRow
                ? await updateCommittee(
                      editingRow.committeeId,
                      data
                  )
                : await createCommittee(data);

            switch (response.statusCode) {
                case 200:
                case 201:
                    handleCloseForm();
                    await loadCommittees();
                    showSnackbar("success", response.message);
                    break;

                case 400:
                    showSnackbar("error", response.message);
                    break;

                case 409:
                    showSnackbar("warning", response.message);
                    break;

                default:
                    showSnackbar("error", response.message);
                    break;
            }
        } catch (error) {
            showSnackbar(
                "error",
                axios.isAxiosError<ApiResponse<string>>(error)
                    ? error.response?.data.message ??
                          "Something went wrong."
                    : "Unexpected error."
            );
        }
    };

    const handleDelete = (row: CommitteeMaster) => {
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
            const response = await deleteCommittee(
                selectedRow.committeeId
            );

            if (response.success) {
                await loadCommittees();
                handleCloseDelete();
                showSnackbar("info", response.message);
            } else {
                showSnackbar("error", response.message);
            }
        } catch (error) {
            showSnackbar(
                "error",
                axios.isAxiosError<ApiResponse<string>>(error)
                    ? error.response?.data.message ??
                          "Failed to delete Committee."
                    : "Unexpected error."
            );
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