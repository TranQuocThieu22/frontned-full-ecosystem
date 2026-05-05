import { Badge } from "@mantine/core";
import { IconClock, IconChecks } from "@tabler/icons-react";

export enum StudentStatus {
  Studying = 1,
  NewStudent = 2,
}

export function StudentStatusBadge({ status }: { status?: number }) {
    switch (status) {
        case 1:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="blue" radius="xs">
                        Đang học
                    </Badge>
                </>
            );
        case 2:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="green" radius="xs">
                        Học sinh mới
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
                        Đang học
                    </Badge>
                </>
            );
    }
}