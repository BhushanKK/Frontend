export interface UserPermission {
    menuId: number;
    menuName: string;
    menuUrl: string | null;
    icon: string | null;

    canView: boolean;
    canAdd: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canPrint: boolean;
    canExport: boolean;
}