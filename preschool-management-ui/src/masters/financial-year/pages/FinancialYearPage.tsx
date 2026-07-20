import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useFinancialYear } from "../hooks/useFinancialYear";
import { useFinancialYearCrud } from "../hooks/useFinancialYearCrud";
import FinancialYearForm from "../components/FinancialYearForm";
import type { FinancialYear, FinancialYearFormValues } from "../types/financialYear";
import usePermission from "../../../hooks/usePermission";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import i18n from "../../../i18n";
import { getFinancialYearColumns } from "../components/FinancialYearColumns";

export default function FinancialYearPage() {
    const { t } = useTranslation(["common", "masters"]);
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
     const financialYearColumns = useMemo(() => {
        return getFinancialYearColumns(t);
    }, [t, i18n.language]);
    const defaultValues: FinancialYearFormValues = {
        financialYearName:
            editingRow?.financialYearName ?? "",

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
                      financialYearName: x.financialYearName,
                  }))
                : [
                      {
                          languageCode: "mr",
                          financialYearName: "",
                      },
                  ],
    };

    return (
        <PageContainer>
            <MasterGrid<FinancialYear>
                title={t("masters:financialYearMaster")}
                rowData={financialYears}
                columnDefs={financialYearColumns}
                loading={loading}
                addButtonText={t("masters:addFinancialYear")}

                // Permissions
                canAdd={canAdd}
                canEdit={canEdit}
                canDelete={canDelete}
                canExport={canExport}
                canPrint={canPrint}

                // Events
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
                        ? t("masters:editFinancialYear")
                        : t("masters:addFinancialYear")
                }
                defaultValues={defaultValues}
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