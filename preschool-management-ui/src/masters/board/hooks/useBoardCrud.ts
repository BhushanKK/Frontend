import { useState } from "react";
import axios from "axios";
import type { ApiResponse } from "../../../types/auth";
import type { Board, BoardFormValues } from "../types/boardApi";
import {createBoard,updateBoard,deleteBoard,getBoardById} from "../../../api/boardApi";

type SnackbarSeverity = "success" | "warning" | "error" | "info";

interface UseBoardCrudProps {
    loadBoards: () => Promise<void>;
}

export function useBoardCrud({
    loadBoards,
}: UseBoardCrudProps) {

    // Dialog State
    const [openForm, setOpenForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Selected Rows
    const [editingRow, setEditingRow] =
        useState<Board | null>(null);

    const [selectedRow, setSelectedRow] =
        useState<Board | null>(null);

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

    const handleEdit = async (row: Board) => {
        try {
            const response = await getBoardById(row.boardId);

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
            console.error(error);

            showSnackbar(
                "error",
                "Failed to load Board details."
            );
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingRow(null);
    };

    const handleSave = async (
        data: BoardFormValues
    ) => {
        try {

            const response = editingRow
                ? await updateBoard(
                    editingRow.boardId,
                    data
                )
                : await createBoard(data);

            switch (response.statusCode) {

                case 200:
                case 201:

                    await loadBoards();

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

    const handleDelete = (
        row: Board
    ) => {
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

            const response =
                await deleteBoard(
                    selectedRow.boardId
                );

            if (response.success) {

                await loadBoards();

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
                "Failed to delete Board."
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