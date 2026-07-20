import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useReligion } from "../hooks/useReligion";
import { useReligionCrud } from "../hooks/useReligionCrud";
import type { Religion, ReligionFormValues } from "../types/religion";
import usePermission from "../../../hooks/usePermission";
import { religionColumns } from "../components/religionColumns";
import ReligionForm from "../components/religionForm";

export default function ReligionPage() {
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
                title="Religion Master"
                rowData={religions}
                columnDefs={religionColumns}
                loading={loading}
                addButtonText="Add Religion"

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
                title="Delete Religion"
                description={
                    selectedRow
                        ?
                        `Are you sure you want to delete "${selectedRow.religionName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={editingRow ? "Edit Religion" : "Add Religion"}
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