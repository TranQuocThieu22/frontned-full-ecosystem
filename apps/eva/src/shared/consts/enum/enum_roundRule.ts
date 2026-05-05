export enum enum_roundRule {
    RoundTo025 = 1, // 0.25
    RoundTo05 = 2,  // 0.5
    RoundTo01 = 3,  // 0.1
}


export const enumLabel_roundRule: Record<enum_roundRule, string> = {
    [enum_roundRule.RoundTo025]: '0.25',
    [enum_roundRule.RoundTo05]: '0.5',
    [enum_roundRule.RoundTo01]: '0.1',
};