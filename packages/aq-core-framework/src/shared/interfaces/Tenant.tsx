
import { BaseEntity } from "@aq-fe/aq-core-framework/shared/interfaces/BaseEntity"
import { TenantStatusColor, TenantStatusEnum, TenantStatusLabel } from "../const/enum/EnumTenantStatus"

export { TenantStatusColor, TenantStatusEnum, TenantStatusLabel }

export interface Tenant extends BaseEntity {
  status?: TenantStatusEnum
  note?: string
  rateLimit?: number
  auditRetention?: number
  adminEmail?: string
  domain?: string
}

/** Giá trị dropdown thời gian lưu trữ audit (ngày) */
export const AUDIT_RETENTION_OPTIONS = [
  { value: "30", label: "30 ngày" },
  { value: "90", label: "90 ngày" },
  { value: "180", label: "180 ngày" },
  { value: "365", label: "365 ngày" },
] as const