import { Badge } from "@mantine/core";
import {
    IconAlertCircle,
    IconBook,
    IconCalendarEvent,
    IconPhoneCall,
    IconUserCheck,
    IconUserX
} from "@tabler/icons-react";

export const PotentialCustomerStatusMap: Record<string, number> = {
    "Mới": 1,
    "Đã liên hệ": 2,
    "Đã hẹn test": 3,
    "Đang học thử": 4,
    "Đã ghi danh": 5,
    "Không tiềm năng": 6,
};

export function DisplayPotentialCustomerStatus({ customerStatus }: { customerStatus: number }) {
    switch (customerStatus) {
        case 1:
            return (
                <Badge
                    w="100%"
                    leftSection={<IconAlertCircle />}
                    variant="light"
                    color="blue.5"
                    radius="xs"
                >
                    Mới
                </Badge>
            );
        case 2:
            return (
                <Badge
                    w="100%"
                    leftSection={<IconPhoneCall />}
                    variant="light"
                    color="blue"
                    radius="xs"
                >
                    Đã liên hệ
                </Badge>
            );
        case 3:
            return (
                <Badge
                    w="100%"
                    leftSection={<IconCalendarEvent />}
                    variant="light"
                    color="#8B5CF6"
                    radius="xs"
                >
                    Đã hẹn test
                </Badge>
            );
        case 4:
            return (
                <Badge
                    w="100%"
                    leftSection={<IconBook />}
                    variant="light"
                    color="indigo"
                    radius="xs"
                >
                    Đang học thử
                </Badge>
            );
        case 5:
            return (
                <Badge
                    w="100%"
                    leftSection={<IconUserCheck />}
                    variant="light"
                    color="green"
                    radius="xs"
                >
                    Đã ghi danh
                </Badge>
            );
        case 6:
            return (
                <Badge
                    w="100%"
                    leftSection={<IconUserX />}
                    variant="light"
                    color="red"
                    radius="xs"
                >
                    Không tiềm năng
                </Badge>
            );
        default:
            return ("");
    }
}
