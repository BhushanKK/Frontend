import { useCallback, useEffect, useState } from "react";
import { getHolidays } from "../../../api/holidayApi";
import type { Holiday } from "../types/Holiday";
import type { PaginationRequest, PaginatedResult } from "../../../types/pagination";
import { useLanguageStore } from "../../../store/languageStore";

export function useHoliday(filter: boolean) {
    const language = useLanguageStore((state) => state.language);
    const [loading, setLoading] = useState(false);

    const [request, setRequest] = useState<PaginationRequest>({
        pageNumber: 1,
        pageSize: 10,
        filter,
        searchText: "",
    });

    const [result, setResult] = useState<PaginatedResult<Holiday>>();

    const loadHolidays = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getHolidays(request);

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
        loadHolidays();
    }, [loadHolidays, language]);

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
        loadHolidays();
    };

    return {
        loading,
        holidays: result?.items ?? [],
        pagination: result,
        request,
        setPageNumber,
        setPageSize,
        setSearchText,
        refresh,
        loadHolidays,
    };
}