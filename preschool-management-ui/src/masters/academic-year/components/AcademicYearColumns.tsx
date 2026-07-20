import type { ColDef } from "ag-grid-community";
import type { AcademicYear } from "../types/academicYear";
import { formatDate } from "../../../utils/dateFormatter";
import type { TFunction } from "i18next";
import i18n from "../../../i18n";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getAcademicYearColumns = (t: TFunction): ColDef<AcademicYear>[] => [
  {
    headerName: t("ID"),
    field: "academicYearId",
    width: 100,
  },
  {
    headerName: i18n.t("masters:academicYear"),
    field: "academicYearName",
    flex: 1,
  },
  {
    headerName: i18n.t("masters:fromDate"),
    field: "fromDate",
    flex: 1,
    valueFormatter: ({ value }) => formatDate(value),
  },
  {
    headerName: i18n.t("masters:toDate"),
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