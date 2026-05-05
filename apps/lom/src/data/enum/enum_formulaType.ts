export enum enum_formulaType {
    attendace = 1,
    progress = 2,
    final = 3
}

export const enumLabel_formulaType: Record<enum_formulaType, string> = {
    [enum_formulaType.attendace]: "Chuyên cần",
    [enum_formulaType.progress]: "Quá trình",
    [enum_formulaType.final]: "Cuối kỳ",
};