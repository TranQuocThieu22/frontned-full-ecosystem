import { IconChecks, IconHourglass, IconPencilCog, TablerIcon } from "@tabler/icons-react";

export enum EnumProposalStatus {
  PendingPreliminaryCheck = 1,
  UnderRevision = 2,
  PreliminaryCheckFailed = 3,
  Approved = 4,
}

export const EnumProposalStatusLabels: Record<EnumProposalStatus, string> = {
  [EnumProposalStatus.PendingPreliminaryCheck]: "Chờ kiểm tra sơ bộ",
  [EnumProposalStatus.UnderRevision]: "Yêu cầu điều chỉnh sơ bộ",
  [EnumProposalStatus.PreliminaryCheckFailed]: "Không đạt yêu cầu sơ bộ",
  [EnumProposalStatus.Approved]: "Đạt kiểm tra sơ bộ",
};

export const EnumProposalStatusColors: Record<EnumProposalStatus, string> = {
  [EnumProposalStatus.PendingPreliminaryCheck]: "blue",
  [EnumProposalStatus.UnderRevision]: "orange",
  [EnumProposalStatus.PreliminaryCheckFailed]: "red",
  [EnumProposalStatus.Approved]: "green",
};

export const EnumIconProposalStatus: Record<EnumProposalStatus, TablerIcon> = {
  [EnumProposalStatus.PendingPreliminaryCheck]: IconHourglass,
  [EnumProposalStatus.UnderRevision]: IconPencilCog,
  [EnumProposalStatus.PreliminaryCheckFailed]: IconPencilCog,
  [EnumProposalStatus.Approved]: IconChecks,
};