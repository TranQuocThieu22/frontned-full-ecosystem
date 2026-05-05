import { Badge } from "@mantine/core";
import {
    IconHelpCircle,
    IconSchool
} from "@tabler/icons-react";

export const AttendanceStatusMap: Record<string, number> = {
    "Đi học": 1,
    "Nghỉ có phép": 2,
};

export function AttendanceStatus({ classStatus }: { classStatus: number }) {
    switch (classStatus) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconSchool />} variant="light" color="indigo" radius="xs">
                    Đi học
                </Badge>
            );
        default:
            return (
                <Badge w="100%" leftSection={<IconHelpCircle />} variant="light" color="gray" radius="xs">
                    Nghỉ có phép
                </Badge>
            );
    }
}
