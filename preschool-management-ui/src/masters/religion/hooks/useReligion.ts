import { useCallback, useEffect, useState } from "react";
import { getReligions } from "../../../api/religionApi";
import type { religion } from "../types/religion";

export function useReligion(filter:boolean) {
    const [Religion, setReligion] = useState<religion[]>([]);
    const [loading, setLoading] = useState(false);

    const loadReligions = useCallback(async () => {
        setLoading(false);

        try {
            const response = await getReligions(filter);
            if (response.success)
                setReligion(response.data);
            else
                setReligion([]);
        } catch (error) {
            setReligion([]);
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadReligions();
    }, [loadReligions])

    return {
        Religion,
        loading,
        loadReligions
    };
}