import { Badge } from "@mantine/core";
import {
    IconClipboardCheck,
    IconHelpCircle,
    IconLoader,
    IconLock,
} from "@tabler/icons-react";

export const DisplayFeedbackStatusMap: Record<string, number> = {
    "Đang xử lý": 1,
    "Đã giải quyết": 2,
    "Đã đóng": 3,
};

export function DisplayFeedbackStatus({ feedbackStatus }: { feedbackStatus: number }) {
    switch (feedbackStatus) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconLoader />} variant="light" color="blue" radius="xs">
                    Đang xử lý
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconClipboardCheck />} variant="light" color="green" radius="xs">
                    Đã giải quyết
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconLock />} variant="light" color="gray" radius="xs">
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
