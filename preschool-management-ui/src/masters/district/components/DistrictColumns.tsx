import type { ColDef, ICellRendererParams } from "ag-grid-community";
import type { district } from "../types/district";
import { Chip } from "@mui/material";

export const districtColumns : ColDef<district>[] = [
    {
        headerName: "Id",
        field: "districtId",
        width: 100
    },
    {
        headerName:"district",
        field:"districtName",
        width:100
    },
    {
        headerName: "Status",
        field: "isActive",
        flex: 1,
        cellRenderer: (
            params: ICellRendererParams<district, boolean>
        ) => (
            <Chip
                label={params.value ? "Active" : "Inactive"}
                color={params.value ? "success" : "error"}
                size="small"
            />
        ),
    }
];