import {Badge} from "@mantine/core";
import {IconChecks, IconClock} from "@tabler/icons-react";

export enum EnumCriteriaAssignmentStatus {
    NotStarted = 1,
    InProgress = 2,
    DraftDone = 3,
}

export const CriteriaAssignmentStatusLabels: Record<EnumCriteriaAssignmentStatus, string> = {
    [EnumCriteriaAssignmentStatus.NotStarted]: "Chưa bắt đầu",
    [EnumCriteriaAssignmentStatus.InProgress]: "Đang thực hiện",
    [EnumCriteriaAssignmentStatus.DraftDone]: "Đã soạn xong, chờ kiểm tra",
};


export function CriteriaAssignmentStatusBadge({ status }: { status: number }) {
    switch (status) {
        case 1:
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
        case 2:
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
        case 3:
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

        default:
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
    }
}
