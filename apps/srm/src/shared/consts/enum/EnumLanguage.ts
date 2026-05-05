export enum EnumLanguage {
  Vietnamese = 1,
  English = 2,
}

export const EnumLabelLanguage: Record<EnumLanguage, string> = {
  [EnumLanguage.Vietnamese]: "Tiếng Việt",
  [EnumLanguage.English]: "Tiếng Anh",
};