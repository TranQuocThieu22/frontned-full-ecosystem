export enum analysisTypeEnum {
    Requirement = 1,
    Limitation = 2,
}

export const AnalysisTypeEnumEnumLabel: Record<analysisTypeEnum, string> = {
    [analysisTypeEnum.Requirement]: "Yêu cầu",
    [analysisTypeEnum.Limitation]: "Hạn chế",
};
