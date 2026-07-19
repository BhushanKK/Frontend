import { useCallback, useEffect, useState } from "react";
import { getAcademicYears } from "../../../api/academicYearApi";
import type { AcademicYear } from "../types/academicYear";
import { useLanguageStore } from "../../../store/languageStore";

export function useAcademicYear(filter: boolean) {
    const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
    const [loading, setLoading] = useState(false);

    // Subscribe to selected language
    const language = useLanguageStore((state) => state.language);

    const loadAcademicYears = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getAcademicYears(filter);

            if (response.success) {
                setAcademicYears(response.data);
            } else {
                setAcademicYears([]);
            }
        } catch {
            setAcademicYears([]);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadAcademicYears();
    }, [loadAcademicYears, language]);

    return {
        academicYears,
        loading,
        loadAcademicYears,
    };
}