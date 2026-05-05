export enum EnumCouncilType {
  /** Hội đồng tư vấn tuyển chọn */
  AdvisoryCouncil = 1,
  SelectionCouncil = 2,
  AcceptanceCouncil = 3,
  BudgetApprovalCouncil = 4,
}

export const EnumLabelCouncilType: Record<EnumCouncilType, string> = {
  [EnumCouncilType.AdvisoryCouncil]: "Hội đồng tư vấn danh mục",
  [EnumCouncilType.SelectionCouncil]: "Hội đồng tuyển chọn danh mục",
  [EnumCouncilType.AcceptanceCouncil]: "Hội đồng nghiệm thu đề tài",
  [EnumCouncilType.BudgetApprovalCouncil]: "Hội đồng thẩm định kinh phí",
};
