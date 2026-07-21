import type { ColDef } from "ag-grid-community";
import type { Board } from "../types/boardApi";
import type { TFunction } from "i18next";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getBoardColumns = (t: TFunction) : ColDef<Board>[] => [
    {
        headerName: "ID",
        field: "boardId",
        width: 100,
    },
    {
        headerName: "Board Name",
        field: "boardName",
        flex: 1,
    },
    {
        headerName: t("common:status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    }
];