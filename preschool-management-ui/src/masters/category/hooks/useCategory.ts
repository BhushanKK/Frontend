import { useCallback, useEffect, useState } from "react";
import type { Category } from "../types/category";
import { getCategories } from "../../../api/categoryApi";

export function useCategory(filter:boolean) {
    const [category, setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const loadCategories = useCallback(async () => {
        setLoading(false);

        try {
            const response = await getCategories(filter);
            if (response.success)
                setCategory(response.data);
            else
                setCategory([]);
        } catch (error) {
            setCategory([]);
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories])

    return {
        category,
        loading,
        loadCategories
    };
}