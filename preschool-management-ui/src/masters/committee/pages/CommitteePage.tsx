import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { DeleteDialog } from "../../../components/master-grids";
import CommitteeForm from "../components/CommitteeForm";
import { committeeColumns } from "../components/CommitteeColumns";
import { useCommittee } from "../hooks/useCommittee";
import { useCommitteeCrud } from "../hooks/useCommitteeCrud";
import type { CommitteeMaster } from "../types/committee";
import usePermission from "../../../hooks/usePermission";

export default function CommitteePage() {
    const {
        committees,
        loading,
        loadCommittees,
    } = useCommittee(false);

    const {
        canAdd,
        canEdit,
        canDelete,
        canExport,
        canPrint,
    } = usePermission();
console.log({
    canAdd,
    canEdit,
    canDelete,
    canExport,
    canPrint
});
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
    } = useCommitteeCrud({
        loadCommittees,
    });

    return (
        <PageContainer>
            <MasterGrid<CommitteeMaster>
                title="Committee Master"
                rowData={committees}
                columnDefs={committeeColumns}
                loading={loading}
                addButtonText="Add Committee"
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
                title="Delete Committee"
                description={
                    selectedRow
                        ? `Are you sure you want to delete "${selectedRow.committeeName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? "Edit Committee"
                        : "Add Committee"
                }
                defaultValues={{
                    committeeName: editingRow?.committeeName ?? "",
                    slogan: editingRow?.slogan ?? "",
                    isActive: editingRow?.isActive ?? true,

                    // File inputs cannot be pre-populated
                    logo: null,
                }}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <CommitteeForm
                    existingLogo={editingRow?.logoPath}
                />
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