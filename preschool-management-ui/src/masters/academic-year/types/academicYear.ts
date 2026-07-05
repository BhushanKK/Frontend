export interface AcademicYear {
  academicYearId: number;
  academicYearName: string;
  fromDate: string;
  toDate: string;
  isActive: boolean;
}

export interface AcademicYearResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: AcademicYear[];
}

export interface AcademicYearFormValues {
  academicYearName: string;
  fromDate: string;
  toDate: string;
  isActive: boolean;
}