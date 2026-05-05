import { IconCheck, IconClock, IconClockX, IconEdit, IconExclamationMark, IconRefreshAlert, IconSquareRoundedXFilled, TablerIcon } from "@tabler/icons-react";

export enum ReportStatusEnum {
  submitted = 1,
  pending = 2,
  expired = 3,
  NotSubmitted = 4,
  NeedToCorrect = 5,
}

export const ReportStatusEnumLabel: Record<ReportStatusEnum, string> = {
  [ReportStatusEnum.submitted]: "Đã nộp",
  [ReportStatusEnum.pending]: "Còn hạn",
  [ReportStatusEnum.expired]: "Quá hạn",
  [ReportStatusEnum.NotSubmitted]: "Chưa nộp",
  [ReportStatusEnum.NeedToCorrect]: "Cần chỉnh sửa",
};

export const ReportStatusEnumColor: Record<ReportStatusEnum, string> = {
  [ReportStatusEnum.submitted]: "green",
  [ReportStatusEnum.pending]: "blue",
  [ReportStatusEnum.expired]: "red",
  [ReportStatusEnum.NotSubmitted]: "yellow",
  [ReportStatusEnum.NeedToCorrect]: "orange",
};

export const ReportStatusEnumIcon: Record<ReportStatusEnum, TablerIcon> = {
  [ReportStatusEnum.submitted]: IconCheck,
  [ReportStatusEnum.pending]: IconClock,
  [ReportStatusEnum.expired]: IconClockX,
  [ReportStatusEnum.NotSubmitted]: IconExclamationMark,
  [ReportStatusEnum.NeedToCorrect]: IconEdit,
};
