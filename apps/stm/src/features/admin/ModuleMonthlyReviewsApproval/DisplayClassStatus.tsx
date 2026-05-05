import { Badge } from "@mantine/core";
import {
    IconHelpCircle,
    IconSchool
} from "@tabler/icons-react";

export const Status: Record<string, number> = {
    "Đang hoạt động": 1,
};

export function DisplayClassStatus({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconSchool />} variant="light" color="indigo" radius="xs">
                    Đang hoạt động
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
