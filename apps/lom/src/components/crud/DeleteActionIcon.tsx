import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { ComponentPropsWithoutRef } from "react";

type DeleteActionIconProps = {
    actionIconProps?: ComponentPropsWithoutRef<typeof ActionIcon>;
};


export const DeleteActionIcon = ({
    actionIconProps
}: DeleteActionIconProps) => {
    return (
        <>
            <ActionIcon
                variant="light"
                radius="sm"
                color='red'
                {...actionIconProps}
            >
                <IconTrash />
            </ActionIcon>
        </>
    )
};