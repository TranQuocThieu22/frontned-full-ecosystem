import { IconChecks, IconClock, TablerIcon } from "@tabler/icons-react";

/** Enum trạng thái hội đồng */
export enum EnumAcceptanceCouncilStatus {
    Pending = 1,
    Completed = 2,
}

/** Label cho enum trạng thái hội đồng */
export const EnumLabelAcceptanceCouncilStatus: Record<EnumAcceptanceCouncilStatus, string> = {
    [EnumAcceptanceCouncilStatus.Pending]: "Chờ họp",
    [EnumAcceptanceCouncilStatus.Completed]: "Hoàn thành",
};

/** Màu hiển thị cho enum trạng thái hội đồng */
export const EnumColorAcceptanceCouncilStatus: Record<EnumAcceptanceCouncilStatus, string> = {
    [EnumAcceptanceCouncilStatus.Pending]: "yellow",
    [EnumAcceptanceCouncilStatus.Completed]: "green",
};

/** Icon cho enum trạng thái hội đồng */
export const EnumIconAcceptanceCouncilStatus: Record<EnumAcceptanceCouncilStatus, TablerIcon> = {
    [EnumAcceptanceCouncilStatus.Pending]: IconClock,
    [EnumAcceptanceCouncilStatus.Completed]: IconChecks,
};

/** Options cho Select/filter */
export const getAcceptanceCouncilStatusOptions = Object.values(EnumAcceptanceCouncilStatus).filter(
    (v) => typeof v === "number"
).map((status) => ({
    value: status.toString(),
    label: EnumLabelAcceptanceCouncilStatus[status as EnumAcceptanceCouncilStatus],
}));