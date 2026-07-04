import type {
  ColDef,
  ValueFormatterParams,
  CellClassParams,
  ICellRendererParams,
} from "ag-grid-community";
import type { AcademicYear } from "../types/academicYear";
import { formatDate } from "../../../utils/dateFormatter";
import { Chip } from "@mui/material";

export const academicYearColumns: ColDef<AcademicYear>[] = [
  {
    headerName: "ID",
    field: "academicYearId",
    width: 100,
  },
  {
    headerName: "Academic Year",
    field: "academicYearName",
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
      params: ICellRendererParams<AcademicYear, boolean>
    ) => (
      <Chip
        label={params.value ? "Active" : "Inactive"}
        color={params.value ? "success" : "error"}
        size="small"
      />
    ),
  }
];