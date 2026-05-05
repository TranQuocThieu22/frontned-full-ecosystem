export enum EnumPostCategory {
  JournalArticle = 1,
  ProceedingsPaper = 2,
  ConferencePaper = 3,
}

export const EnumLabelPostCategory: Record<EnumPostCategory, string> = {
  [EnumPostCategory.JournalArticle]: "Tạp chí",
  [EnumPostCategory.ProceedingsPaper]: "Kỷ yếu Hội nghị",
  [EnumPostCategory.ConferencePaper]: "Tham luận Hội nghị",
};
