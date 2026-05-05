import { Badge } from "@mantine/core";
import {
    IconBolt,
    IconHelpCircle,
    IconHourglass
} from "@tabler/icons-react";

export const ProgressStatusLabel: Record<number, string> = {
  1: "Đang thực hiện",
  2: "Gia hạn",
};


export function ProgressStatusBadge({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconBolt />} variant="light" color="green" radius="lg">
                    {ProgressStatusLabel[1]}
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconHourglass/>} variant="light" color="orange" radius="lg">
                    {ProgressStatusLabel[2]}
                </Badge>
            );
        default:
            return (
                <Badge w="100%" leftSection={<IconHelpCircle />} variant="light" color="gray" radius="lg">
                    Không có thông tin
                </Badge>
            );
    }
}