import { Box } from "@mui/material";
import type { ColDef } from "ag-grid-community";
import type { CommitteeMaster } from "../types/committee";

const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;

const getLogoUrl = (path?: string | null) => {
    if (!path) return null;

    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    return `${FILE_BASE_URL}/${path.replace(/^\/+/, "")}`;
};

export const getCommitteeColumns = (
    onLogoClick: (logoUrl: string) => void
): ColDef<CommitteeMaster>[] => [
    {
        headerName: "Logo",
        field: "logoPath",
        width: 100,
        cellRenderer: (params: any) => {
            const logoUrl = getLogoUrl(params.value);

            if (!logoUrl) return "No Logo";

            return (
                <Box
                    component="img"
                    src={logoUrl}
                    alt={params.data?.committeeName ?? "Committee Logo"}
                    onClick={() => onLogoClick(logoUrl)}
                    sx={{
                        width: 50,
                        height: 50,
                        objectFit: "contain",
                        borderRadius: 1,
                        border: "1px solid #ddd",
                        p: "2px",
                        bgcolor: "#fff",
                        cursor: "pointer",
                    }}
                />
            );
        },
    },

    // keep your other existing columns here
    {
        headerName: "Committee Name",
        field: "committeeName",
    },
    {
        headerName: "Slogan",
        field: "slogan",
    },
    {
        headerName: "Status",
        field: "isActive",
        cellRenderer: (params: any) => params.value ? "Active" : "Inactive",
    },
];