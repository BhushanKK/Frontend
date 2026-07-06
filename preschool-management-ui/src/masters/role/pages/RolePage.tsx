import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useRole } from "../hooks/useRole";
import { useRoles } from "../hooks/useRoleCrud";
import RoleForm from "../components/RoleForm";
import { RoleColumns } from "../components/RoleColumns";
import type { Role } from "../types/role";

export default function RolePage() {
    const {
        role,
        loading,
        loadRoles,
    } = useRole();

    const {
        openForm,
        editingRow,
        deleteOpen,
        selectRow,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,

        handleAdd,
        handleEdit,
        handelSave,
        handleCloseForm,

        handleDelete,
        handleConfirmDelete,
        handleCloseDelete,

        closeSnackbar,
    } = useRoles({
        loadRoles,
    });

    return (
        <PageContainer>
            <MasterGrid<Role>
                title="Role Master"
                rowData={role}
                columnDefs={RoleColumns}
                loading={loading}
                addButtonText="Add Role"
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <DeleteDialog
                open={deleteOpen}
                title="Delete Role"
                description={
                    selectRow
                        ? `Are you sure you want to delete "${selectRow.roleName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? "Edit Role"
                        : "Add Role"
                }
                defaultValues={{
                    roleName: editingRow?.roleName ?? "",
                    isActive: editingRow?.isActive ?? true,
                }}
                onClose={handleCloseForm}
                onSave={handelSave}
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