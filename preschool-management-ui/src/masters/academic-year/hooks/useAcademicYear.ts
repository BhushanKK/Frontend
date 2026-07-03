import { useEffect, useState } from "react";
import { getAcademicYears } from "../../../api/academicYearApi";
import type { AcademicYear } from "../types/academicYear";

export function useAcademicYear() {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAcademicYears = async () => {
    try {
      setLoading(true);

      const response = await getAcademicYears();

      if (response.success) {
        setAcademicYears(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAcademicYears();
  }, []);

  return {
    academicYears,
    loading,
    loadAcademicYears,
  };
}