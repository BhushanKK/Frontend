import { useCallback, useEffect, useState } from "react";
import { getMenus, getParentMenus } from "../../../api/menuApi";
import type { Menu, ParentMenu } from "../types/menu";

export function useMenu() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [parentMenus, setParentMenus] = useState<ParentMenu[]>([]);
    const [loading, setLoading] = useState(false);

    const loadMenus = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getMenus();

            if (response.success)
                setMenus(response.data);
            else
                setMenus([]);
        }
        catch {
            setMenus([]);
        }
        finally {
            setLoading(false);
        }
    }, []);

    const loadParentMenus = useCallback(async () => {
        try {
            const response = await getParentMenus();

            if (response.success)
                setParentMenus(response.data);
            else
                setParentMenus([]);
        }
        catch {
            setParentMenus([]);
        }
    }, []);

    useEffect(() => {
        loadMenus();
        loadParentMenus();
    }, [loadMenus, loadParentMenus]);

    return {
        menus,
        parentMenus,
        loading,
        loadMenus,
        loadParentMenus,
    };
}