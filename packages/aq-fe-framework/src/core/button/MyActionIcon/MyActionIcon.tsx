import { useStore_Permission } from "@/stores";
import { type_action } from "@/types/type_action";
import { ActionIcon, ActionIconProps, MantineColorScheme, Tooltip, TooltipProps, useMantineColorScheme } from "@mantine/core";
import {
    IconBook,
    IconChecklist,
    IconDeviceFloppy,
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

export interface MyActionIconProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">, ActionIconProps {
    actionType?: type_action;
    isCheckPermission?: boolean
    toolTipProps?: TooltipProps
}

const getActionConfig = (colorScheme: MantineColorScheme): Record<type_action, MyActionIconProps & { toolTipProps?: TooltipProps }> => ({
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
    }
})


export function MyActionIcon({
    children,
    actionType,
    isCheckPermission = true,
    toolTipProps,
    ...rest
}: MyActionIconProps) {
    const permissionStore = useStore_Permission();
    const { colorScheme } = useMantineColorScheme();

    const { toolTipProps: configTooltipProps, ...config } = actionType
        ? getActionConfig(colorScheme)[actionType]
        : {};

    const shouldHide = (() => {
        if (
            !isCheckPermission ||
            !actionType ||
            !permissionStore.state.currentPermissionPage ||
            permissionStore.state.isSuperAdmin
        )
            return false;
        return (
            (actionType === "create" &&
                permissionStore.state.currentPermissionPage.isCreate === false) ||
            (actionType === "update" &&
                permissionStore.state.currentPermissionPage.isUpdate === false) ||
            (actionType === "delete" &&
                permissionStore.state.currentPermissionPage.isDelete === false) ||
            (actionType === "print" &&
                permissionStore.state.currentPermissionPage.isPrint === false) ||
            (actionType === "export" &&
                permissionStore.state.currentPermissionPage.isExport === false)
        );
    })();

    const tooltip = toolTipProps || configTooltipProps;

    const actionIcon = (
        <ActionIcon hidden={shouldHide} {...config} {...rest}>
            {children || config.children}
        </ActionIcon>
    );
    if (!permissionStore.state.currentPermissionPage) return
    if (tooltip) {
        return (
            <Tooltip {...tooltip} label={tooltip.label} hidden={!tooltip.label}>
                {actionIcon}
            </Tooltip>
        );
    }

    return actionIcon;
}
