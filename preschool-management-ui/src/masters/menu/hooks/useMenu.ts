import { useCallback, useEffect, useState } from "react";
import { getMenus, getParentMenus, getAllRoles } from "../../../api/menuApi";
import type { Menu, ParentMenu, Role } from "../types/menu";

export function useMenu() {

    const [menus, setMenus] = useState<Menu[]>([]);
    const [parentMenus, setParentMenus] = useState<ParentMenu[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
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

    const loadRoles = useCallback(async () => {
        try {
            const response = await getAllRoles();
            if (response.success)
                setRoles(response.data.filter(x => x.isActive));
            else
                setRoles([]);
        }
        catch {
            setRoles([]);
        }
    }, []);

    useEffect(() => {
        loadMenus();
        loadParentMenus();
        loadRoles();
    }, [loadMenus, loadParentMenus, loadRoles]);

    return {
        menus,
        parentMenus,
        roles,
        loading,
        loadMenus,
        loadParentMenus,
        loadRoles,
    };
}