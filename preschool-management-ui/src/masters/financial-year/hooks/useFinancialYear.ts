import { useCallback, useEffect, useState } from "react";
import { getFinancialYears } from "../../../api/financialYearApi";
import type { FinancialYear } from "../types/financialYear";
import { useLanguageStore } from "../../../store/languageStore";

export function useFinancialYear(filter: boolean) {
    const [financialYears, setFinancialYears] = useState<FinancialYear[]>([]);
    const [loading, setLoading] = useState(false);

    // Subscribe to selected language
    const language = useLanguageStore((state) => state.language);

    const loadFinancialYears = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getFinancialYears(filter);

            if (response.success) {
                setFinancialYears(response.data);
            } else {
                setFinancialYears([]);
            }
        } catch {
            setFinancialYears([]);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadFinancialYears();
    }, [loadFinancialYears, language]);

    return {
        financialYears,
        loading,
        loadFinancialYears,
    };
}