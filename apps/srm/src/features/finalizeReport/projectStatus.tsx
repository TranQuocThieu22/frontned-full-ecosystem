import { Badge } from "@mantine/core";
import { IconAlertSquareRounded, IconBan, IconCheck, IconClock } from "@tabler/icons-react";


export function ProjectStatus({ status }: { status: number }) {
    switch (status) {
        case 1:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconCheck />}
                        variant="light" color="green" radius="xs">
                        Đồng ý
                    </Badge>
                </>
            );
        case 2:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconAlertSquareRounded />}
                        variant="light" color="yellow" radius="xs">
                        Yêu cầu hiệu chỉnh
                    </Badge>
                </>
            );
        case 3:
            return (
                <>
                    <Badge
                        w={"100%"}
                        leftSection={<IconBan />}
                        variant="light" color="red" radius="xs">
                        Không đồng ý
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
