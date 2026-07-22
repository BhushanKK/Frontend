import type { ColDef } from "ag-grid-community";
import type { TFunction } from "i18next";

import type { Menu } from "../types/menu";

import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getMenuColumns = (t: TFunction): ColDef<Menu>[] => [
    {
        headerName: t("common:ID"),
        field: "menuId",
        width: 100,
    },
    {
        headerName: t("masters:menuName"),
        field: "menuName",
        flex: 1,
    },
    {
        headerName: t("masters:parentMenu"),
        field: "parentMenuName",
        flex: 1,
    },
    {
        headerName: t("masters:menuUrl"),
        field: "menuUrl",
        flex: 1,
    },
    {
        headerName: t("masters:displayOrder"),
        field: "displayOrder",
        width: 150,

    },
    {
        headerName: t("common:status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    },
];