import type { ColDef } from "ag-grid-community";
import type { TFunction } from "i18next";

import type { Division } from "../types/division";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getDivisionColumns = (
    t: TFunction
): ColDef<Division>[] => [
    {
        headerName: t("common:ID"),
        field: "divisionId",
        width: 100,
    },
    {
        headerName: t("masters:division"),
        field: "divisionName",
        flex: 1,
    },
    {
        headerName: t("common:status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    },
];