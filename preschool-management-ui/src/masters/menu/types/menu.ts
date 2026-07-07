export interface Menu {
    menuId: number;
    menuName: string;
    parentMenuId: number | null;
    parentMenuName: string;
    menuUrl: string;
    icon: string;
    displayOrder: number;
    isPublic: boolean;
    isActive: boolean;
    roleIds?: string;
}

export interface MenuResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Menu[];
}

export interface MenuFormValues {
    parentMenuId: number | null;
    menuName: string;
    menuUrl: string;
    icon: string;
    displayOrder: number;
    isPublic: boolean;
    isActive: boolean;

    roleIds?: string;   // sent to API
    roles?: Role[];      // used by UI only
}

export interface ParentMenu {
    menuId: number;
    menuName: string;
}

export interface DropdownResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: ParentMenu[];
}

export interface Role {
    roleId: number;
    roleName: string;
    isActive:boolean;
}