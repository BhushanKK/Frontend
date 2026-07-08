export interface RoleMenuPermission {
    menuId: number;
    menuName: string;
    parentMenuId: number | null;
    parentMenuName: string | null;
    canView: boolean;
    canAdd: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canPrint: boolean;
    canExport: boolean;
}

export interface RoleMenuPermissionResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: RoleMenuPermission[];
}

export interface SaveRoleMenuPermission {
    roleId: number;
    permissions: RoleMenuPermission[];
}