import type {
    ColDef,
    ICellRendererParams,
} from "ag-grid-community";
import { Chip } from "@mui/material";
import type { CommitteeMaster } from "../types/committee";

const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;

export const committeeColumns: ColDef<CommitteeMaster>[] = [
    {
        headerName: "Logo",
        field: "logoPath",
        width: 110,
        sortable: false,
        filter: false,
        cellRenderer: (
            params: ICellRendererParams<CommitteeMaster, string>
        ) => {
            if (!params.value) {
                return (
                    <span style={{ color: "#999" }}>
                        No Logo
                    </span>
                );
            }

            return (
                <img
                    src={`${FILE_BASE_URL}/${params.value}`}
                    alt={params.data?.committeeName}
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        padding: "2px",
                        backgroundColor: "#fff",
                    }}
                />
            );
        },
    },
    {
        headerName: "Committee Name",
        field: "committeeName",
        flex: 1.5,
    },
    {
        headerName: "Slogan",
        field: "slogan",
        flex: 2,
    },
    {
        headerName: "Status",
        field: "isActive",
        width: 120,
        cellRenderer: (
            params: ICellRendererParams<CommitteeMaster, boolean>
        ) => (
            <Chip
                label={params.value ? "Active" : "Inactive"}
                color={params.value ? "success" : "error"}
                size="small"
            />
        ),
    },
];