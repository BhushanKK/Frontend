import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { DeleteDialog } from "../../../components/master-grids";
import { useRole } from "../hooks/useRole";
import { useRoles } from "../hooks/useRoleCrud";
import RoleForm from "../components/RoleForm";
import { RoleColumns } from "../components/RoleColumns";

import type { Role, RoleFormValues } from "../types/role";

import usePermission from "../../../hooks/usePermission";

export default function RolePage() {
    
    const {
        role,
        loading,
        loadRoles,
    } = useRole();

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
    } = useRoles({
        loadRoles,
    });

    const defaultValues: RoleFormValues = {
        
        roleName: editingRow?.roleName ?? "",
        isActive: editingRow?.isActive ?? true,

        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                      languageCode: x.languageCode,
                      roleName: x.roleName,
                  }))
                : [
                      {
                          languageCode: "mr",
                          roleName: "",
                      },
                  ],
    };

    return (
        <PageContainer>
            <MasterGrid<Role>
                title="Role Master"
                rowData={role}
                columnDefs={RoleColumns}
                loading={loading}
                addButtonText="Add Role"
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
                title="Delete Role"
                description={
                    selectedRow
                        ? `Are you sure you want to delete "${selectedRow.roleName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog<RoleFormValues>
                open={openForm}
                title={
                    editingRow
                        ? "Edit Role"
                        : "Add Role"
                }
                defaultValues={defaultValues}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <RoleForm />
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