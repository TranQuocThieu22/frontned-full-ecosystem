import { Badge } from "@mantine/core";
import {
    IconClockShare,
    IconBolt,
    IconBrowserCheck,
    IconHelpCircle,
    IconChecklist,
    IconFileAlert,
    IconPencilMinus,
} from "@tabler/icons-react";

export const QLCLApprovalStatusMap: Record<string, number> = {
    "Duyệt": 1,
    "Chưa duyệt": 2,
    "Yêu cầu hiệu chỉnh": 3,
};


export function QLCLApprovalStatusBadge({ result }: { result: number }) {
    switch (result) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconChecklist />} variant="light" color="green" radius="xs">
                    Duyệt
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconFileAlert />} variant="light" color="gray" radius="xs">
                    Chưa duyệt
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconPencilMinus />} variant="light" color="red" radius="xs">
                    Yêu cầu hiệu chỉnh
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
