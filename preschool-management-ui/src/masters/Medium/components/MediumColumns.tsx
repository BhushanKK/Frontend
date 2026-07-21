import type { ColDef } from "ag-grid-community";
import type { TFunction } from "i18next";
import i18n from "../../../i18n";
import type { Medium } from "../types/medium";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getMediumColumns = (t: TFunction) : ColDef<Medium>[] => [
    {
        headerName: t("ID"),
        field: "mediumId",
        width: 100,
    },
    {
        headerName: i18n.t("masters:medium"),
        field: "mediumName",
        flex: 1,
    },
    {
        headerName: t("status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    },
];