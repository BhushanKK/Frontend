import type { ColDef } from "ag-grid-community";
import type { State } from "../types/state";
import type { TFunction } from "i18next";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getStateColumns = (
    t: TFunction
): ColDef<State>[] => [
    {
        headerName: "ID",
        field: "stateId",
        width: 100,
    },
    {
        headerName: "State Name",
        field: "stateName",
        flex: 1,
    },
    {
        headerName: t("common:status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    },
];