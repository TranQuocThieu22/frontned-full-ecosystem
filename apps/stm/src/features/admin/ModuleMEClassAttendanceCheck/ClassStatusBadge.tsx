import { Badge } from "@mantine/core";
import {
    IconClockShare,
    IconBolt,
    IconBrowserCheck,
    IconHelpCircle,
} from "@tabler/icons-react";

export const ClassStatusMap: Record<string, number> = {
    "Sắp mở": 1,
    "Đang hoạt động": 2,
    "Đã kế thúc": 3,
};


export function ClassStatusBadge({ result }: { result: number }) {
    switch (result) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconClockShare />} variant="light" color="orange" radius="xs">
                    Sắp mở
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconBolt />} variant="light" color="blue" radius="xs">
                    Đang hoạt động
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconBrowserCheck />} variant="light" color="gray" radius="xs">
                    Đã kết thúc
                </Badge>
            );
        default:
            return (
                <Badge w="100%" leftSection={<IconClockShare />} variant="light" color="orange" radius="xs">
                    Sắp mở
                </Badge>
            );
    }
}
