export interface RoleTranslation {
    languageCode: string;
    roleName: string;
}

export interface Role {
    roleId: number;
    roleName: string;
    isActive: boolean;
    translations: RoleTranslation[];
}

export interface RoleResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Role[];
}

export interface RoleFormValues {
    roleName: string;
    isActive: boolean;
    translations: RoleTranslation[];
}