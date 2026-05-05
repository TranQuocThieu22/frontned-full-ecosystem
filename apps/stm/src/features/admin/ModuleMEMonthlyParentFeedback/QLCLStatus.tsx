import { Badge } from "@mantine/core";
import {
    IconHelpCircle,
    IconChecklist,
    IconPencilMinus,
} from "@tabler/icons-react";

export const QLCLStatusMap: Record<string, number> = {
    "Duyệt": 1,
    "Yêu cầu hiệu chỉnh": 2,
};


export function QLCLStatusBadge({ result }: { result: number }) {
    switch (result) {
        case 2:
            return (
                <Badge w="100%" leftSection={<IconPencilMinus />} variant="light" color="red" radius="xs">
                    Yêu cầu hiệu chỉnh
                </Badge>
            );
        case 1:
            return (
                <Badge w="100%" leftSection={<IconChecklist />} variant="light" color="green" radius="xs">
                    Duyệt
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
