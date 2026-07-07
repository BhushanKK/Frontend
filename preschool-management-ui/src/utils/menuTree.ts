import type { Menu } from "../../src/masters/menu/types/menu";
import type { SidebarMenu } from "../masters/menu/utils/SidebarMenu";

export const buildMenuTree = (menus: Menu[]): SidebarMenu[] => {
    const map = new Map<number, SidebarMenu>();

    menus.forEach(menu => {
        map.set(menu.menuId, {
            menuId: menu.menuId,
            menuName: menu.menuName,
            menuUrl: menu.menuUrl,
            icon: menu.icon,
            displayOrder: menu.displayOrder,
            children: []
        });
    });

    const roots: SidebarMenu[] = [];

    menus.forEach(menu => {
        const node = map.get(menu.menuId)!;

        if (menu.parentMenuId == null) {
            roots.push(node);
        } else {
            map.get(menu.parentMenuId)?.children.push(node);
        }
    });

    roots.sort((a, b) => a.displayOrder - b.displayOrder);

    roots.forEach(sortChildren);

    return roots;
};

const sortChildren = (menu: SidebarMenu) => {
    menu.children.sort((a, b) => a.displayOrder - b.displayOrder);

    menu.children.forEach(sortChildren);
};