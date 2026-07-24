import { useCallback, useEffect, useState } from "react";
import { getDistricts } from "../../../api/districtApi";
import type { District } from "../types/district";
import type {
    PaginationRequest,
    PaginatedResult,
} from "../../../types/pagination";
import { useLanguageStore } from "../../../store/languageStore";

export function useDistrict(filter: boolean) {
    const language = useLanguageStore((state) => state.language);
    const [loading, setLoading] = useState(false);

    const [request, setRequest] = useState<PaginationRequest>({
        pageNumber: 1,
        pageSize: 10,
        filter,
        searchText: "",
    });

    const [result, setResult] =
        useState<PaginatedResult<District>>();

    const loadDistricts = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getDistricts(request);

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
        loadDistricts();
    }, [loadDistricts, language]);

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
        loadDistricts();
    };

    return {
        loading,
        districts: result?.items ?? [],
        pagination: result,
        request,
        setPageNumber,
        setPageSize,
        setSearchText,
        refresh,
        loadDistricts,
    };
}