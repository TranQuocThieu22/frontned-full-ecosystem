import { Badge } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

export enum EnumClassStatus {
    ACTIVE = 1,
    INACTIVE = 2,
}

export const ClassStatusLabel: Record<EnumClassStatus, string> = {
    [EnumClassStatus.ACTIVE]: "Đang hoạt động",
    [EnumClassStatus.INACTIVE]: "Ngừng hoạt động",
};

export const classStatusOptions = Object.entries(ClassStatusLabel).map(([key, label]) => ({
    value: Number(key),
    label,
}));

export function ClassStatusBadge({ status }: { status: number }) {
    switch (status) {
        case 1:
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
        case 2:
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

        default:
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
    }
}