import { Badge } from "@mantine/core";
import {
    IconChecks,
    IconCircleDashedX,
    IconHelpCircle,
    IconHourglass,
    IconPencilCog,
} from "@tabler/icons-react";

export const ActionStatusLabel: Record<number, string> = {
  1: "Chờ xử lý",
  2: "Đã xử lý",
};


export function ActionStatusBadge({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconHourglass />} variant="light" color="orange" radius="lg">
                    {ActionStatusLabel[1]}
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconChecks/>} variant="light" color="green" radius="lg">
                    {ActionStatusLabel[2]}
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