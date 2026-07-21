import { useCallback, useEffect, useState } from "react";
import type { Medium } from "../types/medium";
import { useLanguageStore } from "../../../store/languageStore";
import { getMediums } from "../../../api/MediumApi";

export function useMedium() {
    const [mediums, setMediums] = useState<Medium[]>([]);
    const [loading, setLoading] = useState(false);

    // Reload data when application language changes
    const language = useLanguageStore((state) => state.language);

    const loadMediums = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getMediums();

            if (response.success) {
                setMediums(response.data);
            } else {
                setMediums([]);
            }
        } catch {
            setMediums([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMediums();
    }, [loadMediums, language]);

    return {
        mediums,
        loading,
        loadMediums,
    };
}