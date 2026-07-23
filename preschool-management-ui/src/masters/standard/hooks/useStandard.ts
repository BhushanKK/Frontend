import { useCallback, useEffect, useState } from "react";
import { getStandards } from "../../../api/standardApi";
import type { Standard } from "../types/standard";
import type {
    PaginationRequest,
    PaginatedResult,
} from "../../../types/pagination";
import { useLanguageStore } from "../../../store/languageStore";

export function useStandard(filter: boolean) {
    const language = useLanguageStore((state) => state.language);
    const [loading, setLoading] = useState(false);

    const [request, setRequest] = useState<PaginationRequest>({
        pageNumber: 1,
        pageSize: 10,
        filter,
        searchText: "",
    });

    const [result, setResult] = useState<PaginatedResult<Standard>>();

    const loadStandards = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getStandards(request);

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
        loadStandards();
    }, [loadStandards, language]);

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
        loadStandards();
    };

    return {
        loading,
        standards: result?.items ?? [],
        pagination: result,
        request,
        setPageNumber,
        setPageSize,
        setSearchText,
        refresh,
        loadStandards,
    };
}