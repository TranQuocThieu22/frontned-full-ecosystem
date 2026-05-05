export enum EnumAdisorytStatusType {
    complete = 1,
    waiting = 2,
}

export const EnumAdisorytStatusTypeLabel: Record<EnumAdisorytStatusType, string> = {
    [EnumAdisorytStatusType.complete]: "Hoàn thành",
    [EnumAdisorytStatusType.waiting]: "Chờ họp",
};

