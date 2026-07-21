import type { ColDef } from "ag-grid-community";
import type { TFunction } from "i18next";
import type { Designation } from "../types/designation";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getDesignationColumns = (
    t: TFunction
): ColDef<Designation>[] => [
    {
        headerName: t("common:ID"),
        field: "designationId",
        width: 100,
    },
    {
        headerName: t("masters:designation"),
        field: "designationName",
        flex: 2,
    },
    {
        headerName: t("common:status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    },
];