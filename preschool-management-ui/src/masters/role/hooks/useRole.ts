import { useCallback, useEffect, useState } from "react";
import { getRoles } from "../../../api/roleApi";
import type { Role } from "../types/role";
import { useLanguageStore } from "../../../store/languageStore";

export function useRole() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);

    // Reload data when application language changes
    const language = useLanguageStore((state) => state.language);

    const loadRoles = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getRoles();

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