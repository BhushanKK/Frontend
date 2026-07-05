import type { ColDef, ICellRendererParams } from "ag-grid-community";
import type { FinancialYear } from "../types/financialYear";
import { formatDate } from "../../../utils/dateFormatter";
import { Chip } from "@mui/material";

export const financialYearColumns: ColDef<FinancialYear>[] = [
    {
        headerName: "ID",
        field: "financialYearId",
        width: 100,
    },
    {
        headerName: "Financial Year",
        field: "financialYearName",
        flex: 1,
    },
    {
        headerName: "From Date",
        field: "fromDate",
        flex: 1,
        valueFormatter: ({ value }) => formatDate(value),
    },
    {
        headerName: "To Date",
        field: "toDate",
        flex: 1,
        valueFormatter: ({ value }) => formatDate(value),
    },
    {
        headerName: "Status",
        field: "isActive",
        flex: 1,
        cellRenderer: (
            params: ICellRendererParams<FinancialYear, boolean>
        ) => (
            <Chip
                label={params.value ? "Active" : "Inactive"}
                color={params.value ? "success" : "error"}
                size="small"
            />
        ),
    }
];