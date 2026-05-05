import { IconCircleCheck, IconClock, IconClockExclamation, TablerIcon } from "@tabler/icons-react";

export enum EnumSubmittedType {
    OnTime = 0,
    Overdue = 1,
    Submitted = 2,
}

export const EnumLabelEnumSubmittedType: Record<EnumSubmittedType, string> = {
    [EnumSubmittedType.OnTime]: "Còn hạn",
    [EnumSubmittedType.Overdue]: "Trễ hạn",
    [EnumSubmittedType.Submitted]: "Đã nộp báo cáo",
};


export const EnumColorEnumSubmittedType: Record<EnumSubmittedType, string> = {
    [EnumSubmittedType.OnTime]: "green",
    [EnumSubmittedType.Overdue]: "red",
    [EnumSubmittedType.Submitted]: "blue",
};

export const EnumIconEnumSubmittedType: Record<EnumSubmittedType, TablerIcon> = {
    [EnumSubmittedType.OnTime]: IconClock,
    [EnumSubmittedType.Overdue]: IconClockExclamation,
    [EnumSubmittedType.Submitted]: IconCircleCheck,
};