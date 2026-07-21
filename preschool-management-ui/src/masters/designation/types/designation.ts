export interface DesignationTranslation {
    languageCode: string;
    designationName: string;
}

export interface Designation {
    designationId: number;
    designationName: string;
    isActive: boolean;
    translations: DesignationTranslation[];
}

export interface DesignationResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Designation[];
}

export interface DesignationFormValues {
    designationName: string;
    isActive: boolean;
    translations: DesignationTranslation[];
}