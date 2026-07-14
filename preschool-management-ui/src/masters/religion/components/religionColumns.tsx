import type { ColDef } from "ag-grid-community";
import type { religion } from "../types/religion";
export const religionColumns: ColDef<religion>[] = [
    {
        headerName: "ID",
        field: "religionId",
        width: 100,
    },
    {
        headerName: "religion",
        field: "religionName",
        flex: 1
    }
  
]