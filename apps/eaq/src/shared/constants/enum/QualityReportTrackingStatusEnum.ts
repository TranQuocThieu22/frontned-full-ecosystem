import {IconCheck, IconHourglass, IconX, TablerIcon} from "@tabler/icons-react";

export enum QualityReportTrackingStatusEnum {
    SUBMITTED = 1,
    AVAILABLE = 2,
    EXPIRED = 3
}

export const QualityReportTrackingStatusEnumLabel: Record<QualityReportTrackingStatusEnum, string> = {
    [QualityReportTrackingStatusEnum.SUBMITTED]: "Đã nộp",
    [QualityReportTrackingStatusEnum.AVAILABLE]: "Còn hạn",
    [QualityReportTrackingStatusEnum.EXPIRED]: "Trễ hạn",
};

export const QualityReportTrackingStatusEnumColor: Record<QualityReportTrackingStatusEnum, string> = {
    [QualityReportTrackingStatusEnum.SUBMITTED]: "green",
    [QualityReportTrackingStatusEnum.AVAILABLE]: "blue",
    [QualityReportTrackingStatusEnum.EXPIRED]: "red",
};

export const QualityReportTrackingStatusEnumIcon: Record<QualityReportTrackingStatusEnum, TablerIcon> = {
    [QualityReportTrackingStatusEnum.SUBMITTED]: IconCheck,
    [QualityReportTrackingStatusEnum.AVAILABLE]: IconHourglass,
    [QualityReportTrackingStatusEnum.EXPIRED]: IconX,
};