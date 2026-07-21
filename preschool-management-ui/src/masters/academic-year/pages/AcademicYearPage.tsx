import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useAcademicYear } from "../hooks/useAcademicYear";
import { useAcademicYearCrud } from "../hooks/useAcademicYearCrud";
import AcademicYearForm from "../components/AcademicYearForm";
import { getAcademicYearColumns } from "../components/AcademicYearColumns";
import type { AcademicYear, AcademicYearFormValues } from "../types/academicYear";
import usePermission from "../../../hooks/usePermission";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export default function AcademicYearPage() {
const { t, i18n } = useTranslation(["common", "masters"]);
const language = i18n.language;
  const {
    academicYears,
    loading,
    loadAcademicYears
  } = useAcademicYear(false);

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
  const academicYearColumns = useMemo(() => {
        return getAcademicYearColumns(t,language);
  }, [t, i18n.language]);
  const defaultValues: AcademicYearFormValues = {
    academicYearName: editingRow?.academicYearName ?? "",
    fromDate:
      editingRow?.fromDate?.split("T")[0] ?? "",
    toDate:
      editingRow?.toDate?.split("T")[0] ?? "",
    isActive:
      editingRow?.isActive ?? true,

    translations:
      editingRow?.translations?.length
        ? editingRow.translations.map((x) => ({
          languageCode: x.languageCode,
          academicYearName: x.academicYearName,
        }))
        : [
          {
            languageCode: "mr",
            academicYearName: "",
          },
        ],
  };
  return (
    <PageContainer>
      <MasterGrid<AcademicYear>
        title={t("masters:academicYearMaster")}
        rowData={academicYears}
        columnDefs={academicYearColumns}
        loading={loading}
        addButtonText = {t("masters:addAcademicYear")}
        // Permissions
        canAdd={canAdd}
        canEdit={canEdit}
        canDelete={canDelete}
        canExport={canExport}
        canPrint={canPrint}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Delete Confirmation */}
      <DeleteDialog
        open={deleteOpen}
        title={t("common:confirmDelete")}
        description={
          selectedRow
              ? t("common:deleteConfirmation", { name: selectedRow.academicYearName })
              : ""                
        }
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />

      {/* Add / Edit Dialog */}

      <MasterDialog
        open={openForm}
        title={
          editingRow
            ? t("masters:editAcademicYear")
            : t("masters:addAcademicYear")
        }
        defaultValues={defaultValues}
        onClose={handleCloseForm}
        onSave={handleSave}
      >
        <AcademicYearForm />
      </MasterDialog>

      {/* Snackbar */}

      <AppSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={closeSnackbar}
      />
    </PageContainer>
  );
}