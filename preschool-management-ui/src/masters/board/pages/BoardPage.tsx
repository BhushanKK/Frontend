import PageContainer from "../../../components/common/PageContainer";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { DeleteDialog } from "../../../components/master-grids";
import { useBoard } from "../hooks/useBoard";
import { useBoardCrud } from "../hooks/useBoardCrud";
import usePermission from "../../../hooks/usePermission";
import type { Board, BoardFormValues } from "../types/boardApi";
import { getBoardColumns } from "../component/BoardColumns";
import BoardForm from "../component/BoardForm";
import { t } from "i18next";
import i18n from "../../../i18n";
import { useMemo } from "react";

export default function BoardPage() {

    const {
        boards,
        loading,
        loadBoards,
    } = useBoard();

    const {
        canAdd,
        canEdit,
        canDelete,
        canExport,
        canPrint,
    } = usePermission();

    const {
        openForm,
        editingRow,

        deleteOpen,
        selectedRow,

        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,

        handleAdd,
        handleEdit,
        handleSave,
        handleCloseForm,

        handleDelete,
        handleConfirmDelete,
        handleCloseDelete,

        closeSnackbar,
    } = useBoardCrud({
        loadBoards,
    });
    const boardColumns = useMemo(() => {
            return getBoardColumns(t);
        }, [t, i18n.language]);
    const defaultValues: BoardFormValues = {
        boardName: editingRow?.boardName ?? "",
        isActive: editingRow?.isActive ?? true,

        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                    languageCode: x.languageCode,
                    boardName: x.boardName,
                }))
                : [
                    {
                        languageCode: "mr",
                        boardName: "",
                    },
                ],
    };

    return (
        <PageContainer>
            <MasterGrid<Board>
                title={t("masters:boardMaster")}
                rowData={boards}
                columnDefs={boardColumns}
                loading={loading}
                addButtonText={t("masters:addBoard")}

                canAdd={canAdd}
                canEdit={canEdit}
                canDelete={canDelete}
                canExport={canExport}
                canPrint={canPrint}

                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <DeleteDialog
                open={deleteOpen}
                title={t("common:confirmDelete")}
                description={
                    selectedRow
                        ? t("common:deleteConfirmation", { name: selectedRow.boardName })
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? t("masters:editBoard")
                        : t("masters:addBoard")
                }
                defaultValues={defaultValues}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <BoardForm />
            </MasterDialog>

            <AppSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={closeSnackbar}
            />
        </PageContainer>
    );
}