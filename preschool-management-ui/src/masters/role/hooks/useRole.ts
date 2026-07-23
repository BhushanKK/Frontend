import { useCallback, useEffect, useState } from "react";
import { getRoles } from "../../../api/roleApi";
import type { Role } from "../types/role";
import type {
    PaginationRequest,
    PaginatedResult,
} from "../../../types/pagination";
import { useLanguageStore } from "../../../store/languageStore";

export function useRole(filter: boolean) {
    const language = useLanguageStore((state) => state.language);
    const [loading, setLoading] = useState(false);

    const [request, setRequest] = useState<PaginationRequest>({
        pageNumber: 1,
        pageSize: 10,
        filter,
        searchText: "",
    });

    const [result, setResult] = useState<PaginatedResult<Role>>();

    const loadRoles = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getRoles(request);

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
        loadRoles();
    }, [loadRoles, language]);

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
        loadRoles();
    };

    return {
        loading,
        roles: result?.items ?? [],
        pagination: result,
        request,
        setPageNumber,
        setPageSize,
        setSearchText,
        refresh,
        loadRoles,
    };
}