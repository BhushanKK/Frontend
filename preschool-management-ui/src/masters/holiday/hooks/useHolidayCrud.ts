import { useState } from "react";
import axios from "axios";
import { createHoliday, updateHoliday, deleteHoliday, getHolidayById } from "../../../api/holidayApi";
import type { Holiday, HolidayFormValues } from "../types/Holiday";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity =
    | "success"
    | "warning"
    | "error"
    | "info";

interface UseHolidayCrudProps {
    loadHolidays: () => Promise<void>;
}

export function useHolidayCrud({
    loadHolidays,
}: UseHolidayCrudProps) {

    // Dialog State
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Selected Rows
    const [editingRow, setEditingRow] =
        useState<Holiday | null>(null);

    const [selectedRow, setSelectedRow] =
        useState<Holiday | null>(null);

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

    const handleEdit = async (row: Holiday) => {
        try {
            const response = await getHolidayById(
                row.holidayId
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
                "Failed to load Holiday:",
                error
            );

            showSnackbar(
                "error",
                "Failed to load Holiday details."
            );
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: HolidayFormValues
    ) => {
        try {
            const response = editingRow
                ? await updateHoliday(
                      editingRow.holidayId,
                      data
                  )
                : await createHoliday(data);

            switch (response.statusCode) {
                case 200:
                case 201:
                    await loadHolidays();

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
            if (axios.isAxiosError<ApiResponse<number>>(error))
                showSnackbar("error",error.response?.data.message ??"Something went wrong.");
             else 
                showSnackbar("error","Unexpected error occurred.");
        }
    };

    //#endregion

    //#region Delete

    const handleDelete = (
        row: Holiday
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
                await deleteHoliday(
                    selectedRow.holidayId
                );

            if (response.success) {
                await loadHolidays();

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
                "Failed to delete Holiday."
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