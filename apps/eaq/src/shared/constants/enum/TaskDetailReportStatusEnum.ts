import {IconCheck, IconClockExclamation, IconClockHour12, TablerIcon} from "@tabler/icons-react";

export enum TaskDetailReportStatusEnum {
    IsSubmitted = 1,
    IsValid = 2,
    IsExpired = 3,
}

export const TaskDetailReportStatusEnumLabel: Record<TaskDetailReportStatusEnum, string> = {
    [TaskDetailReportStatusEnum.IsSubmitted]: "Đã nộp",
    [TaskDetailReportStatusEnum.IsValid]: "Còn hạn",
    [TaskDetailReportStatusEnum.IsExpired]: "Trễ hạn",
};

export const TaskDetailReportStatusEnumColor: Record<TaskDetailReportStatusEnum, string> = {
    [TaskDetailReportStatusEnum.IsSubmitted]: "green",
    [TaskDetailReportStatusEnum.IsValid]: "blue",
    [TaskDetailReportStatusEnum.IsExpired]: "red",
};

export const TaskDetailReportStatusEnumStatus: Record<TaskDetailReportStatusEnum, TablerIcon> = {
    [TaskDetailReportStatusEnum.IsSubmitted]: IconCheck,
    [TaskDetailReportStatusEnum.IsValid]: IconClockHour12,
    [TaskDetailReportStatusEnum.IsExpired]: IconClockExclamation,
};
