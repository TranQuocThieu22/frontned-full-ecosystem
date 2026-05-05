import { Badge } from "@mantine/core";
import {
    IconCircleX,
    IconHelpCircle,
    IconSchool,
    IconX
} from "@tabler/icons-react";

export function DisplayClassStatus({ value }: { value: number }) {
    switch (value) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconCircleX />} variant="light" color="gray" radius="xs">
                    Chưa hoạt động
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconSchool />} variant="light" color="indigo" radius="xs">
                    Đang hoạt động
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconX />} variant="light" color="red" radius="xs">
                    Ngừng hoạt động
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
