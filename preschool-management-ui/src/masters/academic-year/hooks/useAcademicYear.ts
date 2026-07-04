import { useCallback, useEffect, useState } from "react";
import { getAcademicYears } from "../../../api/academicYearApi";
import type { AcademicYear } from "../types/academicYear";

export function useAcademicYear() {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAcademicYears = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getAcademicYears();

      if (response.success) {
        setAcademicYears(response.data);
      } else {
        setAcademicYears([]);
      }
    } catch (error) {
      console.error("Failed to load academic years:", error);
      setAcademicYears([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAcademicYears();
  }, [loadAcademicYears]);

  return {
    academicYears,
    loading,
    loadAcademicYears,
  };
}