import { useCallback, useEffect, useState } from "react";
import type { Role } from "../types/role";
import { getRoles } from "../../../api/roleApi";

export function useRole() {
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
        } catch (error) {
            setRoles([]);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        loadRoles();
    }, [loadRoles]
    );
    return {
        role,
        loading,
        loadRoles
    }
};