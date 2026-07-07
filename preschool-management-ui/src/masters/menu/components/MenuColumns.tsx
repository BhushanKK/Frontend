import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Chip } from "@mui/material";
import type { Menu } from "../types/menu";

export const menuColumns: ColDef<Menu>[] = [
    {
        headerName: "ID",
        field: "menuId",
        width: 90,
    },
    {
        headerName: "Menu Name",
        field: "menuName",
        flex: 1.5,
    },
    {
        headerName: "Parent Menu",
        field: "parentMenuName",
        flex: 1.5,
        valueGetter: (params) => params.data?.parentMenuName || "-",
    },
    {
        headerName: "Menu URL",
        field: "menuUrl",
        flex: 2,
        valueGetter: (params) => params.data?.menuUrl || "-",
    },
    {
        headerName: "Icon",
        field: "icon",
        flex: 1,
        valueGetter: (params) => params.data?.icon || "-",
    },
    {
        headerName: "Display Order",
        field: "displayOrder",
        width: 130,
    },
    {
        headerName: "Public",
        field: "isPublic",
        width: 120,
        cellRenderer: (
            params: ICellRendererParams<Menu, boolean>
        ) => (
            <Chip
                label={params.value ? "Yes" : "No"}
                color={params.value ? "info" : "default"}
                size="small"
            />
        ),
    },
    {
        headerName: "Status",
        field: "isActive",
        width: 120,
        cellRenderer: (
            params: ICellRendererParams<Menu, boolean>
        ) => (
            <Chip
                label={params.value ? "Active" : "Inactive"}
                color={params.value ? "success" : "error"}
                size="small"
            />
        ),
    },
];