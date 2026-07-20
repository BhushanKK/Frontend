import { useCallback, useEffect, useState } from "react";
import { getReligions } from "../../../api/religionApi";
import type { Religion } from "../types/religion";
import { useLanguageStore } from "../../../store/languageStore";

export function useReligion(filter: boolean) {
    const [religions, setReligions] = useState<Religion[]>([]);
    const [loading, setLoading] = useState(false);

    // Refresh data when language changes
    const language = useLanguageStore(
        (state) => state.language
    );
    const loadReligions = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getReligions(filter);
            if (response.success) {
                setReligions(response.data);
            } else {
                setReligions([]);
            }
        } catch {
            setReligions([]);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadReligions();
    }, [loadReligions, language]);

    return {
        religions,
        loading,
        loadReligions,
    };
}