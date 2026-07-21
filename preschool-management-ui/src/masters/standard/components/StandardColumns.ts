import type { ColDef } from "ag-grid-community";
import type { TFunction } from "i18next";

import type { Standard } from "../types/standard";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getStandardColumns = (t: TFunction) : ColDef<Standard>[] => [
    {
        headerName: t("common:ID"),
        field: "standardId",
        width: 100,
    },
    {
        headerName: t("masters:standard"),
        field: "standardName",
        flex: 1,
    },
    {
        headerName: t("common:status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    },
];