import { Badge } from "@mantine/core";
import { IconAlertOctagon, IconChecks, IconClock } from "@tabler/icons-react";

export function DisplayDiscountStatus({ classStatus }: { classStatus: number }) {
    switch (classStatus) {
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
                        leftSection={<IconChecks />}
                        variant="light" color="red" radius="xs">
                        Ngưng hoạt động
                    </Badge>
                </>
            );
        default:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconAlertOctagon />}
                        variant="light" color="gray" radius="xs">
                        Chưa có trạng thái
                    </Badge>
                </>
            );
    }
}
