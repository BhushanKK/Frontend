import holidayTypesEn from "./holidayTypes.en.json";
import holidayTypesMr from "./holidayTypes.mr.json";

export interface HolidayTypeOption {
    id: number;
    name: string;
}

const holidayTypes: Record<string, HolidayTypeOption[]> = {
    en: holidayTypesEn,
    mr: holidayTypesMr,
};

/**
 * Returns holiday types based on language.
 * Falls back to English if language is not available.
 */
export const getHolidayTypes = (
    language: string
): HolidayTypeOption[] => {
    return holidayTypes[language] ?? holidayTypes.en;
};