import { actionType } from "@aq-fe/core-ui/shared/types/actionType";
import { mantineSizeType } from "@aq-fe/core-ui/shared/types/types";
import { ActionIcon, ActionIconProps, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { ReactNode } from "react";
import { CustomFlexColumn } from "@aq-fe/aq-legacy-framework/shared/components/layout/CustomFlexColumn";

interface IMyActionIconModal extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style" | "title">, ActionIconProps {
    title?: ReactNode;
    children?: ReactNode;
    crudType?: actionType;
    modalSize?: mantineSizeType;
    disclosure: ReturnType<typeof useDisclosure>;
    fullScreen?: boolean;
    icon?: ReactNode;
}
/**
 * @deprecated Component này không xài nữa
 * Vui lòng dùng `MyButtonModal` từ `core` thay thế.
 */
export function MyActionIconModal({
    fullScreen = false,
    crudType,
    disclosure,
    modalSize,
    title,
    children,
    icon,
    ...rest
}: IMyActionIconModal) {
    if (!crudType) {
        return (
            <>
                <ActionIcon onClick={disclosure?.[1].open} color="indigo" {...rest}>
                    {icon}
                </ActionIcon>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <CustomFlexColumn>{children}</CustomFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "create") {
        return (
            <>
                <ActionIcon onClick={disclosure?.[1].open}  {...rest}>
                    {icon ? icon : <IconPlus />}
                </ActionIcon>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : "Tạo dữ liệu mới"}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <CustomFlexColumn>{children}</CustomFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "update") {
        return (
            <>
                <ActionIcon onClick={disclosure?.[1].open} color="yellow"  {...rest}>
                    {icon ? icon : <IconEdit />}
                </ActionIcon>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : "Sửa dữ liệu"}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <CustomFlexColumn>{children}</CustomFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "delete") {
        return (
            <>
                <ActionIcon onClick={disclosure?.[1].open} color="red"  {...rest}>
                    {icon ? icon : <IconTrash />}
                </ActionIcon>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : "Xóa dữ liệu"}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <CustomFlexColumn>{children}</CustomFlexColumn>
                </Modal>
            </>
        );
    }

}
