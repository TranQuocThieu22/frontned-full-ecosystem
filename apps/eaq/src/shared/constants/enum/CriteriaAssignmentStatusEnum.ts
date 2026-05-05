import { IconCheck, IconClock, IconExchangeFilled, TablerIcon } from "@tabler/icons-react";

export enum EnumCriteriaAssignmentStatus {
  NotReviewed = 1, // Chưa kiểm duyệt
  Reviewed = 2, // Đã kiểm duyệt
  NeedChanging = 3, // Yêu cầu hiệu chỉnh
}

export const CriteriaAssignmentStatusEnumLabel: Record<EnumCriteriaAssignmentStatus, string> = {
  [EnumCriteriaAssignmentStatus.NotReviewed]: "Chưa kiểm duyệt",
  [EnumCriteriaAssignmentStatus.Reviewed]: "Đã kiểm duyệt",
  [EnumCriteriaAssignmentStatus.NeedChanging]: "Yêu cầu hiệu chỉnh",
};

export const CriteriaAssignmentStatusEnumColor: Record<EnumCriteriaAssignmentStatus, string> = {
  [EnumCriteriaAssignmentStatus.NotReviewed]: "gray",
  [EnumCriteriaAssignmentStatus.Reviewed]: "green",
  [EnumCriteriaAssignmentStatus.NeedChanging]: "orange",
};

export const CriteriaAssignmentStatusEnumIcon: Record<EnumCriteriaAssignmentStatus, TablerIcon> = {
  [EnumCriteriaAssignmentStatus.NotReviewed]: IconClock,
  [EnumCriteriaAssignmentStatus.Reviewed]: IconCheck,
  [EnumCriteriaAssignmentStatus.NeedChanging]: IconExchangeFilled,
};