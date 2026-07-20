export interface ReligionTranslation {
    religionTranslationId?: number;
    religionId?: number;
    languageCode: string;
    religionName: string;
}

export interface Religion {
    religionId: number;
    religionName: string;
    isMinority: boolean;
    isActive: boolean;
    translations: ReligionTranslation[];
}

export interface ReligionFormValues {
    religionName: string;
    isMinority: boolean;
    isActive: boolean;
    translations: ReligionTranslation[];
}

export interface ReligionResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Religion[];
}