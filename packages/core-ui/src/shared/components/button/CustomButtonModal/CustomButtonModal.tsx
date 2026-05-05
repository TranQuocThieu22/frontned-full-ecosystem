import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import CustomModal, { CustomModalProps } from "../../overlays/CustomModal";
import { CustomActionIcon, CustomActionIconProps } from "../CustomActionIcon/CustomActionIcon";
import { CustomButton, CustomButtonProps } from "../CustomButton/CustomButton";

export interface CustomButtonModalProps {
    children?: ReactNode;
    disclosure: ReturnType<typeof useDisclosure>;
    buttonProps?: CustomButtonProps
    actionIconProps?: CustomActionIconProps
    modalProps?: SafeOmitType<CustomModalProps, "disclosure">
    isActionIcon?: boolean
}


export function CustomButtonModal({
    disclosure,
    children,
    buttonProps,
    actionIconProps,
    modalProps,
    isActionIcon = false,
}: CustomButtonModalProps) {
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
                    {...actionIconProps}
                    onClick={handleClick}
                />
            ) : (
                <CustomButton
                    {...buttonProps}
                    onClick={handleClick}
                />
            )}

            <CustomModal
                disclosure={disclosure}
                {...modalProps}
            >
                <CustomFlexColumn >
                    {children}
                </CustomFlexColumn>
            </CustomModal>
        </>
    );
}
