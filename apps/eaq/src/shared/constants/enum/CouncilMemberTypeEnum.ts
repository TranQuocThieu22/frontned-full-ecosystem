

export enum councilMemberTypeEnum {
    CouncilMember = 1,
    Secretariat = 2,
}

export const CouncilMemberTypeEnumLabel: Record<councilMemberTypeEnum, string> = {
    [councilMemberTypeEnum.CouncilMember]: "Thành viên hội đồng",
    [councilMemberTypeEnum.Secretariat]: "Thư ký hội đồng",
};