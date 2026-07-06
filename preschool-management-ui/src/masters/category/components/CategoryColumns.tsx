import type { ColDef, ICellRendererParams } from "ag-grid-community";
import type { Category } from "../types/category";
import { Chip } from "@mui/material";

export const categoryColumns: ColDef<Category>[] = [
    {
        headerName: "ID",
        field: "categoryId",
        width: 100,
    },
    {
        headerName: "Category",
        field: "categoryName",
        flex: 1
    },
    {
        headerName: "Status",
        field: "isActive",
        flex: 1,
        cellRenderer: (
            param: ICellRendererParams<Category, boolean>
        ) => (
            <Chip
                label={param.value ? "Active" : "Inacvive"}
                color={param.value ? "success" : "error"}
                size="small"
            />
        ),
    }
]