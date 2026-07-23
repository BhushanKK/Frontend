import { useCallback, useEffect, useState } from "react";
import { getMenus, getParentMenus } from "../../../api/menuApi";
import type { Menu, ParentMenu, Role } from "../types/menu";
import type { PaginationRequest, PaginatedResult } from "../../../types/pagination";
import { useLanguageStore } from "../../../store/languageStore";
import { getRoleDropdown } from "../../../api/roleApi";

export function useMenu(filter: boolean) {
    const language = useLanguageStore((state) => state.language);
    const [loading, setLoading] = useState(false);

    const [request, setRequest] = useState<PaginationRequest>({
        pageNumber: 1,
        pageSize: 10,
        filter:filter,
        searchText: "",
    });

    const [result, setResult] = useState<PaginatedResult<Menu>>();
    const [parentMenus, setParentMenus] = useState<ParentMenu[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const loadMenus = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getMenus(request);

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

    const loadParentMenus = useCallback(async () => {
        try {
            const response = await getParentMenus();

            if (response.success)
                setParentMenus(response.data);
            else
                setParentMenus([]);
        } catch {
            setParentMenus([]);
        }
    }, []);

    const loadRoles = useCallback(async () => {
        try {
            const response = await getRoleDropdown();

            if (response.success)
                setRoles(response.data);
            else
                setRoles([]);
        } catch {
            setRoles([]);
        }
    }, []);

    useEffect(() => {
        loadMenus();
    }, [loadMenus, language]);

    useEffect(() => {
        loadParentMenus();
        loadRoles();
    }, [loadParentMenus, loadRoles, language]);

    const setPageNumber = (pageNumber: number) => {
        setRequest(prev => ({
            ...prev,
            pageNumber,
        }));
    };

    const setPageSize = (pageSize: number) => {
        setRequest(prev => ({
            ...prev,
            pageSize,
            pageNumber: 1,
        }));
    };

    const setSearchText = (searchText: string) => {
        setRequest(prev => ({
            ...prev,
            searchText,
            pageNumber: 1,
        }));
    };

    const refresh = () => {
        loadMenus();
    };

    return {
        loading,
        menus: result?.items ?? [],
        pagination: result,
        request,
        parentMenus,
        roles,
        setPageNumber,
        setPageSize,
        setSearchText,
        refresh,
        loadMenus,
        loadParentMenus,
        loadRoles,
    };
}