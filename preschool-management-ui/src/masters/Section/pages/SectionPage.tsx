import PageContainer from "../../../components/common/PageContainer";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import { DeleteDialog } from "../../../components/master-grids";
import { useSection } from "../hooks/useSection";
import { useSectionCrud } from "../hooks/useSectionCrud";
import SectionForm from "../components/SectionForm";
import { sectionColumns } from "../components/SectionColumns";
import type { Section, SectionFormValues } from "../types/section";
import usePermission from "../../../hooks/usePermission";

export default function SectionPage() {
    const {
        sections,
        loading,
        loadSections,
    } = useSection(false);

    const {
        canAdd,
        canEdit,
        canDelete,
        canExport,
        canPrint,
    } = usePermission();
console.log(usePermission);
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
    } = useSectionCrud({
        loadSections,
    });

    const defaultValues: SectionFormValues = {
        sectionName: editingRow?.sectionName ?? "",
        isActive: editingRow?.isActive ?? true,

        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                    languageCode: x.languageCode,
                    sectionName: x.sectionName,
                }))
                : [
                    {
                        languageCode: "mr",
                        sectionName: "",
                    },
                ],
    };

    return (
        <PageContainer>
            <MasterGrid<Section>
                title="Section Master"
                rowData={sections}
                columnDefs={sectionColumns}
                loading={loading}
                addButtonText="Add Section"

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
                title="Delete Section"
                description={
                    selectedRow
                        ? `Are you sure you want to delete "${selectedRow.sectionName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? "Edit Section"
                        : "Add Section"
                }
                defaultValues={defaultValues}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <SectionForm />
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