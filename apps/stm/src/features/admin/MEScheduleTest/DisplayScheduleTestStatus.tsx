import { Badge } from "@mantine/core";
import {
    IconCalendarEvent,
    IconCheckbox,
    IconRefresh,
    IconX
} from "@tabler/icons-react";

export const ScheduleTestStatusMap: Record<string, number> = {
    "Đã hẹn": 7,
    "Đã hẹn lại": 8,
    "Đã hủy": 9,
    "Đã test": 10,
};

export function DisplayScheduleTestStatus({ statusScheduleTest }: { statusScheduleTest: number }) {
    switch (statusScheduleTest) {
        case 7:
            return (
                <Badge w="100%" leftSection={<IconCalendarEvent />} variant="light" color="#82CD47" radius="xs">
                    Đã hẹn
                </Badge>
            );
        case 8:
            return (
                <Badge w="100%" leftSection={<IconRefresh />} variant="light" color="blue.8" radius="xs">
                    Đã hẹn lại
                </Badge>
            );
        case 9:
            return (
                <Badge w="100%" leftSection={<IconX />} variant="light" color="gray" radius="xs">
                    Đã hủy
                </Badge>
            );
        case 10:
            return (
                <Badge w="100%" leftSection={<IconCheckbox />} variant="light" color="#06923E" radius="xs">
                    Đã test
                </Badge>
            );
        default:
            return ("");
    }
}
