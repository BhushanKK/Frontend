import { useCallback, useEffect, useState } from "react";
import { getRoles } from "../../../api/roleApi";
import type { Role } from "../types/role";
import { useLanguageStore } from "../../../store/languageStore";

export function useRole() {
    const language = useLanguageStore(
        state => state.language
    );

    const [role, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const loadRoles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getRoles();
            if (response.success)
                setRoles(response.data);
            else
                setRoles([]);
        } finally {
            setLoading(false);
        }

    }, []);

    useEffect(() => {
        loadRoles();
    }, [loadRoles, language]);   // <-- important

    return {
        role,
        loading,
        loadRoles
    };
}