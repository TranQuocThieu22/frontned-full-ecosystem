import { Badge } from "@mantine/core";
import {
    IconChecks,
    IconCircleDashedX,
    IconHourglass,
    IconPencilCog
} from "@tabler/icons-react";

export const CheckStatusLabel: Record<number, string> = {
  1: "Chờ kiểm tra",
  2: "Yêu cầu hiệu chỉnh",
  3: "Không đồng ý",
  4: "Đồng ý",
};


export function CheckStatusBadge({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconHourglass />} variant="light" color="blue" radius="lg">
                    {CheckStatusLabel[1]}
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconPencilCog/>} variant="light" color="orange" radius="lg">
                    {CheckStatusLabel[2]}
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconCircleDashedX />} variant="light" color="red" radius="lg">
                    {CheckStatusLabel[3]}
                </Badge>
            );
        case 4:
            return (
                <Badge w="100%" leftSection={<IconChecks />} variant="light" color="green" radius="lg">
                    {CheckStatusLabel[4]}
                </Badge>
            );
        default:
            return (
                <></>
                // <Badge w="100%" leftSection={<IconHelpCircle />} variant="light" color="gray" radius="lg">
                //     Không có thông tin
                // </Badge>
            );
    }
}