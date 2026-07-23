import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "../../../components/common/PageContainer";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { DeleteDialog } from "../../../components/master-grids";
import usePermission from "../../../hooks/usePermission";
import { useCaste } from "../hooks/useCaste";
import { useCasteCrud } from "../hooks/useCasteCrud";
import { getCasteColumns } from "../components/CasteColumns";
import CasteForm from "../components/CasteForm";
import type { Caste, CasteFormValues } from "../types/caste";

export default function CastePage() {
    const { t, i18n } = useTranslation("masters");

    const {
        castes,
        loading,
        loadCastes,
    } = useCaste(false);

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
    } = useCasteCrud({
        loadCastes,
    });

    const casteColumns = useMemo(() => {
        return getCasteColumns(t);
    }, [t, i18n.language]);

    const defaultValues: CasteFormValues = {
        categoryId: editingRow?.categoryId ?? 0,
        casteName: editingRow?.casteName ?? "",
        isActive: editingRow?.isActive ?? true,
        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                      languageCode: x.languageCode,
                      casteName: x.casteName,
                  }))
                : [
                      {
                          languageCode: "mr",
                          casteName: "",
                      },
                  ],
    };

    return (
        <PageContainer>
            <MasterGrid<Caste>
                title={t("casteMaster")}
                rowData={castes}
                columnDefs={casteColumns}
                loading={loading}
                addButtonText={t("addCaste")}

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
                              name: selectedRow.casteName,
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
                        ? t("editCaste")
                        : t("addCaste")
                }
                defaultValues={defaultValues}
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