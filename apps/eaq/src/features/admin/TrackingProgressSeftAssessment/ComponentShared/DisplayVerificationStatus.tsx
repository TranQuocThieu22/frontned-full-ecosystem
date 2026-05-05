import { TaskDetailVerificationStatusEnum, TaskDetailVerificationStatusEnumColor, TaskDetailVerificationStatusEnumIcon, TaskDetailVerificationStatusEnumLabel } from "@/shared/constants/enum/TaskDetailVerificationStatusEnum";
import { Badge } from "@mantine/core";
import { IconCircleDashed } from "@tabler/icons-react";

export function DisplayVerificationStatus({ verificationStatus }: { verificationStatus?: number }) {
    const verificationData = (verificationStatus ?? TaskDetailVerificationStatusEnum.NotReviewed) as TaskDetailVerificationStatusEnum;

    const Icon = TaskDetailVerificationStatusEnumIcon[verificationData];
    const color = TaskDetailVerificationStatusEnumColor[verificationData];
    const label = TaskDetailVerificationStatusEnumLabel[verificationData];

    // Add defensive check to prevent rendering undefined component
    if (!Icon) {
        console.error(`No icon found for verification status: ${verificationData}`);
        return (
            <Badge w="100%" variant="light" color={color ?? "gray"} radius="xs" leftSection={<IconCircleDashed />}>
                {label ?? "Chưa kiểm tra"}
            </Badge>
        );
    }

    return (
        <Badge w="100%" leftSection={<Icon />} variant="light" color={color} radius="xs">
            {label}
        </Badge>
    );
}
