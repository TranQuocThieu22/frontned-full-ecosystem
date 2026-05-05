import {IconCheck, IconClockExclamation, IconClockHour12, TablerIcon} from "@tabler/icons-react";

export enum EnumTaskDetailReportStatus {
    IsSubmitted = 1,
    IsValid = 2,
    IsExpired = 3,
}

export const EnumLabelSubmissionStatus: Record<EnumTaskDetailReportStatus, string> = {
    [EnumTaskDetailReportStatus.IsSubmitted]: "Đã nộp",
    [EnumTaskDetailReportStatus.IsValid]: "Còn hạn",
    [EnumTaskDetailReportStatus.IsExpired]: "Trễ hạn",
};

export const EnumColorSubmissionStatus: Record<EnumTaskDetailReportStatus, string> = {
    [EnumTaskDetailReportStatus.IsSubmitted]: "green",
    [EnumTaskDetailReportStatus.IsValid]: "blue",
    [EnumTaskDetailReportStatus.IsExpired]: "red",
};

export const EnumIconSubmissionStatus: Record<EnumTaskDetailReportStatus, TablerIcon> = {
    [EnumTaskDetailReportStatus.IsSubmitted]: IconCheck,
    [EnumTaskDetailReportStatus.IsValid]: IconClockHour12,
    [EnumTaskDetailReportStatus.IsExpired]: IconClockExclamation,
};
