import { useCallback, useEffect, useState } from "react";
import type { FinancialYear } from "../types/financialYear";
import { getFinancialYears } from "../../../api/financialYearApi";

export function useFinancialYear(filter:boolean) {
  const [financialYears, setFinancialYears] = useState<FinancialYear[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFinancialYears = useCallback(async () => { 
    
    setLoading(true);

    try {
      const response = await getFinancialYears(filter);

      if (response.success) {
        setFinancialYears(response.data);
      } else {
        setFinancialYears([]);
      }
    } catch (error) {
      setFinancialYears([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFinancialYears();
  }, [loadFinancialYears]);

  return {
    financialYears,
    loading,
    loadFinancialYears,
  };
}