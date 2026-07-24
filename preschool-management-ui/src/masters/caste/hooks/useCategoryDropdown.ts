import { useCallback, useEffect, useState } from "react";
import { getCategoryDropdown } from "../../../api/categoryApi";
import type { CategoryDropdown } from "../../category/types/category";

export function useCategoryDropdown() {
    const [categories, setCategories] = useState<CategoryDropdown[]>([]);
    const [loading, setLoading] = useState(false);

    const loadCategories = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getCategoryDropdown();

            if (response.success) {
                setCategories(response.data);
            } else {
                setCategories([]);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    return {
        categories,
        loading,
        loadCategories,
    };
}