import type { ColDef } from "ag-grid-community";
import type { TFunction } from "i18next";
import type { District } from "../types/district";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getDistrictColumns = (
    t: TFunction
): ColDef<District>[] => [
    {
        headerName: t("common:ID"),
        field: "districtId",
        width: 100,
    },
    {
        headerName: t("masters:state"),
        field: "stateName",
        flex: 1,
    },
    {
        headerName: t("masters:district"),
        field: "districtName",
        flex: 1,
    },
    {
        headerName: t("common:status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    },
];