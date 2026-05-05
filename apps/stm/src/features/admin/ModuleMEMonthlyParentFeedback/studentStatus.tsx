import { Badge } from "@mantine/core";
import {
    IconHelpCircle,
    IconChecklist,
    IconPencilMinus,
    IconBolt,
    IconX,
    IconUserQuestion,
    IconUserBolt,
} from "@tabler/icons-react";

export const StudentStatusMap: Record<string, number> = {
    "Đang học": 1,
    "Nghỉ học": 2,
};


export function StudentStatusBadge({ result }: { result: number }) {
    switch (result) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconUserBolt />} variant="light" color="blue" radius="xs">
                    Đang học
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconUserQuestion />} variant="light" color="red" radius="xs">
                    Nghỉ học
                </Badge>
            );
        default:
            return (
                <Badge w="100%" leftSection={<IconHelpCircle />} variant="light" color="gray" radius="xs">
                    Không có thông tin
                </Badge>
            );
    }
}
