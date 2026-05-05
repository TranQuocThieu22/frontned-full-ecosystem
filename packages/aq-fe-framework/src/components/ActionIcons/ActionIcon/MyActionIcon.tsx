import { type_action } from "@/types/type_action";
import { ActionIcon, ActionIconProps } from "@mantine/core";
import { IconDeviceFloppy, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { ReactNode } from "react";
/**
 * @deprecated Component này không xài nữa
 * Vui lòng dùng `MyActionIcon` từ `core` thay thế.
 */
interface IMyActionIcon extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ActionIconProps {
    crudType?: type_action
    children?: ReactNode;
}

export function MyActionIcon({ children, crudType = "default", ...rest }: IMyActionIcon) {
    if (crudType == "default") {
        return (
            <ActionIcon color="indigo" {...rest}>
                {children}
            </ActionIcon>
        );
    }
    if (crudType == "create") {
        return (
            <ActionIcon color="indigo"  {...rest}>
                <IconPlus />
            </ActionIcon>
        );
    }
    if (crudType == "delete") {
        return (
            <ActionIcon color="red"  {...rest}>
                <IconTrash />
            </ActionIcon>
        );
    }
    if (crudType == "update") {
        return (
            <ActionIcon color="yellow"{...rest}>
                <IconEdit />
            </ActionIcon>
        );
    }
    if (crudType == "save") {
        return (
            <ActionIcon color="green"  {...rest}>
                <IconDeviceFloppy />
            </ActionIcon>
        );
    }
}
