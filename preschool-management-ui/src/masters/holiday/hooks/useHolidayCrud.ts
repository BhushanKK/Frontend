import { useState } from "react";
import axios from "axios";

import type { ApiResponse } from "../../../types/auth";
import { createHoliday, deleteHoliday, updateHoliday } from "../../../api/holidayApi";
import type { holiday, holidayFormValues } from "../types/Holiday";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface UseHolidayCrudProps {
    loadHolidays: () => Promise<void>;
}

export function useHolidayCrud({
    loadHolidays,
}: UseHolidayCrudProps) {
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<holiday | null>(null);
    const [selectedRow, setSelectedRow] = useState<holiday | null>(null);
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

    const handleEdit = (row: holiday) => {
        setEditingRow(row);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (data: holidayFormValues) => {
        try {
            const response = editingRow
                ? await updateHoliday(editingRow.HolidayId, data)
                : await createHoliday(data);

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
                    await loadHolidays();
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


    const handleDelete = (row: holiday) => {
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
            const response = await deleteHoliday(selectedRow.HolidayId);

            if (response.success) {
                await loadHolidays();
                handleCloseDelete();
                showSnackbar("info", response.message);
            }
        } catch (error) {
            showSnackbar("error", "Failed to delete Holiday.");
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