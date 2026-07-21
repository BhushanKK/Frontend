import type { ColDef } from "ag-grid-community";
import type { AcademicYear } from "../types/academicYear";
import { formatDate } from "../../../utils/dateFormatter";
import type { TFunction } from "i18next";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getAcademicYearColumns = (
  t: TFunction,
  language: string
): ColDef<AcademicYear>[] => [
  {
    headerName: t("common:ID"),
    field: "academicYearId",
    width: 100,
  },
  {
    headerName: t("masters:academicYear"),
    field: "academicYearName",
    flex: 1,
  },
  {
    headerName: t("masters:fromDate"),
    field: "fromDate",
    flex: 1,
    valueFormatter: ({ value }) => formatDate(value, language),
  },
  {
    headerName: t("masters:toDate"),
    field: "toDate",
    flex: 1,
    valueFormatter: ({ value }) => formatDate(value, language),
  },
  {
    headerName: t("common:status"),
    field: "isActive",
    flex: 1,
    cellRenderer: StatusCellRenderer,
  },
];