export enum ScopeStatusEnum {
    active = 1,
    disabled = 2,
}

export const ScopeStatusLabel: Record<ScopeStatusEnum, string> = {
    [ScopeStatusEnum.active]: "ACTIVE",
    [ScopeStatusEnum.disabled]: "DISABLED",
}

export const ScopeStatusColor: Record<ScopeStatusEnum, string> = {
    [ScopeStatusEnum.active]: "green",
    [ScopeStatusEnum.disabled]: "red",
}

export type ScopeLevel = "SYSTEM" | "TENANT"

export const ScopeLevelLabel: Record<ScopeLevel, string> = {
    SYSTEM: "System",
    TENANT: "Tenant",
}

export const ScopeLevelColor: Record<ScopeLevel, string> = {
    SYSTEM: "blue",
    TENANT: "orange",
}
