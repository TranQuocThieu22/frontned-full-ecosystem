import { Badge } from "@mantine/core";
import { IconChecks, IconCircleDashedPlus, IconClock } from "@tabler/icons-react";


export function ApprovalStatus({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconCircleDashedPlus />}
                        variant="light" color="blue" radius="xs">
                        Mới
                    </Badge>
                </>
            );
        case 2:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconClock />}
                        variant="light" color="yellow" radius="xs">
                        Kế tiếp hướng nghiên cứu của chính nhóm tác giả
                    </Badge>
                </>
            );
        case 3:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconChecks />}
                        variant="light" color="red" radius="xs">
                        Kế tiếp nghiên cứu của người khác
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
                        Không rõ trạng thái
                    </Badge>
                </>
            );
    }
}
