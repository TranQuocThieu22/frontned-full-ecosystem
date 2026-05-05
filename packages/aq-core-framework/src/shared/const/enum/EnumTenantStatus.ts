import type { MantineColor } from "@mantine/core"

export enum TenantStatusEnum {
  active = 1,
  suspended = 2,
}

export const TenantStatusLabel: Record<TenantStatusEnum, string> = {
  [TenantStatusEnum.active]: "Kích hoạt",
  [TenantStatusEnum.suspended]: "Tạm dừng",
}

export const TenantStatusColor: Record<TenantStatusEnum, MantineColor> = {
  [TenantStatusEnum.active]: "green",
  [TenantStatusEnum.suspended]: "red",
}
