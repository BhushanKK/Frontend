import { Checkbox } from "@mui/material";
import type {
    ColDef,
    ICellRendererParams,
} from "ag-grid-community";

import type { RoleMenuPermission } from "../types/roleMenuPermission";
import { t } from "i18next";

interface Props {
    onPermissionChange: (
        menuId: number,
        field: keyof RoleMenuPermission,
        value: boolean
    ) => void;
}

const renderCheckBox = (
    params: ICellRendererParams<RoleMenuPermission>,
    field: keyof RoleMenuPermission,
    onPermissionChange: Props["onPermissionChange"]
) => {

    if (!params.data)
        return null;

    return (
        <Checkbox
            size="small"
            checked={Boolean(params.data[field])}
            onChange={(e) =>
                onPermissionChange(
                    params.data!.menuId,
                    field,
                    e.target.checked
                )
            }
        />
    );
};

export const RoleMenuPermissionColumns = ({
    onPermissionChange,
}: Props): ColDef<RoleMenuPermission>[] => [

    {
        headerName: t("masters:menu"),
        field: "menuName",
        minWidth: 250,
        pinned: "left",
    },

    {
        headerName: t("common:roleMenuView"),
        field: "canView",
        width: 90,
        sortable: false,
        filter: false,
        floatingFilter: false,
        cellRenderer: (
            params: ICellRendererParams<RoleMenuPermission>
        ) =>
            renderCheckBox(
                params,
                "canView",
                onPermissionChange
            ),
    },

    {
        headerName: t("common:roleMenuAdd"),
        field: "canAdd",
        width: 90,
        sortable: false,
        filter: false,
        floatingFilter: false,
        cellRenderer: (
            params: ICellRendererParams<RoleMenuPermission>
        ) =>
            renderCheckBox(
                params,
                "canAdd",
                onPermissionChange
            ),
    },

    {
        headerName: t("common:roleMenuEdit"),
        field: "canEdit",
        width: 90,
        sortable: false,
        filter: false,
        floatingFilter: false,
        cellRenderer: (
            params: ICellRendererParams<RoleMenuPermission>
        ) =>
            renderCheckBox(
                params,
                "canEdit",
                onPermissionChange
            ),
    },

    {
        headerName: t("common:roleMenuDelete"),
        field: "canDelete",
        width: 90,
        sortable: false,
        filter: false,
        floatingFilter: false,
        cellRenderer: (
            params: ICellRendererParams<RoleMenuPermission>
        ) =>
            renderCheckBox(
                params,
                "canDelete",
                onPermissionChange
            ),
    },

    {
        headerName: t("common:roleMenuPrint"),
        field: "canPrint",
        width: 90,
        sortable: false,
        filter: false,
        floatingFilter: false,
        cellRenderer: (
            params: ICellRendererParams<RoleMenuPermission>
        ) =>
            renderCheckBox(
                params,
                "canPrint",
                onPermissionChange
            ),
    },

    {
        headerName: t("common:roleMenuExport"),
        field: "canExport",
        width: 90,
        sortable: false,
        filter: false,
        floatingFilter: false,
        cellRenderer: (
            params: ICellRendererParams<RoleMenuPermission>
        ) =>
            renderCheckBox(
                params,
                "canExport",
                onPermissionChange
            ),
    },
];