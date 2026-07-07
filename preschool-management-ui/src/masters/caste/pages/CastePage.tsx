import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useCaste } from "../hooks/useCaste";
import { useCasteCrud } from "../hooks/useCasteCrud";
import CasteForm from "../components/CasteForm";
import { casteColumns } from "../components/CasteColumns";
import type { Caste } from "../types/caste";

export default function CastePage() {
    const { castes, loading, loadCastes } = useCaste();

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
    } = useCasteCrud({
        loadCastes,
    });

    return (
        <PageContainer>
            <MasterGrid<Caste>
                title="Caste Master"
                rowData={castes}
                columnDefs={casteColumns}
                loading={loading}
                addButtonText="Add Caste"
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <DeleteDialog
                open={deleteOpen}
                title="Delete Caste"
                description={
                    selectedRow
                        ? `Are you sure you want to delete "${selectedRow.caste}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={editingRow ? "Edit Caste" : "Add Caste"}
                defaultValues={{
                    categoryId: editingRow?.categoryId ?? 0,
                    caste: editingRow?.caste ?? "",
                    isActive: editingRow?.isActive ?? true,
                }}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <CasteForm />
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