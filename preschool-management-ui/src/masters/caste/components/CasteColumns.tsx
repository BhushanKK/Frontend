import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Chip } from "@mui/material";
import type { Caste } from "../types/caste";

export const casteColumns: ColDef<Caste>[] = [
    {
        headerName: "ID",
        field: "casteId",
        width: 100,
    },
    {
        headerName: "Category",
        field: "categoryName",
        flex: 1,
    },
    {
        headerName: "Caste",
        field: "caste",
        flex: 1,
    },
    {
        headerName: "Status",
        field: "isActive",
        flex: 1,
        cellRenderer: (
            params: ICellRendererParams<Caste, boolean>
        ) => (
            <Chip
                label={params.value ? "Active" : "Inactive"}
                color={params.value ? "success" : "error"}
                size="small"
            />
        ),
    },
];