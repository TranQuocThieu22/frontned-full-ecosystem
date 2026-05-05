/**
 * IAM Interfaces - Sprint 1 (US-A-04)
 * Theo FRD SAE DAV.md - Sprint 1 IAM Module + SRS IAM
 */

/**
 * Vai trò (Role) - Theo data model 7.3.9
 */
export interface IamRole {
    roleId?: string;
    id?: string; // alias for roleId (used by CustomDataTableAPI for deleteFn)
    code: string;
    name: string;
    description?: string;
    status: "active" | "inactive";
    permissionIds?: string[];
    userCount?: number;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Quyền (Permission) - Theo data model 7.3.9
 * Các permission code được hard-coded và pre-seeded trong database
 */
export interface IamPermission {
    permissionId: string;
    code: string;
    name: string;
    category?: string;
}

/**
 * Gán vai trò cho user - Theo data model 7.3.9
 */
export interface IamUserRoleAssignment {
    assignmentId?: string;
    userId: number;
    roleId: number;
    scopeType: ScopeType;
    scopeId: number;
    assignedAt?: string;
}

/**
 * Loại scope phân quyền - Theo BR-04
 */
export type ScopeType = "UNIVERSITY" | "FACULTY" | "CLASS";

/**
 * Scope item cho dropdown chọn
 */
export interface ScopeItem {
    scopeId: number;
    scopeName: string;
    scopeType: ScopeType;
}

/**
 * Tài khoản IAM (hiển thị trong bảng)
 */
export interface IamAccount {
    id?: number;
    userId?: number;
    userName?: string;
    fullName: string;
    email?: string;
    phoneNumber?: string;
    facultyName?: string;
    facultyId?: number;
    classId?: number;
    className?: string;
    isBlocked?: boolean;
    roles?: UserRoleDisplay[];
    note?: string;
    createdAt?: string;
}

/**
 * Vai trò đã gán cho user (hiển thị badge)
 */
export interface UserRoleDisplay {
    roleId: number;
    roleName: string;
    scopeType: ScopeType;
    scopeName: string;
    assignedAt?: string;
}

/**
 * Form payload — Tạo/Cập nhật vai trò
 */
export interface IamRoleFormPayload {
    code: string;
    name: string;
    description?: string;
    status: "active" | "inactive";
    permissionIds: string[];
}

/**
 * Form payload — Gán vai trò cho user
 */
export interface IamAssignRolePayload {
    userId: number;
    roleId: number;
    scopeType: ScopeType;
    scopeId: number;
}

/**
 * Filter state cho danh sách vai trò
 */
export interface IamRoleFilterState {
    keyword: string;
    status: string;
    pageIndex: number;
    pageSize: number;
}

export const DEFAULT_IAM_ROLE_FILTER: IamRoleFilterState = {
    keyword: "",
    status: "",
    pageIndex: 0,
    pageSize: 10,
};

/**
 * FRD Sprint 1 — Pre-seeded Permission Codes (BR-05 enforcement)
 */
export const PERMISSION_CODES = {
    ACTIVITY_VIEW: "ACTIVITY_VIEW",
    ACTIVITY_APPROVE: "ACTIVITY_APPROVE",
    RL_APPROVE_CLASS: "RL_APPROVE_CLASS",
    RL_CONFIG: "RL_CONFIG",
    IAM_MANAGE: "IAM_MANAGE",
} as const;

export type PermissionCode = typeof PERMISSION_CODES[keyof typeof PERMISSION_CODES];
