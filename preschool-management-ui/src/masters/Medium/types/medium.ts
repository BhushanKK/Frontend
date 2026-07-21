export interface MediumTranslation {
    mediumTranslationId?: number;
    mediumId?: number;
    languageCode: string;
    mediumName: string;
}

export interface Medium {
    mediumId: number;
    mediumName: string;
    isActive: boolean;
    translations: MediumTranslation[];
}

export interface MediumResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Medium[];
}

export interface MediumFormValues {
    mediumName: string;
    isActive: boolean;
    translations: MediumTranslation[];
}