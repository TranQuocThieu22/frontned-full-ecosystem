import { Badge } from "@mantine/core";
import {
    IconHelpCircle,
    IconSchool,
    IconX
} from "@tabler/icons-react";

export function DisplayStudentStatus({ value }: { value: number }) {
    switch (value) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconSchool />} variant="light" color="indigo" radius="xs">
                    Đang học
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconX />} variant="light" color="red" radius="xs">
                    Nghỉ học
                </Badge>
            );
        default:
            return (
                <Badge w="100%" leftSection={<IconHelpCircle />} variant="light" color="gray" radius="xs">
                    Không rõ trạng thái
                </Badge>
            );
    }
}
