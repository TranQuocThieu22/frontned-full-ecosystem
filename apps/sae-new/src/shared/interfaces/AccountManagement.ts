import { User } from "@aq-fe/core-ui/shared/interfaces/User";

/**
 * Account Management Types - Sprint 1 (US-A-04)
 * Theo SRS IAM + FRD SAE DAV
 */

// Extended User với roles cho hiển thị
export interface AccountUser extends User {
  roles?: UserRole[];
  primaryRoleName?: string;
}

// Vai trò được gán cho user
export interface UserRole {
  roleId: number;
  roleName: string;
  scopeType: ScopeType;
  scopeId: number;
  scopeName: string;
}

// Loại scope cho phân quyền
export type ScopeType = "UNIVERSITY" | "FACULTY" | "CLASS";

// Filter state cho danh sách tài khoản
export interface AccountFilterState {
  keyword: string;
  roleId: string;
  status: string;
  pageIndex: number;
  pageSize: number;
}

// Payload tạo tài khoản mới
export interface CreateAccountPayload {
  userName: string;
  password: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  workingUnitId?: number;
  isBlocked: boolean;
}

// Payload cập nhật tài khoản
export interface UpdateAccountPayload {
  id: number;
  fullName: string;
  isBlocked: boolean;
  phoneNumber?: string;
  note?: string;
}

// Payload gán vai trò
export interface AssignRolePayload {
  userId: number;
  roleId: number;
  scopeType: ScopeType;
  scopeId: number;
}

// Default filter values
export const DEFAULT_ACCOUNT_FILTERS: AccountFilterState = {
  keyword: "",
  roleId: "",
  status: "",
  pageIndex: 0,
  pageSize: 10,
};
