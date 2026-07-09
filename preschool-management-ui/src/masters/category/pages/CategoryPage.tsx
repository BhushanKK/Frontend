import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useCategory } from "../hooks/useCategory";
import { useCategoryCrud } from "../hooks/useCategoryCrud";
import CategoryForm from "../components/CategoryForm";
import { categoryColumns } from "../components/CategoryColumns";
import type { Category } from "../types/category";
import usePermission from "../../../hooks/usePermission";

export default function CategoryPage() {

    const { category, loading, loadCategories } = useCategory(false);
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
    } = useCategoryCrud({
        loadCategories,
    });

    return (
        <PageContainer>
            <MasterGrid<Category>
                title="Category Master"
                rowData={category}
                columnDefs={categoryColumns}
                loading={loading}
                addButtonText="Add Category"
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
                title="Delete Category"
                description={
                    selectedRow
                        ? `Are you sure you want to delete "${selectedRow.categoryName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={editingRow ? "Edit Category" : "Add Category"}
                defaultValues={{
                    categoryName: editingRow?.categoryName ?? "",
                    isActive: editingRow?.isActive ?? true,
                }}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <CategoryForm />
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