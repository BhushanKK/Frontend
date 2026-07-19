import type { ColDef } from "ag-grid-community";
import type { Category } from "../types/category";
import type { TFunction } from "i18next";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getCategoryColumns = (
    t: TFunction
): ColDef<Category>[] => [
    {
        headerName: t("ID"),
        field: "categoryId",
        width: 100,
    },
    {
        headerName: t("category"),
        field: "categoryName",
        flex: 1,
    },
    {
        headerName: t("status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    }
];