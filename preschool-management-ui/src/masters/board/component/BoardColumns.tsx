import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Chip } from "@mui/material";
import type { Board } from "../types/boardApi";

export const boardColumns: ColDef<Board>[] = [
    {
        headerName: "ID",
        field: "boardId",
        width: 100,
    },
    {
        headerName: "Board Name",
        field: "boardName",
        flex: 1,
    },
    {
        headerName: "Status",
        field: "isActive",
        width: 130,
        cellRenderer: (
            params: ICellRendererParams<Board, boolean>
        ) => (
            <Chip
                label={params.value ? "Active" : "Inactive"}
                color={params.value ? "success" : "error"}
                size="small"
            />
        ),
    },
];