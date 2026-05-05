import { Badge } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

export enum AttendanceStatus {
  Present = "Đi học",
  ExcusedAbsent = "Nghỉ có phép",
}

export function AttendanceStatusBadge({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="blue" radius="xs">
                        Đi học
                    </Badge>
                </>
            );
        case 2:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="gray" radius="xs">
                        Nghỉ có phép
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
                        Đi học
                    </Badge>
                </>
            );
    }
}