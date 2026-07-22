import { Box } from "@mui/material";
import type { ColDef } from "ag-grid-community";
import type { TFunction } from "i18next";
import type { CommitteeMaster } from "../types/committee";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;

const getLogoUrl = (path?: string | null) => {
    if (!path) return null;

    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    return `${FILE_BASE_URL}/${path.replace(/^\/+/, "")}`;
};

export const getCommitteeColumns = (t: TFunction,onLogoClick: (logoUrl: string) => void)
: ColDef<CommitteeMaster>[] => 
    [
    {
        headerName: t("masters:logo"),
        field: "logoPath",
        width: 110,
        cellRenderer: (params: any) => {
            const logoUrl = getLogoUrl(params.value);

            if (!logoUrl) {
                return t("masters:logo");
            }

            return (
                <Box
                    component="img"
                    src={logoUrl}
                    alt={params.data?.committeeName ?? t("masters:committeeLogo")}
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
    {
        headerName: t("masters:committee"),
        field: "committeeName",
        flex: 1,
    },
    {
        headerName: t("masters:slogan"),
        field: "slogan",
        flex: 1,
    },
    {
        headerName: t("common:status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    },
];