export interface StandardTranslation {
    standardTranslationId?: number;
    standardId?: number;
    languageCode: string;
    standardName: string;
}

export interface Standard {
    standardId: number;
    standardName: string;
    isActive: boolean;
    translations: StandardTranslation[];
}

export interface StandardResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Standard[];
}

export interface StandardFormValues {
    standardName: string;
    isActive: boolean;
    translations: StandardTranslation[];
}