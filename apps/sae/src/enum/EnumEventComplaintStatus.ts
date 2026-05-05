import { IconCheck, IconClock, IconHourglass, IconPlug, IconPlus, IconX, TablerIcon } from "@tabler/icons-react";

export enum eventComplaintEnum {
    newComplaint = 1,
    working = 2,
    done = 3,
}


export const eventComplaintEnumLabel: Record<eventComplaintEnum, string> = {
    [eventComplaintEnum.newComplaint]: "Khiếu nại mới",
    [eventComplaintEnum.working]: "Đang xử lý",
    [eventComplaintEnum.done]: "Đã xử lý",
};

export const eventComplaintEnumColor: Record<eventComplaintEnum, string> = {
    [eventComplaintEnum.newComplaint]: "blue",
    [eventComplaintEnum.working]: "yellow",
    [eventComplaintEnum.done]: "green",
};

export const eventComplaintEnumIcon: Record<eventComplaintEnum, TablerIcon> = {
    [eventComplaintEnum.newComplaint]: IconPlus,
    [eventComplaintEnum.working]: IconClock,
    [eventComplaintEnum.done]: IconCheck,
};
