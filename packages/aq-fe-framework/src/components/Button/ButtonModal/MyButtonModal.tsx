import { MyFlexColumn } from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { type_action } from "@/types/type_action";
import { type_mantineSize } from "@/types/types";

import { Button, ButtonProps, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { ReactNode } from "react";

interface IMyButtonModal extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style" | "title">, ButtonProps {
    label?: string;
    title?: ReactNode;
    children?: ReactNode;
    crudType?: type_action;
    modalSize?: type_mantineSize;
    objectName?: string
    disclosure: ReturnType<typeof useDisclosure>;
    fullScreen?: boolean;
}

/**
 * @deprecated Component này không xài nữa nha mấy ní
 * Vui lòng dùng `MyButtonModal` từ `core` thay thế.
 */
export function MyButtonModal({
    fullScreen = false,
    crudType = "default",
    disclosure,
    modalSize,
    title,
    label,
    children,
    objectName = "",
    ...rest
}: IMyButtonModal) {
    const objectNameLower = objectName?.toLowerCase()
    if (crudType == "default") {
        return (
            <>
                <Button onClick={disclosure?.[1].open} color="indigo" {...rest}>
                    {label}
                </Button>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "create") {
        return (
            <>
                <Button onClick={disclosure?.[1].open} leftSection={<IconPlus />} {...rest}>
                    {label ? label : `Thêm`}
                </Button>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : `Tạo ${objectNameLower} mới`}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "createMultiple") {
        return (
            <>
                <Button onClick={disclosure?.[1].open} color="green" leftSection={<IconPlus />} {...rest}>
                    {label ? label : `Import ${objectNameLower}`}
                </Button>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : `Thêm danh sách ${objectNameLower}`}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "update") {
        return (
            <>
                <Button onClick={disclosure?.[1].open} color="yellow" leftSection={<IconEdit />} {...rest}>
                    {label ? label : `Chỉnh sửa ${objectNameLower}`}
                </Button>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : `Chỉnh sửa ${objectNameLower}`}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
    if (crudType == "delete") {
        return (
            <>
                <Button onClick={disclosure?.[1].open} color="red" leftSection={<IconTrash />} {...rest}>
                    {label ? label : `Xóa ${objectNameLower}`}
                </Button>
                <Modal
                    fullScreen={fullScreen}
                    size={modalSize}
                    title={title ? title : `Xóa ${objectNameLower}`}
                    opened={disclosure?.[0]}
                    onClose={disclosure[1].close}>
                    <MyFlexColumn>{children}</MyFlexColumn>
                </Modal>
            </>
        );
    }
}
