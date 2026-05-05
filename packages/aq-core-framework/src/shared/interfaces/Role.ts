import { RoleStatusColor, RoleStatusEnum, RoleStatusLabel } from "../const/enum/EnumRoleStatus";
import { BaseEntity } from "./BaseEntity";

export { RoleStatusColor, RoleStatusEnum, RoleStatusLabel };

export interface Role extends BaseEntity {
    description?: string
    isGlobal?: boolean
    category?: string | null
    tenantId?: string | null
    status?: RoleStatusEnum
}

export interface CreateRoleRequest {
    code?: string | null;
    name?: string | null;
    description?: string | null;
    isGlobal?: boolean;
    category?: string | null;
    tenantId?: string | null;
}

export interface UpdateRoleRequest {
    name?: string | null;
    description?: string | null;
}

export interface AssignPermissionsRequest {
    permissionIds?: string[] | null;
}

export interface RoleGetAllParams {
    TenantId?: string;
    PageNumber?: number;
    PageSize?: number;
}

