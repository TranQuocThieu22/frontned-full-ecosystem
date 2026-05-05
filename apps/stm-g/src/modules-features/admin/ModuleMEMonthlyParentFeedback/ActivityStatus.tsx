import { Badge } from "@mantine/core";
import {
    IconHelpCircle,
    IconChecklist,
    IconPencilMinus,
    IconBolt,
    IconX,
} from "@tabler/icons-react";

export const AcitivityStatusMap: Record<string, number> = {
    "Đang hoạt động": 1,
    "Dừng hoạt động": 2,
};


export function AcitivityStatusBadge({ result }: { result: number }) {
    switch (result) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconBolt />} variant="light" color="blue" radius="xs">
                    Đang hoạt động
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconX />} variant="light" color="red" radius="xs">
                    Dừng hoạt động
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
