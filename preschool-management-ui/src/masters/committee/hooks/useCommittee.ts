import { useCallback, useEffect, useState } from "react";
import { getCommittees } from "../../../api/committeeApi";
import type { CommitteeMaster } from "../types/committee";

export function useCommittee(filter: boolean) {
    const [committees, setCommittees] = useState<CommitteeMaster[]>([]);
    const [loading, setLoading] = useState(false);

    const loadCommittees = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getCommittees(filter);

            if (response.success) {
                setCommittees(response.data);
            } else {
                setCommittees([]);
            }
        } catch {
            setCommittees([]);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadCommittees();
    }, [loadCommittees]);

    return {
        committees,
        loading,
        loadCommittees,
    };
}