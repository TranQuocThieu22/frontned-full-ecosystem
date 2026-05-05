import { Badge } from "@mantine/core";
import {
    IconChecks,
    IconCircleDashedX,
    IconHourglass,
    IconPencilCog
} from "@tabler/icons-react";

export const PreliminaryStatusLabel: Record<number, string> = {
  1: "Chờ kiểm tra sơ bộ",
  2: "Yêu cầu điều chỉnh sơ bộ",
  3: "Không đạt yêu cầu sơ bộ",
  4: "Đạt kiểm tra sơ bộ",
};


export function PreliminaryStatusBadge({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconHourglass />} variant="light" color="blue" radius="lg">
                    {PreliminaryStatusLabel[1]}
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconPencilCog/>} variant="light" color="orange" radius="lg">
                    {PreliminaryStatusLabel[2]}
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconCircleDashedX />} variant="light" color="red" radius="lg">
                    {PreliminaryStatusLabel[3]}
                </Badge>
            );
        case 4:
            return (
                <Badge w="100%" leftSection={<IconChecks />} variant="light" color="green" radius="lg">
                    {PreliminaryStatusLabel[4]}
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