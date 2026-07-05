import type { ColDef, ICellRendererParams } from "ag-grid-community";
import type { Role } from "../types/role";
import { Chip } from "@mui/material";

export const RoleColumns : ColDef<Role>[] = [
    {
        headerName: "Id",
        field: "roleId",
        width: 100
    },
    {
        headerName:"Role",
        field:"roleName",
        width:100
    },
    {
        headerName: "Status",
        field: "isActive",
        flex: 1,
        cellRenderer: (
            params: ICellRendererParams<Role, boolean>
        ) => (
            <Chip
                label={params.value ? "Active" : "Inactive"}
                color={params.value ? "success" : "error"}
                size="small"
            />
        ),
    }
];