import { BaseEntity } from "@aq-fe/aq-core-framework/shared/interfaces/BaseEntity";
import { MantineColor } from "@mantine/core";

export interface Activity extends BaseEntity {
    description?: string
    semesterId?: string
    semesterName?: string
    criterionCode?: string
    criteriaId?: string
    type?: ActivityTypeEnum;
    state?: ActivityStateEnum;
    maxScore?: number;
    quota?: number;
    registeredCount?: number;
    organizerUnit?: string
    code?: string
}

export enum ActivityStateEnum {
    DRAFT = 1,
    OPEN = 2,
    ONGOING = 3,
    RECORDING = 4,
    CLOSED = 5,
}

export const ActivityStateLabel: Record<ActivityStateEnum, string> = {
    [ActivityStateEnum.DRAFT]: "Bản nháp",
    [ActivityStateEnum.OPEN]: "Mở",
    [ActivityStateEnum.ONGOING]: "Đang diễn ra",
    [ActivityStateEnum.RECORDING]: "Đang ghi nhận điểm",
    [ActivityStateEnum.CLOSED]: "Đã đóng",
};

export const ActivityStateColor: Record<ActivityStateEnum, MantineColor> = {
    [ActivityStateEnum.DRAFT]: "yellow",
    [ActivityStateEnum.OPEN]: "cyan",
    [ActivityStateEnum.ONGOING]: "blue",
    [ActivityStateEnum.RECORDING]: "teal",
    [ActivityStateEnum.CLOSED]: "gray",
};

export const ActivityStateStyle: Record<ActivityStateEnum, { bg: string; color: string }> = {
    [ActivityStateEnum.DRAFT]: { bg: "#FFF8E1", color: "#92600A" },
    [ActivityStateEnum.OPEN]: { bg: "#EFF6FF", color: "#1D4ED8" },
    [ActivityStateEnum.ONGOING]: { bg: "#F5F3FF", color: "#6D28D9" },
    [ActivityStateEnum.RECORDING]: { bg: "#FFF7ED", color: "#C2410C" },
    [ActivityStateEnum.CLOSED]: { bg: "#F9FAFB", color: "#6B7280" },
};

export enum ActivityTypeEnum {
    MANDATORY = 1,
    OPTIONAL = 2,
}

export const ActivityTypeLabel: Record<ActivityTypeEnum, string> = {
    [ActivityTypeEnum.MANDATORY]: "Bắt buộc",
    [ActivityTypeEnum.OPTIONAL]: "Tự chọn",
};

export const ActivityTypeColor: Record<ActivityTypeEnum, string> = {
    [ActivityTypeEnum.MANDATORY]: "#3B5EFD",
    [ActivityTypeEnum.OPTIONAL]: "#7C3AED",
};
