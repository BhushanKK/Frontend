import type { ColDef } from "ag-grid-community";
import type { TFunction } from "i18next";
import type { Caste } from "../types/caste";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getCasteColumns = (
    t: TFunction
): ColDef<Caste>[] => [
    {
        headerName: t("common:ID"),
        field: "casteId",
        width: 100,
    },
    {
        headerName: t("masters:category"),
        field: "categoryName",
        flex: 1,
    },
    {
        headerName: t("masters:caste"),
        field: "casteName",
        flex: 1,
    },
    {
        headerName: t("common:status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    },
];