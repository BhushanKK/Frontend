import type { ColDef, ICellRendererParams } from "ag-grid-community";

import { Chip } from "@mui/material";
import type { holiday } from "../types/Holiday";

export const HolidayColumns: ColDef<holiday>[] = [
    {
        headerName: "ID",
        field: "HolidayId",
        width: 100,
    },
    {
        headerName: "Holiday",
        field: "HolidayName",
        flex: 1
    },
    {
        headerName: "Status",
        field: "isActive",
        flex: 1,
        cellRenderer: (
            param: ICellRendererParams<holiday, boolean>
        ) => (
            <Chip
                label={param.value ? "Active" : "Inactive"}
                color={param.value ? "success" : "error"}
                size="small"
            />
        ),
    }
]