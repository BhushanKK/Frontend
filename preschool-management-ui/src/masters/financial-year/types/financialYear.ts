export interface FinancialYear{
    financialYearId: number;
    financialYearName: string;
    fromDate: string;
    toDate: string;
    isActive: boolean;
}

export interface FinancialYearResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: FinancialYear[];
}