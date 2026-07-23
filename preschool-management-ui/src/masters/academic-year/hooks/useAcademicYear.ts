import { useCallback, useEffect, useState } from "react";
import { getAcademicYears } from "../../../api/academicYearApi";
import type { AcademicYear } from "../types/academicYear";
import type { PaginationRequest, PaginatedResult } from "../../../types/pagination";
import { useLanguageStore } from "../../../store/languageStore";

export function useAcademicYear(filter: boolean) {
    const language = useLanguageStore((state) => state.language);
    const [loading, setLoading] = useState(false);
    
    const [request, setRequest] = useState<PaginationRequest>({
        pageNumber: 1,
        pageSize: 10,
        filter,
        searchText: "",
    });

    const [result, setResult] =
        useState<PaginatedResult<AcademicYear>>();

    const loadAcademicYears = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getAcademicYears(request);

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
        loadAcademicYears();
    }, [loadAcademicYears, language]);

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
        loadAcademicYears();
    };

    return {
        loading,
        academicYears: result?.items ?? [],
        pagination: result,
        request,
        setPageNumber,
        setPageSize,
        setSearchText,
        refresh,
        loadAcademicYears,
    };
}