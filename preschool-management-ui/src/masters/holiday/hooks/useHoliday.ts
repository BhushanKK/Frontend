import { useCallback, useEffect, useState } from "react";
import { getHolidays } from "../../../api/holidayApi";
import type { Holiday } from "../types/Holiday";
import { useLanguageStore } from "../../../store/languageStore";

export function useHoliday() {
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState(false);

    // Reload data when application language changes
    const language = useLanguageStore((state) => state.language);

    const loadHolidays = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getHolidays();

            if (response.success) {
                setHolidays(response.data);
            } else {
                setHolidays([]);
            }
        } catch {
            setHolidays([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadHolidays();
    }, [loadHolidays, language]);

    return {
        holidays,
        loading,
        loadHolidays,
    };
}