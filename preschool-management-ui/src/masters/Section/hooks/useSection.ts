import { useCallback, useEffect, useState } from "react";
import { getSections } from "../../../api/sectionApi";
import type { Section } from "../types/section";
import { useLanguageStore } from "../../../store/languageStore";

export function useSection(filter: boolean) {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(false);

    // Reload data whenever language changes
    const language = useLanguageStore((state) => state.language);

    const loadSections = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getSections(filter);

            if (response.success) {
                setSections(response.data);
            } else {
                setSections([]);
            }
        } catch {
            setSections([]);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadSections();
    }, [loadSections, language]);

    return {
        sections,
        loading,
        loadSections,
    };
}