import { useCallback, useEffect, useState } from "react";
import { getStateDropdown } from "../../../api/stateApi";
import type { StateDropdown } from "../../state/types/state";

export function useStateDropdown() {
    const [states, setStates] = useState<StateDropdown[]>([]);
    const [loading, setLoading] = useState(false);

    const loadStates = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getStateDropdown();

            if (response.success) {
                setStates(response.data);
            } else {
                setStates([]);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadStates();
    }, [loadStates]);

    return {
        states,
        loading,
        loadStates,
    };
}