export enum UserStatusEnum {
  active = 1,
  disabled = 2,
  locked = 3,
}

export const UserStatusLabel: Record<UserStatusEnum, string> = {
  [UserStatusEnum.active]: "Hoạt động",
  [UserStatusEnum.disabled]: "Vô hiệu",
  [UserStatusEnum.locked]: "Khóa",
}

export const UserStatusColor: Record<UserStatusEnum, string> = {
  [UserStatusEnum.active]: "green",
  [UserStatusEnum.disabled]: "red",
  [UserStatusEnum.locked]: "orange",
}

export type UserType = "STUDENT" | "LECTURER" | "STAFF" | "OTHER"

export const UserTypeLabel: Record<UserType, string> = {
  STUDENT: "Sinh viên",
  LECTURER: "Giảng viên",
  STAFF: "Cán bộ",
  OTHER: "Khác",
}
