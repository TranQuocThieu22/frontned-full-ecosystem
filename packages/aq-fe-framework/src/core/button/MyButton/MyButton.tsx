import { useStore_Permission } from "@/stores";
import { type_action } from "@/types/type_action";
import { Button, ButtonProps, MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import {
    IconChecklist,
    IconDeviceFloppy,
    IconDownload,
    IconEdit,
    IconEye,
    IconLivePhoto,
    IconMail,
    IconPlus,
    IconPrinter,
    IconRefresh,
    IconSearch,
    IconSelect,
    IconTrash,
    IconUpload,
    IconX
} from "@tabler/icons-react";
import { ReactNode } from "react";

export interface MyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ButtonProps {
    actionType?: type_action;
    children?: ReactNode;
    /** Không cần bật kiểm tra quyền mặc định = true */
    isCheckPermission?: boolean
}

const getActionConfig = (colorScheme: MantineColorScheme): Record<type_action, MyButtonProps> => ({
    default: {
        children: ""
    },
    create: {
        color: "blue",
        type: "submit",
        leftSection: <IconPlus />,
        children: "Thêm",
    },
    createMultiple: {},
    delete: {
        color: "red",
        leftSection: <IconTrash />,
        children: "Xóa",
    },
    update: {
        color: "yellow",
        type: "submit",
        leftSection: <IconEdit />,
        children: "Chỉnh sửa",
    },
    save: {
        color: "blue",
        type: "submit",
        leftSection: <IconDeviceFloppy />,
        children: "Lưu",
    },
    import: {
        color: colorScheme == "light" ? "green" : "green.3",
        leftSection: <IconUpload />,
        children: "Import",
        variant: "light"
    },
    export: {
        color: colorScheme == "light" ? "violet" : "violet.3",
        leftSection: <IconDownload />,
        children: "Export",
        variant: "light"
    },
    print: {
        color: "orange.7",
        leftSection: <IconPrinter />,
        children: "In",
    },
    cancel: {
        color: "gray",
        leftSection: <IconX />,
        children: "Hủy thao tác",
    },
    select: {
        children: "Chọn",
        leftSection: <IconSelect />,
        color: "violet"
    },
    find: {
        color: "green",
        leftSection: <IconSearch />,
        children: "Tìm"
    },
    tempDelete: {},
    tempUpdate: {},
    viewFile: {
        color: "cyan",
        leftSection: <IconLivePhoto />,
        children: "Xem file"
    },
    sendMail: {
        color: "grape",
        leftSection: <IconMail />,
        children: "Gửi mail"
    },
    view: {
        children: "Xem chi tiết",
        leftSection: <IconEye />
    },
    validate: {
        color: "orange",
        variant: "outline",
        children: "Kiểm tra",
        leftSection: <IconChecklist />
    },
    sync: {
        color: "green",
        variant: "outline",
        children: "Đồng bộ",
        leftSection: <IconRefresh />
    }
})

export function MyButton({ children, actionType, isCheckPermission = true, ...rest }: MyButtonProps) {
    const permissionStore = useStore_Permission()
    const { colorScheme } = useMantineColorScheme();

    if (!actionType) {
        return <Button {...rest}>{children}</Button>;
    }
    const config = actionType ? getActionConfig(colorScheme)[actionType] : {};
    const shouldHide = (() => {
        if (!isCheckPermission
            || !actionType
            || !permissionStore.state.currentPermissionPage
            || permissionStore.state.isSuperAdmin)
            return false;
        return (
            (actionType === "create" && permissionStore.state.currentPermissionPage.isCreate === false) ||
            (actionType === "update" && permissionStore.state.currentPermissionPage.isUpdate === false) ||
            (actionType === "delete" && permissionStore.state.currentPermissionPage.isDelete === false) ||
            (actionType === "print" && permissionStore.state.currentPermissionPage.isPrint === false) ||
            (actionType === "export" && permissionStore.state.currentPermissionPage.isExport === false) ||
            (actionType == "import" && permissionStore.state.currentPermissionPage.isCreate == false) ||
            (actionType == "save" && permissionStore.state.currentPermissionPage.isUpdate == false)
        );
    })();
    if (!permissionStore.state.currentPermissionPage) return
    return (
        <Button hidden={shouldHide} {...config} {...rest} >
            {children ? children : config.children}
        </Button>
    );
}
