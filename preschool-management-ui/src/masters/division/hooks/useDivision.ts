import { useCallback, useEffect, useState } from "react";
import { getDivisions } from "../../../api/divisionApi";
import type { Division } from "../types/division";
import { useLanguageStore } from "../../../store/languageStore";

export function useDivision(filter:boolean) {
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [loading, setLoading] = useState(false);

    // Reload data when application language changes
    const language = useLanguageStore((state) => state.language);

    const loadDivisions = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getDivisions(filter);

            if (response.success) {
                setDivisions(response.data);
            } else {
                setDivisions([]);
            }
        } catch {
            setDivisions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDivisions();
    }, [loadDivisions, language]);

    return {
        divisions,
        loading,
        loadDivisions,
    };
}