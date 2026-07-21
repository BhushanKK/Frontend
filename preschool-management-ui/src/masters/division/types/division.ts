export interface DivisionTranslation {
    divisionTranslationId?: number;
    divisionId?: number;
    languageCode: string;
    divisionName: string;
}

export interface Division {
    divisionId: number;
    divisionName: string;
    isActive: boolean;
    translations: DivisionTranslation[];
}

export interface DivisionResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Division[];
}

export interface DivisionFormValues {
    divisionName: string;
    isActive: boolean;
    translations: DivisionTranslation[];
}