import { Badge } from "@mantine/core";
import {
    IconCheck,
    IconClipboardCheck,
    IconClock,
    IconHelpCircle,
} from "@tabler/icons-react";

export const InteractionResultMap: Record<string, number> = {
    "Cần theo dõi thêm": 1,
    "Thành công": 2,
    "Đã giải quyết": 3,
};


export function DisplayInteractionResult({ result }: { result: number }) {
    switch (result) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconClock />} variant="light" color="orange" radius="xs">
                    Cần theo dõi thêm
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconCheck />} variant="light" color="green" radius="xs">
                    Thành công
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconClipboardCheck />} variant="light" color="blue" radius="xs">
                    Đã giải quyết
                </Badge>
            );
        default:
            return (
                <Badge w="100%" leftSection={<IconHelpCircle />} variant="light" color="gray" radius="xs">
                    Không rõ kết quả
                </Badge>
            );
    }
}
