import { Badge } from "@mantine/core";
import {
    IconCircleCheck,
    IconClock,
    IconHelpCircle,
    IconRefreshAlert
} from "@tabler/icons-react";

export const ApproveStatus: Record<string, number> = {
    "Duyệt": 1,
    "Yêu cầu hiệu chỉnh": 2,
    "Chưa duyệt": 3,
};

export function DisplayApproveStatus({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconCircleCheck />} variant="light" color="green" radius="xs">
                    Duyệt
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconRefreshAlert />} variant="light" color="red.5" radius="xs">
                    Yêu cầu hiệu chỉnh
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconClock />} variant="light" color="gray" radius="xs">
                    Chưa duyệt
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
