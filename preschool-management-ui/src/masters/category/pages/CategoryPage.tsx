import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "../../../components/common/PageContainer";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import { DeleteDialog } from "../../../components/master-grids";
import { useCategory } from "../hooks/useCategory";
import { useCategoryCrud } from "../hooks/useCategoryCrud";
import CategoryForm from "../components/CategoryForm";
import { getCategoryColumns } from "../components/CategoryColumns";
import type { Category, CategoryFormValues } from "../types/category";
import usePermission from "../../../hooks/usePermission";

export default function CategoryPage() {
    const { t, i18n } = useTranslation("masters");

    const {
        categories,
        loading,
        loadCategories,
    } = useCategory(false);

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

    const categoryColumns = useMemo(() => {
        return getCategoryColumns(t);
    }, [t, i18n.language]);

    const defaultValues: CategoryFormValues = {
        categoryName: editingRow?.categoryName ?? "",
        isActive: editingRow?.isActive ?? true,
        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                    languageCode: x.languageCode,
                    categoryName: x.categoryName,
                }))
                : [
                    {
                        languageCode: "mr",
                        categoryName: "",
                    },
                ],
    };

    return (
        <PageContainer>
            <MasterGrid<Category>
                title={t("categoryMaster")}
                rowData={categories}
                columnDefs={categoryColumns}
                loading={loading}
                addButtonText={t("addCategory")}

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
                        ? t("common:deleteConfirmation", { name: selectedRow.categoryName })
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? t("editCategory")
                        : t("addCategory")
                }
                defaultValues={defaultValues}
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