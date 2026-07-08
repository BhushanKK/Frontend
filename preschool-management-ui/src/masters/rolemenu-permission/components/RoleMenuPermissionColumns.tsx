import { Checkbox } from "@mui/material";
import type {
    ColDef,
    ICellRendererParams,
} from "ag-grid-community";

import type { RoleMenuPermission } from "../types/roleMenuPermission";

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
        headerName: "Menu",
        field: "menuName",
        minWidth: 250,
        pinned: "left",
    },

    {
        headerName: "View",
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
        headerName: "Add",
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
        headerName: "Edit",
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
        headerName: "Delete",
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
        headerName: "Print",
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
        headerName: "Export",
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