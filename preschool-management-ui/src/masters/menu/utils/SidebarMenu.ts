export interface SidebarMenu {
    menuId: number;
    menuName: string;
    menuUrl: string | null;
    icon: string;
    displayOrder: number;
    children: SidebarMenu[];
}