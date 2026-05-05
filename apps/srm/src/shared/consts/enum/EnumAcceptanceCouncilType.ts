

/** Enum loại thành lập hội đồng */
export enum EnumAcceptanceCouncilType {
  Faculty = 1,
  University = 2,  
}

/** Label enum loại vai trò */
export const EnumLabelAcceptanceCouncilType: Record<EnumAcceptanceCouncilType, string> = {
  [EnumAcceptanceCouncilType.Faculty]: "Cấp khoa",
  [EnumAcceptanceCouncilType.University]: "Cấp trường",
};
