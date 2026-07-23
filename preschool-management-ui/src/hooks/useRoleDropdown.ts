import { useCallback, useEffect, useState } from "react";
import { useLanguageStore } from "../store/languageStore";
import type { Role } from "../masters/menu/types/menu";
import { getRoleDropdown } from "../api/roleApi";

export function useRoleDropdown() {
    const language = useLanguageStore(
        (state) => state.language
    );

    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);

    const loadRoles = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getRoleDropdown();

            if (response.success) {
                setRoles(response.data);
            } else {
                setRoles([]);
            }
        } catch {
            setRoles([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRoles();
    }, [loadRoles, language]);

    return {
        roles,
        loading,
        loadRoles,
    };
}