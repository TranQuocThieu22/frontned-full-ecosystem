import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { Modal, ModalProps, TooltipProps, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { CustomActionIcon, CustomActionIconProps } from "../CustomActionIcon/CustomActionIcon";
import { CustomButton, CustomButtonProps } from "../CustomButton/CustomButton";

export interface CustomButtonModalProps {
    children?: ReactNode;
    disclosure: ReturnType<typeof useDisclosure>;
    buttonProps?: CustomButtonProps
    actionIconProps?: CustomActionIconProps
    modalProps?: Omit<ModalProps, "opened" | "onClose">
    isActionIcon?: boolean
    /**
   * @deprecated 
   * Xài actionIconProps trong đó có tooltipProps xài trong đó nhé.
   */
    toolTipProps?: Omit<TooltipProps, "children">,
}


export function CustomButtonModal({
    disclosure,
    children,
    buttonProps,
    actionIconProps,
    modalProps,
    isActionIcon = false,
    toolTipProps,
}: CustomButtonModalProps) {
    const theme = useMantineColorScheme();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // nếu props gốc có onClick thì chạy trước
        if (isActionIcon) {
            actionIconProps?.onClick?.(event as any);
        } else {
            buttonProps?.onClick?.(event);
        }
        // chỉ mở modal khi không disable
        disclosure?.[1].open();
    };
    return (
        <>
            {isActionIcon ? (
                <CustomActionIcon
                    toolTipProps={toolTipProps}
                    {...actionIconProps}
                    onClick={handleClick}
                />
            ) : (
                <CustomButton
                    {...buttonProps}
                    onClick={handleClick}
                />
            )}

            <Modal
                opened={disclosure?.[0]}
                onClose={disclosure[1].close}
                //  styles: {
                //     content: {
                //         backgroundColor: theme.colorScheme === "dark"
                //             ? "var(--mantine-color-dark-8)"
                //             : "var(--mantine-color-gray-1)",
                //     },
                // },
                styles={{
                    content: {
                        backgroundColor: theme.colorScheme === "dark"
                            ? "var(--mantine-color-dark-8)"
                            : "var(--mantine-color-gray-1)",
                    }
                }}
                {...modalProps}
            >
                <CustomFlexColumn mt={'md'}>
                    {children}
                </CustomFlexColumn>
            </Modal>
        </>
    );
}
