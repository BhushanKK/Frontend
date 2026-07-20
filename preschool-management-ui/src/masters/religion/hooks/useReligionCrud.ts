import { useState } from "react";
import axios from "axios";
import { createReligion, updateReligion, deleteReligion, getReligionById } from "../../../api/religionApi";
import type { Religion, ReligionFormValues } from "../types/religion";
import type { ApiResponse } from "../../../types/auth";

type SnackbarSeverity = | "success" | "warning" | "error" | "info";

interface UseReligionCrudProps {
    loadReligions: () => Promise<void>;
}

export function useReligionCrud({
    loadReligions,
}: UseReligionCrudProps) {

    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingRow, setEditingRow] = useState<Religion | null>(null);
    const [selectedRow, setSelectedRow] = useState<Religion | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>("success");

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

    const handleEdit = async (
        row: Religion
    ) => {
        try {
            const response =
                await getReligionById(row.religionId);
            if (response.success) {
                setEditingRow(response.data);
                setOpenForm(true);
            }
            else {
                showSnackbar("error",response.message);
            }
        } catch {
            showSnackbar("error","Failed to load Religion details.");
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: ReligionFormValues
    ) => {

        try {
            const response = editingRow
                ? await updateReligion(editingRow.religionId,data)
                : await createReligion(data);

                switch(response.statusCode) {
                case 200:
                case 201:
                    await loadReligions();
                    handleCloseForm();
                    showSnackbar("success",response.message);

                    break;

                case 400:
                    showSnackbar("error",response.message);

                    break;

                case 409:
                    showSnackbar("warning",response.message);

                    break;

                default:
                    showSnackbar("error",response.message);

                    break;
            }
        } catch(error) {
            if (axios.isAxiosError<ApiResponse<number>>(error)) {
                showSnackbar("error",error.response?.data.message ??"Something went wrong.");
            }
            else {
                showSnackbar("error","Unexpected error occurred.");
            }
        }
    };

    //#endregion

    //#region Delete
    const handleDelete = (row: Religion) => {
        setSelectedRow(row);
        setDeleteOpen(true);
    };

    const handleCloseDelete = () => {
        setDeleteOpen(false);
        setSelectedRow(null);
    };

    const handleConfirmDelete = async () => {

        if (!selectedRow)
            return;

        try {

            const response = await deleteReligion(selectedRow.religionId);

            if(response.success) {
                await loadReligions();
                handleCloseDelete();
                showSnackbar("info",response.message);
            }
            else 
                showSnackbar("error",response.message);
        } catch {
            showSnackbar("error","Failed to delete Religion.");
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