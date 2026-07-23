import { useCallback, useEffect, useState } from "react";
import { getCastes } from "../../../api/casteApi";
import type { Caste } from "../types/caste";
import { useLanguageStore } from "../../../store/languageStore";

export function useCaste(filter: boolean) {
    const [castes, setCastes] = useState<Caste[]>([]);
    const [loading, setLoading] = useState(false);

    // Subscribe to selected language
    const language = useLanguageStore((state) => state.language);

    const loadCastes = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getCastes(filter);

            if (response.success) {
                setCastes(response.data);
            } else {
                setCastes([]);
            }
        } catch {
            setCastes([]);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadCastes();
    }, [loadCastes, language]);

    return {
        castes,
        loading,
        loadCastes,
    };
}