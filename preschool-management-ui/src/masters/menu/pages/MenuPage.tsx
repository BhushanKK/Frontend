import PageContainer from "../../../components/common/PageContainer";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import { DeleteDialog } from "../../../components/master-grids";
import { useMenu } from "../hooks/useMenu";
import { useMenuCrud } from "../hooks/useMenuCrud";

import MenuForm from "../components/MenuForm";

import type {
    Menu,
    MenuFormValues,
} from "../types/menu";
import { menuColumns } from "../components/MenuColumns";

export default function MenuPage() {

    const {
        menus,
        parentMenus,
        roles,
        loading,
        loadMenus,
    } = useMenu();

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

    } = useMenuCrud({
        loadMenus,
    });

    const selectedRoles =
        editingRow?.roleIds
            ? roles.filter(role =>
                editingRow.roleIds!
                    .split(",")
                    .includes(role.roleId.toString())
            )
            : [];

    return (
        <PageContainer>

            <MasterGrid<Menu>
                title="Menu Master"
                rowData={menus}
                columnDefs={menuColumns}
                loading={loading}
                addButtonText="Add Menu"
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <DeleteDialog
                open={deleteOpen}
                title="Delete Menu"
                description={
                    selectedRow
                        ? `Are you sure you want to delete "${selectedRow.menuName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog<MenuFormValues>
                open={openForm}
                title={
                    editingRow
                        ? "Edit Menu"
                        : "Add Menu"
                }
                defaultValues={{
                    parentMenuId: editingRow?.parentMenuId ?? null,
                    menuName: editingRow?.menuName ?? "",
                    menuUrl: editingRow?.menuUrl ?? "",
                    icon: editingRow?.icon ?? "",
                    displayOrder: editingRow?.displayOrder ?? 1,
                    isPublic: editingRow?.isPublic ?? false,
                    isActive: editingRow?.isActive ?? true,

                    roleIds: editingRow?.roleIds ?? "",
                    roles: selectedRoles,
                }}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <MenuForm
                    parentMenus={parentMenus}
                    roles={roles}
                />
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