import { useCallback, useEffect, useState } from "react";
import type { Section } from "../types/Section";
import { getSections } from "../../../api/sectionApi";

export function useSection(filter:boolean) {
    const [Sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(false);

    const loadSections = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getSections(filter);

            if (response.success)
                setSections(response.data);
            else
                setSections([]);
        } catch (error) {
            setSections([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadSections();
    }, [loadSections]);

    return {
        Sections,
        loading,
        loadSections,
    };
}