import { MyFlexColumn } from "@/components/Layouts/FlexColumn/MyFlexColumn";

import { Modal, ModalProps, TooltipProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { MyActionIcon, MyActionIconProps } from "../MyActionIcon/MyActionIcon";
import { MyButton, MyButtonProps } from "../MyButton/MyButton";

export interface MyButtonModalProps {
    children?: ReactNode;
    disclosure: ReturnType<typeof useDisclosure>;
    buttonProps?: MyButtonProps
    actionIconProps?: MyActionIconProps
    modalProps?: Omit<ModalProps, "opened" | "onClose">
    isActionIcon?: boolean
    /**
   * @deprecated 
   * Xài actionIconProps trong đó có tooltipProps xài trong đó nhé.
   */
    toolTipProps?: Omit<TooltipProps, "children">,
}


export function MyButtonModal({
    disclosure,
    children,
    buttonProps,
    actionIconProps,
    modalProps,
    isActionIcon = false,
    toolTipProps,
}: MyButtonModalProps) {
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
                <MyActionIcon
                    toolTipProps={toolTipProps}
                    {...actionIconProps}
                    onClick={handleClick}
                />
            ) : (
                <MyButton
                    {...buttonProps}
                    onClick={handleClick}
                />
            )}

            <Modal
                opened={disclosure?.[0]}
                onClose={disclosure[1].close}
                {...modalProps}
            >
                <MyFlexColumn>
                    {children}
                </MyFlexColumn>
            </Modal>
        </>
    );
}
