import { IconCircleDashedCheck, IconClockPause, TablerIcon } from "@tabler/icons-react";

export enum EnumProcessingStatus {
  pending = 1,
  processed = 2,
}

export const EnumLabelProcessingStatus: Record<EnumProcessingStatus, string> = {
  [EnumProcessingStatus.pending]: "Chờ xử lý",
  [EnumProcessingStatus.processed]: "Đã xử lý",
};

export const EnumColorProcessingStatus: Record<EnumProcessingStatus, string> = {
  [EnumProcessingStatus.pending]: "yellow",
  [EnumProcessingStatus.processed]: "green",
};

export const EnumIconProcessingStatus: Record<EnumProcessingStatus, TablerIcon> = {
  [EnumProcessingStatus.pending]: IconClockPause,
  [EnumProcessingStatus.processed]: IconCircleDashedCheck,
};
