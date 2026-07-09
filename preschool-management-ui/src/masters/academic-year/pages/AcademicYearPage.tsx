import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useAcademicYear } from "../hooks/useAcademicYear";
import { useAcademicYearCrud } from "../hooks/useAcademicYearCrud";
import AcademicYearForm from "../components/AcademicYearForm";
import { academicYearColumns } from "../components/AcademicYearColumns";
import type { AcademicYear } from "../types/academicYear";
import usePermission from "../../../hooks/usePermission";

export default function AcademicYearPage() {

  const { academicYears, loading, loadAcademicYears } = useAcademicYear();
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
  } = useAcademicYearCrud({
    loadAcademicYears,
  });

  return (
    <PageContainer>
      <MasterGrid<AcademicYear>
        title="Academic Year Master"
        rowData={academicYears}
        columnDefs={academicYearColumns}
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
        title="Delete Academic Year"
        description={
          selectedRow
            ? `Are you sure you want to delete "${selectedRow.academicYearName}"?`
            : ""
        }
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />

      <MasterDialog
        open={openForm}
        title={
          editingRow
            ? "Edit Academic Year"
            : "Add Academic Year"
        }
        defaultValues={{
          academicYearName: editingRow?.academicYearName ?? "",
          fromDate: editingRow?.fromDate?.split("T")[0] ?? "",
          toDate: editingRow?.toDate?.split("T")[0] ?? "",
          isActive: editingRow?.isActive ?? true,
        }}
        onClose={handleCloseForm}
        onSave={handleSave}
      >
        <AcademicYearForm />
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