import { Badge } from "@mantine/core";
import {
    IconCheck,
    IconHelpCircle,
    IconLoader,
    IconX
} from "@tabler/icons-react";

export const TrialStatus: Record<string, number> = {
    "Đang xử lý": 1,
    "Đã giải quyết": 2,
    "Đã đóng": 3,
};

export function DisplayTrialStatus({ trialStatus }: { trialStatus: number }) {
    switch (trialStatus) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconLoader  />} variant="light" color="blue" radius="xs">
                    Đang xử lý
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconCheck />} variant="light" color="green" radius="xs">
                    Đã giải quyết
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconX />} variant="light" color="red" radius="xs">
                    Đã đóng
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
