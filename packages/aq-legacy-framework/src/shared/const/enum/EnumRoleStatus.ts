export type RoleType = "SYSTEM" | "TENANT"

export const RoleTypeLabel: Record<RoleType, string> = {
  SYSTEM: "System (Readonly)",
  TENANT: "Tenant",
}

export enum RoleStatusEnum {
  active = 1,
  disabled = 2,
}

export const RoleStatusLabel: Record<RoleStatusEnum, string> = {
  [RoleStatusEnum.active]: "Hoạt động",
  [RoleStatusEnum.disabled]: "Vô hiệu",
}
export const RoleStatusColor: Record<RoleStatusEnum, string> = {
  [RoleStatusEnum.active]: "green",
  [RoleStatusEnum.disabled]: "red",
}
