import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { actionType } from "@aq-fe/core-ui/shared/types/actionType";
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

export interface CustomButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ButtonProps {
    actionType?: actionType;
    children?: ReactNode;
    /** Không cần bật kiểm tra quyền mặc định = true */
    isCheckPermission?: boolean
}

const getActionConfig = (colorScheme: MantineColorScheme): Record<actionType, CustomButtonProps> => ({
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
    },
    modalPicker: {},
    modalConfirm: {
        children: "Xác nhận",
        color: "red"
    }
})

export function CustomButton({ children, actionType, isCheckPermission = true, ...rest }: CustomButtonProps) {
    const permissionStore = usePermissionStore()
    const { colorScheme } = useMantineColorScheme();

    if (!actionType) {
        return <Button {...rest}>{children}</Button>;
    }
    const config = actionType ? getActionConfig(colorScheme)[actionType] : {};
    const shouldHide = (() => {
        const page = permissionStore.state.currentPermissionPage;

        // Không check quyền trong các trường hợp sau
        if (!isCheckPermission || !actionType || !page || permissionStore.state.isSuperAdmin) {
            return false;
        }

        // Mapping các quyền cần thiết cho từng action
        const requiredPermissions: Record<actionType, boolean | undefined> = {
            create: page.isCreate,
            update: page.isUpdate,
            delete: page.isDelete,
            print: page.isPrint,
            export: page.isExport,
            import: page.isCreate,   // Import dùng quyền create
            save: page.isUpdate,     // Save dùng quyền update
            sync: page.isCreate && page.isUpdate,
            default: true,
            createMultiple: true,
            tempDelete: true,
            tempUpdate: true,
            viewFile: true,
            sendMail: true,
            view: true,
            select: true,
            find: true,
            validate: true,
            cancel: true,
            modalPicker: true,
            modalConfirm: true
        };

        const permission = requiredPermissions[actionType];

        // Nếu permission là false thì hide
        return permission === false;
    })();
    return (
        <Button hidden={shouldHide} {...config} {...rest} >
            {children ? children : config.children}
        </Button>
    );
}
