import { Badge } from "@mantine/core";
import { IconClock, IconChecks } from "@tabler/icons-react";

export enum ClassStatus {
    Active = 2,
    Inactive = 1,
}

export function ClassStatusBadge({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="gray" radius="xs">
                        Ngừng hoạt động
                    </Badge>
                </>
            );
        case 2:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="blue" radius="xs">
                        Đang hoạt động
                    </Badge>
                </>
            );

        default:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="gray" radius="xs">
                        Ngừng hoạt động
                    </Badge>
                </>
            );
    }
}