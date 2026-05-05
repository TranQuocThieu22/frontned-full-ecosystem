import { Badge } from "@mantine/core";
import { IconChecks, IconClock } from "@tabler/icons-react";

export enum EnumCouncilStatus {
    Waiting = 1,
    Finish = 2
}

export const CouncilStatusLabel: Record<EnumCouncilStatus, string> = {
  [EnumCouncilStatus.Waiting]: "Chờ họp",
  [EnumCouncilStatus.Finish]: "Hoàn thành",
};

export const getCouncilStatusOptions = [
  {
    value: EnumCouncilStatus.Waiting.toString(),
    label: "Chờ họp",
  },
  {
    value: EnumCouncilStatus.Finish.toString(),
    label: "Hoàn thành",
  },
];

export function CouncilStatusBadge({ status }: { status?: number }) {
    switch (status) {
        case 1:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="yellow" radius="xs">
                        Chờ họp
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
                        Hoàn thành
                    </Badge>
                </>
            );
            
        default:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="yellow" radius="xs">
                        Chờ họp
                    </Badge>
                </>
            );
    }
}
