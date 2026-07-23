import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";

import { useRole } from "../hooks/useRole";
import { useRoleCrud } from "../hooks/useRoleCrud";

import RoleForm from "../components/RoleForm";
import { getRoleColumns } from "../components/RoleColumns";

import type {
    Role,
    RoleFormValues,
} from "../types/role";

import usePermission from "../../../hooks/usePermission";

export default function RolePage() {
    const { t, i18n } = useTranslation([
        "common",
        "masters",
    ]);

    const {
        roles,
        loading,
        pagination,
        setPageNumber,
        setPageSize,
        setSearchText,
        loadRoles,
    } = useRole(false);

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
    } = useRoleCrud({
        loadRoles,
    });

    const roleColumns = useMemo(() => {
        return getRoleColumns(t);
    }, [t, i18n.language]);

    const defaultValues: RoleFormValues = {
        roleName:
            editingRow?.roleName ?? "",

        isActive:
            editingRow?.isActive ?? true,

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
                title={t("masters:roleMaster")}
                rowData={roles}
                columnDefs={roleColumns}
                loading={loading}

                pagination={pagination}
                onPageChange={setPageNumber}
                onPageSizeChange={setPageSize}
                onSearch={setSearchText}

                addButtonText={t("masters:addRole")}

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
                title={t("common:confirmDelete")}
                description={
                    selectedRow
                        ? t(
                            "common:deleteConfirmation",
                            {
                                name: selectedRow.roleName,
                            }
                        )
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? t("masters:editRole")
                        : t("masters:addRole")
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