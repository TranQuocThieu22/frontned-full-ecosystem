import { IconChecks, IconCircleDashedX, IconHourglass, IconPencilCog, TablerIcon } from "@tabler/icons-react";

export enum EnumProposalReviewStatus {
  NotReviewed = 1,
  Approved = 2,
  RequiresRevision = 3,
  NotApproved = 4,
}

export const EnumLabelProposalReviewStatus: Record<EnumProposalReviewStatus, string> = {
  [EnumProposalReviewStatus.NotReviewed]: "Chưa kiểm tra",
  [EnumProposalReviewStatus.Approved]: "Đồng ý",
  [EnumProposalReviewStatus.RequiresRevision]: "Yêu cầu hiệu chỉnh",
  [EnumProposalReviewStatus.NotApproved]: "Không đồng ý",
};

export const EnumColorProposalReviewStatus: Record<EnumProposalReviewStatus, string> = {
  [EnumProposalReviewStatus.NotReviewed]: "gray",
  [EnumProposalReviewStatus.Approved]: "green",
  [EnumProposalReviewStatus.RequiresRevision]: "orange",
  [EnumProposalReviewStatus.NotApproved]: "red",
};

/** Icon cho enum trạng thái đề tài */
export const EnumIconProposalReviewStatus: Record<EnumProposalReviewStatus, TablerIcon> = {
  [EnumProposalReviewStatus.NotReviewed]: IconHourglass,
  [EnumProposalReviewStatus.Approved]: IconChecks,
  [EnumProposalReviewStatus.RequiresRevision]: IconPencilCog,
  [EnumProposalReviewStatus.NotApproved]: IconCircleDashedX,
};