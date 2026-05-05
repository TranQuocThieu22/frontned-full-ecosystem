import { IconCheck, IconClock, IconPencil, IconX, TablerIcon } from "@tabler/icons-react";

export enum EnumReportHistoryReviewStatus {
    Pending = 0,
    RequireRevision = 1,
    NotQualified = 2,
    OnSchedule = 3
}

export const EnumLabelReportHistoryReviewStatus: Record<EnumReportHistoryReviewStatus, string> = {
    [EnumReportHistoryReviewStatus.Pending]: "Chờ kiểm tra",
    [EnumReportHistoryReviewStatus.RequireRevision]: "Yêu cầu hiệu chỉnh",
    [EnumReportHistoryReviewStatus.NotQualified]: "Không đạt yêu cầu",
    [EnumReportHistoryReviewStatus.OnSchedule]: "Đúng tiến độ"
};



export const EnumColorReportHistoryReviewStatus: Record<EnumReportHistoryReviewStatus, string> = {
    [EnumReportHistoryReviewStatus.Pending]: "gray",
    [EnumReportHistoryReviewStatus.RequireRevision]: "yellow",
    [EnumReportHistoryReviewStatus.NotQualified]: "red",
    [EnumReportHistoryReviewStatus.OnSchedule]: "green",
};

export const EnumIconReportHistoryReviewStatus: Record<EnumReportHistoryReviewStatus, TablerIcon> = {
    [EnumReportHistoryReviewStatus.Pending]: IconClock,           // Chờ kiểm tra
    [EnumReportHistoryReviewStatus.RequireRevision]: IconPencil,  // Yêu cầu hiệu chỉnh
    [EnumReportHistoryReviewStatus.NotQualified]: IconX,          // Không đạt yêu cầu
    [EnumReportHistoryReviewStatus.OnSchedule]: IconCheck        // Đúng tiến độ
};