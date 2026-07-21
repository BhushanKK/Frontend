import { useCallback, useEffect, useState } from "react";
import { getDesignations } from "../../../api/designationApi";
import type { Designation } from "../types/designation";
import { useLanguageStore } from "../../../store/languageStore";

export function useDesignation(filter: boolean) {
    const [designations, setDesignations] = useState<Designation[]>([]);
    const [loading, setLoading] = useState(false);

    // Subscribe to selected language
    const language = useLanguageStore((state) => state.language);

    const loadDesignations = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getDesignations(filter);

            if (response.success) {
                setDesignations(response.data);
            } else {
                setDesignations([]);
            }
        } catch {
            setDesignations([]);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadDesignations();
    }, [loadDesignations, language]);

    return {
        designations,
        loading,
        loadDesignations,
    };
}