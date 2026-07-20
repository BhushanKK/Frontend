import { useCallback, useEffect, useState } from "react";
import { getBoards } from "../../../api/boardApi";
import { useLanguageStore } from "../../../store/languageStore";
import type { Board } from "../types/boardApi";

export function useBoard() {
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState(false);

    // Reload data when language changes
    const language = useLanguageStore((state) => state.language);

    const loadBoards = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getBoards();

            if (response.success) {
                setBoards(response.data);
            } else {
                setBoards([]);
            }
        } catch {
            setBoards([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadBoards();
    }, [loadBoards, language]);

    return {
        boards,
        loading,
        loadBoards,
    };
}