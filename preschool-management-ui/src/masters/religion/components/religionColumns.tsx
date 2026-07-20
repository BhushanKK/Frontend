import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Chip } from "@mui/material";
import type { Religion } from "../types/religion";

export const religionColumns: ColDef<Religion>[] = [
    {
        headerName: "ID",
        field: "religionId",
        width: 100,
    },
    {
        headerName: "Religion Name",
        field: "religionName",
        flex: 1,
    },
    {
        headerName: "Minority",
        field: "isMinority",
        width: 130,
        cellRenderer: (
            params: ICellRendererParams<Religion, boolean>
        ) => (
            <Chip
                label={ params.value ? "Yes" : "No" }
                color={ params.value ? "info" : "default" }
                size="small"
            />
        ),
    },
    {
        headerName: "Status",
        field: "isActive",
        width: 130,
        cellRenderer: (
            params: ICellRendererParams<Religion, boolean>) => (
            <Chip
                label={ params.value ? "Active" : "Inactive" }
                color={ params.value ? "success" : "error" }
                size="small"
            />
        ),
    },
];