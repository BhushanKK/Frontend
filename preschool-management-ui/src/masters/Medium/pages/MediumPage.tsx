import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "../../../components/common/PageContainer";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import { DeleteDialog } from "../../../components/master-grids";
import usePermission from "../../../hooks/usePermission";
import i18n from "../../../i18n";
import { useMedium } from "../hooks/useMedium";
import { useMediumCrud } from "../hooks/useMediumCrud";
import MediumForm from "../components/MediumForm";
import { getMediumColumns } from "../components/MediumColumns";

import type { Medium, MediumFormValues } from "../types/medium";

export default function MediumPage() {
    const { t } = useTranslation([
        "common",
        "masters",
    ]);

    const {
        mediums,
        loading,
        loadMediums,
    } = useMedium();

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
    } = useMediumCrud({
        loadMediums,
    });

    const mediumColumns = useMemo(() => {
        return getMediumColumns(t);
    }, [t, i18n.language]);

    const defaultValues: MediumFormValues = {
        mediumName: editingRow?.mediumName ?? "",
        isActive: editingRow?.isActive ?? true,

        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                      languageCode: x.languageCode,
                      mediumName: x.mediumName,
                  }))
                : [
                      {
                          languageCode: "mr",
                          mediumName: "",
                      },
                  ],
    };

    return (
        <PageContainer>
            <MasterGrid<Medium>
                title={t("masters:mediumMaster")}
                rowData={mediums}
                columnDefs={mediumColumns}
                loading={loading}
                addButtonText={t("masters:addMedium")}

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
                              name: selectedRow.mediumName,
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
                        ? t("masters:editMedium")
                        : t("masters:addMedium")
                }
                defaultValues={defaultValues}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <MediumForm />
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