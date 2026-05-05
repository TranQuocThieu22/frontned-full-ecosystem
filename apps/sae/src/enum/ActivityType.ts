export enum ActivityTypeEnum {
    All = 1,
    Mandatory = 2,
    Optional = 3
}

export const ActivityTypeLabel: Record<ActivityTypeEnum, string> = {
    [ActivityTypeEnum.All]: "Tất cả",
    [ActivityTypeEnum.Mandatory]: "Chỉ hoạt động bắt buộc",
    [ActivityTypeEnum.Optional]: "Chỉ hoạt động tùy chọn"
}