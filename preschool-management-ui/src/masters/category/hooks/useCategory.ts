import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../../../api/categoryApi";
import type { Category } from "../types/category";
import type {
    PaginationRequest,
    PaginatedResult,
} from "../../../types/pagination";
import { useLanguageStore } from "../../../store/languageStore";

export function useCategory(filter: boolean) {
    const language = useLanguageStore((state) => state.language);
    const [loading, setLoading] = useState(false);

    const [request, setRequest] = useState<PaginationRequest>({
        pageNumber: 1,
        pageSize: 10,
        filter,
        searchText: "",
    });

    const [result, setResult] =
        useState<PaginatedResult<Category>>();

    const loadCategories = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getCategories(request);

            if (response.success)
                setResult(response.data);
            else
                setResult(undefined);

        } catch {
            setResult(undefined);

        } finally {
            setLoading(false);
        }

    }, [request]);


    useEffect(() => {
        loadCategories();
    }, [loadCategories, language]);


    const setPageNumber = (pageNumber: number) => {
        setRequest((prev) => ({
            ...prev,
            pageNumber,
        }));
    };


    const setPageSize = (pageSize: number) => {
        setRequest((prev) => ({
            ...prev,
            pageSize,
            pageNumber: 1,
        }));
    };


    const setSearchText = (searchText: string) => {
        setRequest((prev) => ({
            ...prev,
            searchText,
            pageNumber: 1,
        }));
    };


    const refresh = () => {
        loadCategories();
    };


    return {
        loading,
        categories: result?.items ?? [],
        pagination: result,
        request,

        setPageNumber,
        setPageSize,
        setSearchText,

        refresh,
        loadCategories,
    };
}