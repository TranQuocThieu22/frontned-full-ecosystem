import { IconCircleCheck, IconCircleDashed, IconRefreshAlert, TablerIcon } from "@tabler/icons-react";

export enum TaskDetailVerificationStatusEnum {
    NotReviewed = 1,
    MeetsStandard = 2,
    RequiresCorrection = 3
}

export const TaskDetailVerificationStatusEnumLabel: Record<TaskDetailVerificationStatusEnum, string> = {
    [TaskDetailVerificationStatusEnum.NotReviewed]: "Chưa kiểm tra",
    [TaskDetailVerificationStatusEnum.MeetsStandard]: "Đạt yêu cầu",
    [TaskDetailVerificationStatusEnum.RequiresCorrection]: "Cần chỉnh sửa",
};

export const TaskDetailVerificationStatusEnumColor: Record<TaskDetailVerificationStatusEnum, string> = {
    [TaskDetailVerificationStatusEnum.NotReviewed]: "gray",
    [TaskDetailVerificationStatusEnum.MeetsStandard]: "green",
    [TaskDetailVerificationStatusEnum.RequiresCorrection]: "red.5",
};

export const TaskDetailVerificationStatusEnumIcon: Record<TaskDetailVerificationStatusEnum, TablerIcon> = {
    [TaskDetailVerificationStatusEnum.NotReviewed]: IconCircleDashed,
    [TaskDetailVerificationStatusEnum.MeetsStandard]: IconCircleCheck,
    [TaskDetailVerificationStatusEnum.RequiresCorrection]: IconRefreshAlert,
};

