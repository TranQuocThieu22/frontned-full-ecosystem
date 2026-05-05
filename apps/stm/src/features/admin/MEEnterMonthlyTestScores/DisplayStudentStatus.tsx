import { Badge } from "@mantine/core";
import {
    IconSchool,
    IconUserPlus
} from "@tabler/icons-react";

export const DisplayStudentStatusMap: Record<string, number> = {
    "Học sinh mới": 1,
    "Đang học": 2,
};

export function DisplayStudentStatus({ statuss }: { statuss: number }) {
    switch (statuss) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconUserPlus />} variant="light" color="cyan" radius="xs">
                    Học sinh mới
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconSchool />} variant="light" color="indigo" radius="xs">
                    Đang học
                </Badge>
            );
        default:
            return ("");
    }
}
