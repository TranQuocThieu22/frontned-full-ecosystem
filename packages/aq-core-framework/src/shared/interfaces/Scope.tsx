import { ScopeLevel, ScopeLevelColor, ScopeLevelLabel, ScopeStatusColor, ScopeStatusEnum, ScopeStatusLabel } from "../const/enum/EnumScopeStatus"
import { BaseEntity } from "./BaseEntity"


export { ScopeLevelColor, ScopeLevelLabel, ScopeStatusColor, ScopeStatusEnum, ScopeStatusLabel }
export type { ScopeLevel }

export interface Scope extends BaseEntity {
    /** Mã định danh duy nhất — không sửa sau khi tạo */
    scopeCode: string
    /** Tên hiển thị của Scope */
    scopeName: string
    /** Khóa thuộc tính dùng để đánh giá (ví dụ: department, faculty, campus) */
    attributeKey: string
    /** Danh sách giá trị hợp lệ, hoặc ["*"] cho toàn quyền */
    allowedValues: string[]
    /** SYSTEM = toàn hệ thống, TENANT = theo từng trường */
    scopeLevel: ScopeLevel
    status?: ScopeStatusEnum
    description?: string
    /** Áp dụng cho tenant nào (khi scopeLevel = TENANT) */
    tenantCode?: string
}

/** Gán Scope trực tiếp cho User — ưu tiên cao nhất */
export interface UserScopeAssignment {
    id?: number
    userId: number
    scopeId: string
}

/** Gán Scope cho Role — kế thừa xuống User */
export interface RoleScopeAssignment {
    id?: number
    roleId: number
    scopeId: string
}

/** Scope đang thực sự áp dụng cho một đối tượng (User hoặc Role) */
export type EffectiveScopeSource = "DIRECT_USER" | "INHERITED_ROLE" | "DEFAULT_TENANT"

export interface EffectiveScope {
    scopeCode: string
    scopeName: string
    attributeKey: string
    allowedValues: string[]
    source: EffectiveScopeSource
    /** Tên nguồn — ví dụ: tên role nếu được kế thừa */
    sourceName?: string
}

export const EFFECTIVE_SCOPE_SOURCE_COLOR: Record<EffectiveScopeSource, string> = {
    DIRECT_USER: "blue",
    INHERITED_ROLE: "green",
    DEFAULT_TENANT: "gray",
}

export const EFFECTIVE_SCOPE_SOURCE_LABEL: Record<EffectiveScopeSource, string> = {
    DIRECT_USER: "Gán trực tiếp User",
    INHERITED_ROLE: "Kế thừa từ Role",
    DEFAULT_TENANT: "Mặc định Tenant",
}

/** Mock data — dùng khi backend chưa có */
export const MOCK_SCOPES: Scope[] = [
    {
        id: "1",
        scopeCode: "SCOPE_DEPT_IT",
        scopeName: "Phòng IT",
        attributeKey: "department",
        allowedValues: ["IT"],
        scopeLevel: "TENANT",
        status: ScopeStatusEnum.active,
        tenantCode: "DAV",
    },
    {
        id: "2",
        scopeCode: "SCOPE_DEPT_MARKETING",
        scopeName: "Phòng Marketing",
        attributeKey: "department",
        allowedValues: ["Marketing"],
        scopeLevel: "TENANT",
        status: ScopeStatusEnum.active,
        tenantCode: "DAV",
    },
    {
        id: "3",
        scopeCode: "SCOPE_CAMPUS_HCM",
        scopeName: "Cơ sở TP.HCM",
        attributeKey: "campus",
        allowedValues: ["HCM"],
        scopeLevel: "TENANT",
        status: ScopeStatusEnum.active,
        tenantCode: "DAV",
    },
    {
        id: "4",
        scopeCode: "SCOPE_COHORT_2024",
        scopeName: "Khóa 2024",
        attributeKey: "cohort",
        allowedValues: ["2024"],
        scopeLevel: "TENANT",
        status: ScopeStatusEnum.active,
        tenantCode: "DAV",
    },
    {
        id: "5",
        scopeCode: "SCOPE_ALL_SYSTEM",
        scopeName: "Toàn hệ thống",
        attributeKey: "*",
        allowedValues: ["*"],
        scopeLevel: "SYSTEM",
        status: ScopeStatusEnum.disabled,
        description: "Cho phép truy cập toàn bộ dữ liệu (cần IAM Operator)",
    },
]
