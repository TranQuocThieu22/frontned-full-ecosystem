import { IconBolt, IconChecks, IconCircleCheck, IconCircleDashedX, IconClockPause, IconClockPlus, IconHourglass, IconPencilCog, TablerIcon } from "@tabler/icons-react";

export enum EnumContractExecutionStatus {
  InProgress = 1,
  UnderRevision = 2,
  Extended = 3,
  Paused = 4,
  Terminated = 5,
  PendingAcceptance = 6,
  Accepted = 7,
  Liquidated = 8,
  NotAccepted = 9,
}

export const EnumLabelContractExecutionStatus: Record<EnumContractExecutionStatus, string> = {
  [EnumContractExecutionStatus.InProgress]: "Đang thực hiện",
  [EnumContractExecutionStatus.UnderRevision]: "Điều chỉnh",
  [EnumContractExecutionStatus.Extended]: "Gia hạn",
  [EnumContractExecutionStatus.Paused]: "Tạm dừng",
  [EnumContractExecutionStatus.Terminated]: "Đình chỉ hợp đồng",
  [EnumContractExecutionStatus.PendingAcceptance]: "Chờ nghiệm thu",
  [EnumContractExecutionStatus.Accepted]: "Đã nghiệm thu",
  [EnumContractExecutionStatus.Liquidated]: "Đã thanh lý",
  [EnumContractExecutionStatus.NotAccepted]: "Không được nghiệm thu",
};

export const EnumColorContractExecutionStatus: Record<EnumContractExecutionStatus, string> = {
  [EnumContractExecutionStatus.InProgress]: "#344CB7",
  [EnumContractExecutionStatus.UnderRevision]: "orange",
  [EnumContractExecutionStatus.Extended]: "violet",
  [EnumContractExecutionStatus.Paused]: "yellow",
  [EnumContractExecutionStatus.Terminated]: "#F93827",
  [EnumContractExecutionStatus.PendingAcceptance]: "blue",
  [EnumContractExecutionStatus.Accepted]: "green",
  [EnumContractExecutionStatus.Liquidated]: "#059212",
  [EnumContractExecutionStatus.NotAccepted]: "red",
    };

export const EnumIconContractExecutionStatus: Record<EnumContractExecutionStatus, TablerIcon> = {
  [EnumContractExecutionStatus.InProgress]: IconBolt,
  [EnumContractExecutionStatus.UnderRevision]: IconPencilCog,
  [EnumContractExecutionStatus.Extended]: IconClockPlus,
  [EnumContractExecutionStatus.Paused]: IconClockPause,
  [EnumContractExecutionStatus.Terminated]: IconCircleDashedX,
  [EnumContractExecutionStatus.PendingAcceptance]: IconHourglass,
  [EnumContractExecutionStatus.Accepted]: IconChecks,
  [EnumContractExecutionStatus.Liquidated]: IconCircleCheck,
  [EnumContractExecutionStatus.NotAccepted]: IconCircleDashedX,
};