import { useCallback, useEffect, useState } from "react";
import { getBoards } from "../../../api/boardApi";
import type { Board } from "../types/boardApi";
import type { PaginationRequest, PaginatedResult } from "../../../types/pagination";
import { useLanguageStore } from "../../../store/languageStore";

export function useBoard(filter: boolean) {
    const language = useLanguageStore((state) => state.language);
    const [loading, setLoading] = useState(false);

    const [request, setRequest] = useState<PaginationRequest>({
        pageNumber: 1,
        pageSize: 10,
        filter,
        searchText: "",
    });

    const [result, setResult] =
        useState<PaginatedResult<Board>>();

    const loadBoards = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getBoards(request);

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
        loadBoards();
    }, [loadBoards, language]);

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
        loadBoards();
    };

    return {
        loading,
        boards: result?.items ?? [],
        pagination: result,
        request,
        setPageNumber,
        setPageSize,
        setSearchText,
        refresh,
        loadBoards,
    };
}