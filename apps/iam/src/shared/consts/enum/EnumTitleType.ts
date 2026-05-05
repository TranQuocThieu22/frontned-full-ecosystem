/** Enum loại vai trò */
export enum EnumTitleType {
  ResearchProject = 1,
  Publication = 2,
  Council = 3,
  StudentProjectRole = 4
}

/** Label enum loại vai trò */
export const EnumLabelTitleType: Record<EnumTitleType, string> = {
  [EnumTitleType.ResearchProject]: "Vai trò thực hiện đề tài",
  [EnumTitleType.Publication]: "Vai trò thực hiện công bố",
  [EnumTitleType.Council]: "Vai trò tham gia hội đồng",
  [EnumTitleType.StudentProjectRole]: "Vai trò trong đề tài sinh viên"
};
