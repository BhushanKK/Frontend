export interface HolidayTranslation {
    holidayTranslationId?: number;
    holidayId?: number;
    languageCode: string;
    holidayName: string;
}

export interface Holiday {
    holidayId: number;
    holidayName: string;
    holidayFromDate: string;
    holidayToDate: string;
    holidayType: number;
    description?: string;
    isActive: boolean;
    translations: HolidayTranslation[];
}

export interface HolidayResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Holiday[];
}

export interface HolidayFormValues {
    holidayName: string;
    holidayFromDate: string;
    holidayToDate: string;
    holidayType: number;
    description: string;
    isActive: boolean;
    translations: HolidayTranslation[];
}

/**
 * Holiday Type Dropdown
 */
export interface HolidayTypeOption {
    id: number;
    name: string;
}