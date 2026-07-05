export interface Role {
    roleId:number;
    roleName:string;
    isActive:boolean;
}

export interface RoleResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Role[];
}

export interface RoleFormValues{
    roleName:string;
    isActive:boolean;
}