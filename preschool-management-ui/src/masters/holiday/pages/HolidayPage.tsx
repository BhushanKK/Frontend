import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";

import HolidayForm from "../components/HolidayForm";

import usePermission from "../../../hooks/usePermission";
import { useHoliday } from "../hooks/useHoliday";
import { useHolidayCrud } from "../hooks/useHolidayCrud";
import { HolidayColumns } from "../components/HolidayColumns";
import type { holiday } from "../types/Holiday";

export default function HolidayPage() {

    const { Holiday, loading, loadHolidays } = useHoliday(false);
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
    } = useHolidayCrud({
        loadHolidays,
    });

    return (
        <PageContainer>
            <MasterGrid<holiday>
                title="Holiday Master"
                rowData={Holiday}
                columnDefs={HolidayColumns}
                loading={loading}
                addButtonText="Add Holiday"
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
                title="Delete Holiday"
                description={
                    selectedRow
                        ? `Are you sure you want to delete "${selectedRow.HolidayName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={editingRow ? "Edit Holiday" : "Add Holiday"}
                defaultValues={{
                    HolidayName: editingRow?.HolidayName ?? "",
                    isActive: editingRow?.isActive ?? true,
                }}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <HolidayForm />
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