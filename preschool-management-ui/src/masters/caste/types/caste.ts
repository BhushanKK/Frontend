export interface CasteTranslation {
    languageCode: string;
    casteName: string;
}

export interface Caste {
    casteId: number;
    categoryId: number;
    categoryName: string;
    casteName: string;
    isActive: boolean;
    translations: CasteTranslation[];
}

export interface CasteResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Caste[];
}

export interface CasteFormValues {
    categoryId: number;
    casteName: string;
    isActive: boolean;
    translations: CasteTranslation[];
}