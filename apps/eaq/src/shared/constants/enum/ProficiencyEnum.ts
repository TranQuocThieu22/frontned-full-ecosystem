export enum proficiencyEnum {
    Knowledge = 1,
    Skills = 2,
    AutonomyResponsibility = 3
}

export const proficiencyEnumLabel: Record<proficiencyEnum, string> = {
    [proficiencyEnum.Knowledge]: "Kiến thức",
    [proficiencyEnum.Skills]: "Kỹ năng",
    [proficiencyEnum.AutonomyResponsibility]: "Năng lực tự chủ và trách nhiệm",
};