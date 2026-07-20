import { useCallback, useEffect, useState } from "react";
import type { division } from "../types/division";
import { getdivisions } from "../../../api/divsionApi";


export function useDivision() {
    const [Division, setDivisions] = useState<division[]>([]);
    const [loading, setLoading] = useState(false);

    const loadDivisions = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getdivisions();
            if (response.success)
                setDivisions(response.data);
            else
                setDivisions([]);
        } catch (error) {
            setDivisions([]);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        loadDivisions();
    }, [loadDivisions]
    );
    return {
        Division,
        loading,
        loadDivisions
    }
};