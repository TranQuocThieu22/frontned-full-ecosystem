import { usePermissionStore } from "@aq-fe/aq-legacy-framework/shared/stores/usePermissionStore";
import { actionType } from "@aq-fe/core-ui/shared/types/actionType";
import { ActionIcon, ActionIconProps, MantineColorScheme, Tooltip, TooltipProps, useMantineColorScheme } from "@mantine/core";
import {
    IconBook,
    IconChecklist,
    IconDeviceFloppy,
    IconDotsVertical,
    IconEdit,
    IconEye,
    IconFileExport,
    IconFileImport,
    IconMail,
    IconPencil,
    IconPlus,
    IconPrinter,
    IconRefresh,
    IconSelect,
    IconTrash,
    IconX,
} from "@tabler/icons-react";

export interface CustomActionIconProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ActionIconProps {
    actionType?: actionType;
    isCheckPermission?: boolean
    toolTipProps?: TooltipProps
}

const getActionConfig = (colorScheme: MantineColorScheme): Record<actionType, CustomActionIconProps & { toolTipProps?: TooltipProps }> => ({
    default: {

    },
    create: {
        color: "indigo",
        type: "submit",
        children: <IconPlus />,
        toolTipProps: {
            label: "Thêm"
        }
    },
    createMultiple: {
        color: "green",
        type: "submit",
        children: <IconPlus />,
    },
    delete: {
        color: "red",
        children: <IconTrash />,
        toolTipProps: {
            label: "Xóa",
        }
    },
    update: {
        color: "yellow",
        type: "submit",
        children: <IconEdit />,
        toolTipProps: {
            label: "Cập nhật"
        }
    },
    save: {
        color: "blue",
        type: "submit",
        children: <IconDeviceFloppy />,
        toolTipProps: {
            label: "Lưu"
        }
    },
    import: {
        color: "green.8",
        children: <IconFileImport />,
    },
    print: {
        color: "orange.7",
        children: <IconPrinter />,
    },
    export: {
        color: "green.8",
        children: <IconFileExport />,
    },
    cancel: {
        color: "gray",
        children: <IconX />,
        toolTipProps: {
            label: "Hủy"
        }
    },
    select: {
        children: <IconSelect />,
        color: "violet",
        toolTipProps: {
            label: "Chọn"
        }
    },
    find: {},
    tempDelete: {
        color: "red",
        children: <IconX />,
        toolTipProps: {
            label: "Xóa"
        }
    },
    tempUpdate: {
        color: "yellow",
        children: <IconPencil />,
        toolTipProps: {
            label: "Cập nhật"
        }
    },
    viewFile: {
        color: "green",
        children: <IconBook />,
        toolTipProps: {
            label: "Xem file"
        }
    },
    view: {
        color: "cyan",
        children: <IconEye />,
        toolTipProps: {
            label: "Xem chi tiết"
        }
    },
    sendMail: {
        color: "grape",
        children: <IconMail />,
        toolTipProps: {
            label: "Gửi mail"
        }
    },
    validate: {
        color: "orange",
        children: <IconChecklist />,
        toolTipProps: {
            label: "Kiểm tra"
        }
    },
    sync: {
        color: "green",
        children: <IconRefresh />,
        toolTipProps: {
            label: "Đồng bộ"
        }
    },
    modalPicker: {
        color: "blue",
        children: <IconDotsVertical />,
        toolTipProps: {
            label: "Chọn từ danh sách"
        }
    },
    modalConfirm: {}
})


export function CustomActionIcon({
    children,
    actionType,
    isCheckPermission = true,
    toolTipProps,
    ...rest
}: CustomActionIconProps) {
    const permissionStore = usePermissionStore();
    const { colorScheme } = useMantineColorScheme();

    const { toolTipProps: configTooltipProps, ...config } = actionType
        ? getActionConfig(colorScheme)[actionType]
        : {};

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
            validate: page.isUpdate,
            default: true,
            createMultiple: true,
            tempDelete: true,
            tempUpdate: true,
            viewFile: true,
            sendMail: true,
            view: true,
            select: true,
            find: true,
            cancel: true,
            modalPicker: true,
            modalConfirm: true
        };

        const permission = requiredPermissions[actionType];

        // Nếu permission là false thì hide
        return permission === false;
    })();

    const tooltip = toolTipProps || configTooltipProps;

    const actionIcon = (
        <ActionIcon hidden={shouldHide} {...config} {...rest}>
            {children || config.children}
        </ActionIcon>
    );

    if (tooltip) {
        return (
            <Tooltip {...tooltip} label={tooltip.label} hidden={!tooltip.label}>
                {actionIcon}
            </Tooltip>
        );
    }

    return actionIcon;
}
