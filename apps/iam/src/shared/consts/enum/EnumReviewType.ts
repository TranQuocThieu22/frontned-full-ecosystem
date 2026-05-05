/** Enum loại kiểm tra topic */
export enum EnumReviewType {
  PreliminaryReview = 1,
  ProposalReview = 2,
  CompleteProposalReview = 3,
}

export const EnumLabelReviewType: Record<EnumReviewType, string> = {
  [EnumReviewType.PreliminaryReview]: "Kiểm tra sơ bộ đề xuất nhiệm vụ",
  [EnumReviewType.ProposalReview]: "Kiểm tra thuyết minh",
  [EnumReviewType.CompleteProposalReview]: "Kiểm tra hoàn thiện thuyết minh",
};

