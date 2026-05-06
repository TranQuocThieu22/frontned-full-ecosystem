export const aqModuleIdEnum = {
    SAE: 1,
    STM: 3,
    LOM: 5,
    EVA: 6,
    SRM: 8,
    EAQ: 10,
} as const;

export type AqModuleId = typeof aqModuleIdEnum[keyof typeof aqModuleIdEnum];

