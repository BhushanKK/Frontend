export interface DistrictTranslation {
    languageCode: string;
    districtName: string;
}

export interface District {
    districtId: number;
    stateId: number;
    stateName: string;
    districtName: string;
    isActive: boolean;
    translations: DistrictTranslation[];
}

export interface DistrictResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: District[];
}

export interface DistrictFormValues {
    stateId: number;
    districtName: string;
    isActive: boolean;
    translations: DistrictTranslation[];
}