export enum EnumEvaluationCommitteeType {
  EvaluationCommittee = 1,
  CostAppraisal = 2,
}

export const EnumLabelEvaluationCommitteeType: Record<EnumEvaluationCommitteeType, string> = {
  [EnumEvaluationCommitteeType.EvaluationCommittee]: "Hội đồng đánh giá",
  [EnumEvaluationCommitteeType.CostAppraisal]: "Thẩm định kinh phí",
};
