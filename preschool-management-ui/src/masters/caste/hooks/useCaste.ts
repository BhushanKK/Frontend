import { useCallback, useEffect, useState } from "react";
import type { Caste } from "../types/caste";
import { getCastes } from "../../../api/casteApi";

export function useCaste(filter:boolean) {
    const [castes, setCastes] = useState<Caste[]>([]);
    const [loading, setLoading] = useState(false);

    const loadCastes = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getCastes(filter);

            if (response.success)
                setCastes(response.data);
            else
                setCastes([]);
        } catch (error) {
            setCastes([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCastes();
    }, [loadCastes]);

    return {
        castes,
        loading,
        loadCastes,
    };
}