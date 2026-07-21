import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "../../../components/common/PageContainer";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import { DeleteDialog } from "../../../components/master-grids";
import usePermission from "../../../hooks/usePermission";
import i18n from "../../../i18n";
import { useDivision } from "../hooks/useDivision";
import { useDivisionCrud } from "../hooks/useDivisionCrud";
import { getDivisionColumns } from "../components/DivisionColumns";
import DivisionForm from "../components/DivisionForm";
import type { Division, DivisionFormValues } from "../types/division";

export default function DivisionPage() {
    const { t } = useTranslation([
        "common",
        "masters",
    ]);

    const {
        divisions,
        loading,
        loadDivisions,
    } = useDivision(false);

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
    } = useDivisionCrud({
        loadDivisions,
    });

    const divisionColumns = useMemo(() => {
        return getDivisionColumns(t);
    }, [t, i18n.language]);

    const defaultValues: DivisionFormValues = {
        divisionName: editingRow?.divisionName ?? "",
        isActive: editingRow?.isActive ?? true,

        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                      languageCode: x.languageCode,
                      divisionName: x.divisionName,
                  }))
                : [
                      {
                          languageCode: "mr",
                          divisionName: "",
                      },
                  ],
    };

    return (
        <PageContainer>
            <MasterGrid<Division>
                title={t("masters:divisionMaster")}
                rowData={divisions}
                columnDefs={divisionColumns}
                loading={loading}
                addButtonText={t("masters:addDivision")}

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
                title={t("common:confirmDelete")}
                description={
                    selectedRow
                        ? t("common:deleteConfirmation", {
                              name: selectedRow.divisionName,
                          })
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? t("masters:editDivision")
                        : t("masters:addDivision")
                }
                defaultValues={defaultValues}
                onClose={handleCloseForm}
                onSave={handleSave}
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