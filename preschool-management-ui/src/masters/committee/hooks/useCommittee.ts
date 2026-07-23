import { useCallback, useEffect, useState } from "react";
import { getCommittees } from "../../../api/committeeApi";
import type { CommitteeMaster } from "../types/committee";
import type {
    PaginationRequest,
    PaginatedResult,
} from "../../../types/pagination";
import { useLanguageStore } from "../../../store/languageStore";

export function useCommittee(filter: boolean) {
    const language = useLanguageStore((state) => state.language);
    const [loading, setLoading] = useState(false);

    const [request, setRequest] = useState<PaginationRequest>({
        pageNumber: 1,
        pageSize: 10,
        filter,
        searchText: "",
    });

    const [result, setResult] =
        useState<PaginatedResult<CommitteeMaster>>();
        
    const loadCommittees = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getCommittees(request);
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
        loadCommittees();
    }, [loadCommittees, language]);

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
        loadCommittees();
    };
    return {
        loading,
        committees: result?.items ?? [],
        pagination: result,
        request,
        setPageNumber,
        setPageSize,
        setSearchText,
        refresh,
        loadCommittees,
    };
}