export interface FinancialYearTranslation {
    languageCode: string;
    financialYearName: string;
}

export interface FinancialYear {
    financialYearId: number;
    financialYearName: string;
    fromDate: string;
    toDate: string;
    isActive: boolean;
    translations: FinancialYearTranslation[];
}

export interface FinancialYearResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: FinancialYear[];
}

export interface FinancialYearFormValues {
    financialYearName: string;
    fromDate: string;
    toDate: string;
    isActive: boolean;
    translations: FinancialYearTranslation[];
}