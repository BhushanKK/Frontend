import { useCallback, useEffect, useState } from "react";
import type { district } from "../types/district";
import { getDistricts } from "../../../api/districtApi";


export function useDistrict() {
    const [district, setDistricts] = useState<district[]>([]);
    const [loading, setLoading] = useState(false);

    const loadDistricts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getDistricts();
            if (response.success)
                setDistricts(response.data);
            else
                setDistricts([]);
        } catch (error) {
            setDistricts([]);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        loadDistricts();
    }, [loadDistricts]
    );
    return {
        district,
        loading,
        loadDistricts
    }
};