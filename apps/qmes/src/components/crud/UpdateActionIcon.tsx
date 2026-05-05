import { ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import type { ComponentPropsWithoutRef } from "react";

type UpdateActionIconProps = {
    actionIconProps?: ComponentPropsWithoutRef<typeof ActionIcon>;
};

export const UpdateActionIcon = ({
    actionIconProps
}: UpdateActionIconProps) => {
    return (
        <>
            <ActionIcon
                variant="light"
                radius="sm"
                color='yellow'
                {...actionIconProps}
            >
                <IconEdit />
            </ActionIcon>
        </>
    )
};