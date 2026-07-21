import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "../../../components/common/PageContainer";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import { DeleteDialog } from "../../../components/master-grids";
import usePermission from "../../../hooks/usePermission";
import i18n from "../../../i18n";
import { useStandard } from "../hooks/useStandard";
import { useStandardCrud } from "../hooks/useStandardCrud";
import { getStandardColumns } from "../components/StandardColumns";
import StandardForm from "../components/StandardForm";

import type {
    Standard,
    StandardFormValues,
} from "../types/standard";

export default function StandardPage() {
    const { t } = useTranslation([
        "common",
        "masters",
    ]);

    const {
        standards,
        loading,
        loadStandards,
    } = useStandard(false);

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
    } = useStandardCrud({
        loadStandards,
    });

    const standardColumns = useMemo(() => {
        return getStandardColumns(t);
    }, [t, i18n.language]);

    const defaultValues: StandardFormValues = {
        standardName: editingRow?.standardName ?? "",
        isActive: editingRow?.isActive ?? true,

        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                      languageCode: x.languageCode,
                      standardName: x.standardName,
                  }))
                : [
                      {
                          languageCode: "mr",
                          standardName: "",
                      },
                  ],
    };

    return (
        <PageContainer>
            <MasterGrid<Standard>
                title={t("masters:standardMaster")}
                rowData={standards}
                columnDefs={standardColumns}
                loading={loading}
                addButtonText={t("masters:addStandard")}

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
                              name: selectedRow.standardName,
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
                        ? t("masters:editStandard")
                        : t("masters:addStandard")
                }
                defaultValues={defaultValues}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <StandardForm />
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