import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useFinancialYear } from "../hooks/useFinancialYear";
import { useFinancialYearCrud } from "../hooks/useFinancialYearCrud";
import FinancialYearForm from "../components/FinancialYearForm";
import { financialYearColumns } from "../components/FinancialYearColumns";
import type { FinancialYear } from "../types/financialYear";
import usePermission from "../../../hooks/usePermission";

export default function FinancialYearPage() {
    const {
        financialYears,
        loading,
        loadFinancialYears,
    } = useFinancialYear(false);
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
    } = useFinancialYearCrud({
        loadFinancialYears,
    });

    return (
        <PageContainer>
            <MasterGrid<FinancialYear>
                title="Financial Year Master"
                rowData={financialYears}
                columnDefs={financialYearColumns}
                loading={loading}
                addButtonText="Add Year"
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
                title="Delete Financial Year"
                description={
                    selectedRow
                        ? `Are you sure you want to delete "${selectedRow.financialYearName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? "Edit Financial Year"
                        : "Add Financial Year"
                }
                defaultValues={{
                    financialYearName:
                        editingRow?.financialYearName ?? "",
                    fromDate:
                        editingRow?.fromDate?.split("T")[0] ?? "",
                    toDate:
                        editingRow?.toDate?.split("T")[0] ?? "",
                    isActive:
                        editingRow?.isActive ?? true,
                }}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <FinancialYearForm />
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