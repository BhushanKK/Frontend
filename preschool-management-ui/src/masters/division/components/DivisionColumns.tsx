import type { ColDef, ICellRendererParams } from "ag-grid-community";

import { Chip } from "@mui/material";
import type { division } from "../types/division";

export const DivisionColumns : ColDef<division>[] = [
    {
        headerName: "Id",
        field: "divisionId",
        width: 100
    },
    {
        headerName:"Division",
        field:"divisionName",
        width:100
    },
    {
        headerName: "Status",
        field: "isActive",
        flex: 1,
        cellRenderer: (
            params: ICellRendererParams<division, boolean>
        ) => (
            <Chip
                label={params.value ? "Active" : "Inactive"}
                color={params.value ? "success" : "error"}
                size="small"
            />
        ),
    }
];