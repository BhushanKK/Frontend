import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useReligion } from "../hooks/useReligion";
import { useReligionCrud } from "../hooks/useReligionCrud";
import type { Religion, ReligionFormValues } from "../types/religion";
import usePermission from "../../../hooks/usePermission";
import { getReligionColumns } from "../components/religionColumns";
import ReligionForm from "../components/religionForm";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import i18n from "../../../i18n";

export default function ReligionPage() {
    const { t } = useTranslation(["common", "masters"]);
    const {
        religions,
        loading,
        loadReligions,
    } = useReligion(false);

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
    } = useReligionCrud({ loadReligions });
const religionColumns = useMemo(() => {
        return getReligionColumns(t);
    }, [t, i18n.language]);
    const defaultValues: ReligionFormValues = {
        religionName: editingRow?.religionName ?? "",
        isMinority: editingRow?.isMinority ?? false,
        isActive: editingRow?.isActive ?? true,

        translations:
            editingRow?.translations?.length
                ?
                editingRow.translations.map(x => ({
                    languageCode: x.languageCode,
                    religionName: x.religionName,
                }))
                :
                [
                    {
                        languageCode: "mr",
                        religionName: "",
                    }
                ]
    };

    return (
        <PageContainer>
            <MasterGrid<Religion>
                title={t("masters:religionMaster")}
                rowData={religions}
                columnDefs={religionColumns}
                loading={loading}
                addButtonText={t("masters:addReligion")}

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
                        ? t("common:deleteConfirmation", { name: selectedRow.religionName })
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={editingRow ? t("masters:editReligion") : t("masters:addReligion")}
                defaultValues={defaultValues}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <ReligionForm />
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