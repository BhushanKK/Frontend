import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useSection } from "../hooks/useSection";
import { useSectionCrud } from "../hooks/useSectionCrud";
import SectionForm from "../components/SectionForm";
import { SectionColumns } from "../components/SectionColumns";
import usePermission from "../../../hooks/usePermission";
import type { Section } from "../types/section";

export default function SectionPage() {
    const { Sections, loading, loadSections } = useSection(false);
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
    } = useSectionCrud({
        loadSections,
    });

    return (
        <PageContainer>
            <MasterGrid<Section>
                title="Section Master"
                rowData={Sections}
                columnDefs={SectionColumns}
                loading={loading}
                addButtonText="Add Section"
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
                title="Delete Section"
                description={
                    selectedRow
                        ? `Are you sure you want to delete "${selectedRow.SectionName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={editingRow ? "Edit Section" : "Add Section"}
                defaultValues={{
                                    SectionName: editingRow?.SectionName ?? "",
                    isActive: editingRow?.isActive ?? true,
                }}
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