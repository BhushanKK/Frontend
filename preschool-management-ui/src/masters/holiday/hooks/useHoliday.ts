import { useCallback, useEffect, useState } from "react";
import type { holiday } from "../types/Holiday";
import { getHolidays } from "../../../api/holidayApi";


export function useHoliday(filter:boolean) {
    const [Holiday, setHoliday] = useState<holiday[]>([]);
    const [loading, setLoading] = useState(false);

    const loadHolidays = useCallback(async () => {
        setLoading(false);

        try {
            const response = await getHolidays(filter);
            if (response.success)
                setHoliday(response.data);
            else
                setHoliday([]);
        } catch (error) {
            setHoliday([]);
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadHolidays();
    }, [loadHolidays])

    return {
        Holiday,
        loading,
        loadHolidays
    };
}