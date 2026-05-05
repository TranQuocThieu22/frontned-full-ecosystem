export enum EnumEvaluationType {
  Score = 1,
  YesNo = 2,
  Text = 3,
}

export const EnumLabelEvaluationType: Record<EnumEvaluationType, string> = {
  [EnumEvaluationType.Score]: "Chấm điểm",
  [EnumEvaluationType.YesNo]: "Yes/No",
  [EnumEvaluationType.Text]: "Văn bản",
};
