import { Badge } from "@mantine/core";
import {
    IconCircleCheck,
    IconClock,
    IconRefreshAlert
} from "@tabler/icons-react";

export function DisplayQualityReviewStatus({ value }: { value: number }) {
    switch (value) {
        case 1:
            return (
                <Badge w="100%" leftSection={<IconCircleCheck />} variant="light" color="green" radius="xs">
                    Duyệt
                </Badge>
            );
        case 2:
            return (
                <Badge w="100%" leftSection={<IconRefreshAlert />} variant="light" color="red.5" radius="xs">
                    Yêu cầu hiệu chỉnh
                </Badge>
            );
        case 3:
            return (
                <Badge w="100%" leftSection={<IconClock />} variant="light" color="gray" radius="xs">
                    Chưa duyệt
                </Badge>
            );
        default:
            return ("");
    }
}
