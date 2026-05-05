import {Badge} from "@mantine/core";
import {IconChecks, IconClock, IconX} from "@tabler/icons-react";

export enum PhaseStatusEnum {
  InProgress = 1, // Đang thực hiện
  Completed = 2, // Đã hoàn thành
  NotStarted = 3, // Chưa bắt đầu
  Cancelled = 4, // Đã hủy
}

export function PhaseStatusBadge({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="blue" radius="xs">
                        Đang thực hiện
                    </Badge>
                </>
            );
        case 2:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconChecks />}
                        variant="light" color="green" radius="xs">
                        Đã hoàn thành
                    </Badge>
                </>
            );
        case 3:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="gray" radius="xs">
                        Chưa bắt đầu
                    </Badge>
                </>
            );
        case 4:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconX />}
                        variant="light" color="red" radius="xs">
                        Đã hủy
                    </Badge>
                </>
            );

        default:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="blue" radius="xs">
                        Chưa bắt đầu
                    </Badge>
                </>
            );
    }
}