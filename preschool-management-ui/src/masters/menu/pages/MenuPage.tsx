import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import PageContainer from "../../../components/common/PageContainer";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import { DeleteDialog } from "../../../components/master-grids";

import { useMenu } from "../hooks/useMenu";
import { useMenuCrud } from "../hooks/useMenuCrud";
import MenuForm from "../components/MenuForm";

import { getMenuColumns } from "../components/MenuColumns";

import type {
    Menu,
    MenuFormValues
} from "../types/menu";

import usePermission from "../../../hooks/usePermission";


export default function MenuPage() {

    const { t, i18n } = useTranslation([
        "common",
        "masters"
    ]);

    const language = i18n.language;


    const {
        menus,
        parentMenus,
        roles,
        loading,
        loadMenus,

    } = useMenu();



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

    } = useMenuCrud({
        loadMenus,
    });



    const menuColumns = useMemo(() => {
        return getMenuColumns(t);
    }, [t]);

    const selectedRoles =
        editingRow?.roleIds
            ? roles.filter(role =>
                editingRow.roleIds!
                    .split(",")
                    .includes(
                        role.roleId.toString()
                    )
            )
            : [];



    const defaultTranslations =
        editingRow?.translations?.length

            ? editingRow.translations

            : [
                {
                    languageCode: "mr",
                    menuName: "",
                },
            ];



    return (

        <PageContainer>


            <MasterGrid<Menu>

                title={
                    t("masters:menuMaster")
                }

                rowData={menus}

                columnDefs={menuColumns}

                loading={loading}

                addButtonText={
                    t("masters:addMenu")
                }

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

                title={
                    t(
                        "masters:deleteMenu"
                    )
                }


                description={

                    selectedRow

                        ? t(
                            "common:deleteConfirmation",
                            {
                                name:
                                selectedRow.menuName
                            }
                        )

                        : ""

                }


                onClose={handleCloseDelete}

                onConfirm={handleConfirmDelete}

            />







            <MasterDialog<MenuFormValues>

                open={openForm}


                title={

                    editingRow

                        ? t(
                            "masters:editMenu"
                        )

                        :

                        t(
                            "masters:addMenu"
                        )

                }



                defaultValues={{

                    parentMenuId:
                        editingRow?.parentMenuId
                        ?? null,


                    menuName:
                        editingRow?.menuName
                        ?? "",


                    menuUrl:
                        editingRow?.menuUrl
                        ?? "",


                    icon:
                        editingRow?.icon
                        ?? "",


                    displayOrder:
                        editingRow?.displayOrder
                        ?? 1,


                    isPublic:
                        editingRow?.isPublic
                        ?? false,


                    isActive:
                        editingRow?.isActive
                        ?? true,


                    roleIds:
                        editingRow?.roleIds
                        ?? "",


                    roles:
                        selectedRoles,


                    translations:
                        defaultTranslations,

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