export const schoolCode = {
    FTU: "FTU",
    TNUT: "TNUT"
} as const;

export type SchoolCodeType = typeof schoolCode[keyof typeof schoolCode];