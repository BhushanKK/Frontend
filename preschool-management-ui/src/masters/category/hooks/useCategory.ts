import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../../../api/categoryApi";
import type { Category } from "../types/category";
import { useLanguageStore } from "../../../store/languageStore";

export function useCategory(filter: boolean) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    // Subscribe to selected language
    const language = useLanguageStore((state) => state.language);

    const loadCategories = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getCategories(filter);

            if (response.success) {
                setCategories(response.data);
            } else {
                setCategories([]);
            }
        } catch {
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadCategories();
    }, [loadCategories, language]);

    return {
        categories,
        loading,
        loadCategories,
    };
}