import { Badge } from "@mantine/core";
import {
    IconClipboardText,
    IconHelpCircle,
    IconUserCheck,
    IconUserX,
    IconX,
} from "@tabler/icons-react";

export const TrialStatus: Record<string, number> = {
    "Đã đăng ký": 1,
    "Đã tham gia": 2,
    "Không tham gia": 3,
    "Đã hủy": 4,
};

export function DisplayTrialStatus({ trialStatus }: { trialStatus: number }) {
    switch (trialStatus) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconClipboardText />} variant="light" color="blue" radius="xs">
                    Đã đăng ký
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconUserCheck />} variant="light" color="green" radius="xs">
                    Đã tham gia
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconUserX />} variant="light" color="orange" radius="xs">
                    Không tham gia
                </Badge>
            );
        case 4:
            return (
                <Badge w="100%" leftSection={<IconX />} variant="light" color="red" radius="xs">
                    Đã hủy
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
