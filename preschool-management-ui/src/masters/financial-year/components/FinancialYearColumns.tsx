import type { ColDef } from "ag-grid-community";
import type { FinancialYear } from "../types/financialYear";
import { formatDate } from "../../../utils/dateFormatter";
import type { TFunction } from "i18next";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getFinancialYearColumns = (t: TFunction): ColDef<FinancialYear>[] => [
    {
        headerName: t("ID"),
        field: "financialYearId",
        width: 100,
    },
    {
        headerName: t("masters:financialYear"),
        field: "financialYearName",
        flex: 1,
    },
    {
        headerName: t("masters:fromDate"),
        field: "fromDate",
        flex: 1,
        valueFormatter: ({ value }) => formatDate(value),
    },
    {
        headerName: t("masters:toDate"),
        field: "toDate",
        flex: 1,
        valueFormatter: ({ value }) => formatDate(value),
    },
    {
        headerName: t("status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    }
];