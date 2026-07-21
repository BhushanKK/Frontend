import { useCallback, useEffect, useState } from "react";
import { getStandards } from "../../../api/standardApi";
import type { Standard } from "../types/standard";
import { useLanguageStore } from "../../../store/languageStore";

export function useStandard(filter:boolean) {
    const [standards, setStandards] = useState<Standard[]>([]);
    const [loading, setLoading] = useState(false);

    // Reload data when application language changes
    const language = useLanguageStore((state) => state.language);

    const loadStandards = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getStandards(filter);

            if (response.success) {
                setStandards(response.data);
            } else {
                setStandards([]);
            }
        } catch {
            setStandards([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadStandards();
    }, [loadStandards, language]);

    return {
        standards,
        loading,
        loadStandards,
    };
}