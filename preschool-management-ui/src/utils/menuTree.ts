import type { Menu } from "../masters/menu/types/menu";
import type { SidebarMenu } from "../masters/menu/utils/SidebarMenu";
import type { UserPermission } from "../types/UserPermission";

export const buildMenuTree = (
    permissions: UserPermission[],
    menus: Menu[]
): SidebarMenu[] => {

    // only menus that user can view
    const allowedMenus = menus.filter(menu =>
        permissions.some(p =>
            p.menuId === menu.menuId &&
            p.canView
        )
    );

    const map = new Map<number, SidebarMenu>();

    allowedMenus.forEach(menu => {
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
    allowedMenus.forEach(menu => {
        const node = map.get(menu.menuId)!;
        if (
            menu.parentMenuId == null ||
            !map.has(menu.parentMenuId)
        ) {
            roots.push(node);
        } else {
            map.get(menu.parentMenuId)?.children.push(node);
        }
    });

    roots.sort((a, b) => a.displayOrder - b.displayOrder);
    roots.forEach(sortChildren);
    return roots;
};

function sortChildren(menu: SidebarMenu) {
    menu.children.sort(
        (a, b) => a.displayOrder - b.displayOrder
    );
    menu.children.forEach(sortChildren);
}