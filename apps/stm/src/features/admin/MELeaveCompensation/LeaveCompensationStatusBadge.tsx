import { Badge } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

export enum EnumMakeUpStatus {
  NOT_SCHEDULED = 1,
  SCHEDULED = 2,
}

export const MakeUpStatusLabel: Record<EnumMakeUpStatus, string> = {
  [EnumMakeUpStatus.NOT_SCHEDULED]: "Chưa xếp bù",
  [EnumMakeUpStatus.SCHEDULED]: "Đã xếp bù",
};

export function LeaveCompensationStatusBadge({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="blue" radius="xs">
                        Chưa xếp bù
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
                        Đã xếp bù
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
                        Chưa xếp bù
                    </Badge>
                </>
            );
    }
}