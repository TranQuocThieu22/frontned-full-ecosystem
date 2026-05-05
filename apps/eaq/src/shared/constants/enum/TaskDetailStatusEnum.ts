import {IconCircleCheck, IconCircleDashed, IconClock, TablerIcon} from "@tabler/icons-react";

export enum taskDetailStatusEnum {
    NotStarted = 1,
    InProgress = 2,
    Completed = 3
}

export const TaskDetailStatusEnumLabel: Record<taskDetailStatusEnum, string> = {
    [taskDetailStatusEnum.NotStarted]: "Chưa bắt đầu",
    [taskDetailStatusEnum.InProgress]: "Đang thực hiện",
    [taskDetailStatusEnum.Completed]: "Đã hoàn thành",
};

export const TaskDetailStatusEnumColor: Record<taskDetailStatusEnum, string> = {
    [taskDetailStatusEnum.NotStarted]: "gray",
    [taskDetailStatusEnum.InProgress]: "blue",
    [taskDetailStatusEnum.Completed]: "green",
};

export const TaskDetailStatusEnumIcon: Record<taskDetailStatusEnum, TablerIcon> = {
    [taskDetailStatusEnum.NotStarted]: IconCircleDashed,
    [taskDetailStatusEnum.InProgress]: IconClock,
    [taskDetailStatusEnum.Completed]: IconCircleCheck,
};

