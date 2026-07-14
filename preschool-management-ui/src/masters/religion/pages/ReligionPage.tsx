import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useReligion } from "../hooks/useReligion";
import { useReligionCrud } from "../hooks/useReligionCrud";
import ReligionForm from "../components/religionForm";
import usePermission from "../../../hooks/usePermission";
import type { religion } from "../types/religion";
import { religionColumns } from "../components/religionColumns";

export default function ReligionPage() {

    const { Religion, loading, loadReligions } = useReligion(false);
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
    } = useReligionCrud({loadReligions});

    return (
        <PageContainer>
            <MasterGrid<religion>
                title="Religion Master"
                rowData={Religion}
                columnDefs={religionColumns}
                loading={loading}
                addButtonText="Add Religion"
                // Permission control
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
                title="Delete Religion"
                description={
                    selectedRow
                        ? `Are you sure you want to delete "${selectedRow.religionName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={editingRow ? "Edit Religion" : "Add Religion"}
                defaultValues={{
                    religionName: editingRow?.religionName ?? ""
                    
                }}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <ReligionForm />
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