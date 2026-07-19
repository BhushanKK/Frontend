import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";

import { useDivisions } from "../hooks/useDivisionCrud";
import DivisionForm from "../components/DivisionForm";
import { DivisionColumns } from "../components/DivisionColumns";

import usePermission from "../../../hooks/usePermission";
import type { division } from "../types/division";
import { useDivision } from "../hooks/useDivision";
export default function DivisionPage() {
    const {
        Division,
        loading,
        loadDivisions
    } = useDivision();

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
        selectRow,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,

        handleAdd,
        handleEdit,
        handelSave,
        handleCloseForm,

        handleDelete,
        handleConfirmDelete,
        handleCloseDelete,

        closeSnackbar,
    } = useDivisions({
        loadDivisions,
    });

    return (
        <PageContainer>

            <MasterGrid<division>
                title="Division Master"
                rowData={Division}
                columnDefs={DivisionColumns}
                loading={loading}
                addButtonText="Add Division"

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
                title="Delete Division"
                description={
                    selectRow
                        ? `Are you sure you want to delete "${selectRow.divisionName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? "Edit Division"
                        : "Add Division"
                }
                defaultValues={{
                    divisionName: editingRow?.divisionName ?? "",
                    isActive: editingRow?.isActive ?? true,
                }}
                onClose={handleCloseForm}
                onSave={handelSave}
            >
                <DivisionForm />
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