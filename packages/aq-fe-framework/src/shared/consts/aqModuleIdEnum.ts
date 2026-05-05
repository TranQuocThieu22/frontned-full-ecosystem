export const aqModuleIdEnum = {
    SAE: 1,
    EVA: 6,
    SRM: 8,
    EAQ: 10,
} as const;

export type AqModuleId = typeof aqModuleIdEnum[keyof typeof aqModuleIdEnum];

