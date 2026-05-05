import {IconCheck, IconEdit, IconX, TablerIcon} from "@tabler/icons-react";

export enum TrackingStatusEnum {
  notChecked = 1,
  approved = 2,
  requiresCorrection = 3,
}

export const TrackingStatusEnumLabel: Record<TrackingStatusEnum, string> = {
  [TrackingStatusEnum.notChecked]: "Chưa kiểm tra",
  [TrackingStatusEnum.approved]: "Đạt yêu cầu",
  [TrackingStatusEnum.requiresCorrection]: "Cần chỉnh sửa",
};

export const TrackingStatusEnumColor: Record<TrackingStatusEnum, string> = {
  [TrackingStatusEnum.notChecked]: "red",
  [TrackingStatusEnum.approved]: "green",
  [TrackingStatusEnum.requiresCorrection]: "orange",
};

export const TrackingStatusEnumIcon: Record<TrackingStatusEnum, TablerIcon> = {
  [TrackingStatusEnum.notChecked]: IconX,
  [TrackingStatusEnum.approved]: IconCheck,
  [TrackingStatusEnum.requiresCorrection]: IconEdit,
};
