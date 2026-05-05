export enum EnumSession {
    Morning = 1,
    Noon = 2,
    Afternoon = 3,
}

export const EnumSessionLabel: Record<EnumSession, string> = {
    [EnumSession.Morning]: "Buổi sáng",
    [EnumSession.Noon]: "Buổi trưa",
    [EnumSession.Afternoon]: "Buổi chiều",
};