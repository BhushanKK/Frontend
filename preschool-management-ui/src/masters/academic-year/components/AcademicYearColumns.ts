import type { ColDef } from "ag-grid-community";
import type { AcademicYear } from "../types/academicYear";

export const academicYearColumns: ColDef<AcademicYear>[] = [
  {
    headerName: "ID",
    field: "academicYearId",
    width: 120,
  },
  {
    headerName: "Academic Year",
    field: "academicYearName",
    flex: 1,
  },
];