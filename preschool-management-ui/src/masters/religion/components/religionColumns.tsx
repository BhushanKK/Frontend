import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Chip } from "@mui/material";
import type { Religion } from "../types/religion";
import type { TFunction } from "i18next";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getReligionColumns = (t: TFunction): ColDef<Religion>[] => [
    {
        headerName: t("common:ID"),
        field: "religionId",
        width: 100,
    },
    {
        headerName: t("masters:religion"),
        field: "religionName",
        flex: 1,
    },
    {
        headerName: t("masters:isMinority"),
        field: "isMinority",
        width: 130,
        cellRenderer: (
            params: ICellRendererParams<Religion, boolean>
        ) => (
            <Chip
                label={ params.value ? "Yes" : "No" }
                color={ params.value ? "info" : "default" }
                size="small"
            />
        ),
    },
    {
        headerName: t("status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    }
];