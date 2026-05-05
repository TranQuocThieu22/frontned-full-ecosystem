export enum enum_proficiency {
    Knowledge = 1,
    Skills = 2,
    AutonomyResponsibility = 3
}

export const enumLabel_proficiency: Record<enum_proficiency, string> = {
    [enum_proficiency.Knowledge]: "Kiến thức",
    [enum_proficiency.Skills]: "Kỹ năng",
    [enum_proficiency.AutonomyResponsibility]: "Năng lực tự chủ và trách nhiệm",
};