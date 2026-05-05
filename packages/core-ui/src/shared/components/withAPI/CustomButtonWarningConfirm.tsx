import { Flex, Paper, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AxiosResponse } from "axios";
import { ReactNode } from "react";
import { CustomReactMutationProps, useCustomReactMutation } from "../../hooks/useCustomReactMutation";
import { BaseEntity } from "../../interfaces/BaseEntity";
import { CustomApiResponse } from "../../libs/createBaseApi";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";
import { CustomButton } from "../button/CustomButton/CustomButton";
import { CustomButtonModal, CustomButtonModalProps } from "../button/CustomButtonModal/CustomButtonModal";
import { CustomFlexEnd } from "../layout/CustomFlexEnd";

interface CustomButtonWarningConfirmProps<TData extends BaseEntity> {
    children?: ReactNode
    onSubmit: () => Promise<AxiosResponse<CustomApiResponse<TData>>>
    buttonModalProps?: SafeOmitType<CustomButtonModalProps, "disclosure">
    customReactMutationProps?: SafeOmitType<CustomReactMutationProps<Promise<AxiosResponse<CustomApiResponse<TData>>>, TData>, "axiosFn">
}

export default function CustomButtonWarningConfirm<TData extends BaseEntity>({
    children,
    onSubmit,
    buttonModalProps,
    customReactMutationProps
}: CustomButtonWarningConfirmProps<TData>) {
    const disc = useDisclosure()
    const mutation = useCustomReactMutation({
        axiosFn: (values: Promise<AxiosResponse<CustomApiResponse<TData>>>) => {
            return values
        },
        ...customReactMutationProps,
        options: {
            ...customReactMutationProps?.options,
            onSuccess: (data, variables, context) => {
                disc[1].close()
                customReactMutationProps?.options?.onSuccess?.(data, variables, context)
            }
        }
    })
    return (
        <CustomButtonModal disclosure={disc} {...buttonModalProps} modalProps={{
            title: "Lưu ý",
            ...buttonModalProps?.modalProps
        }}>
            <Paper p={'md'} mt={'md'}>
                <Text fw={600} size="md">
                    Bạn có chắc chắn muốn tiếp tục?
                </Text>
                <Flex gap="lg" align="flex-start">
                    <Stack gap={6}>
                        {children}
                    </Stack>
                </Flex>

                {/* Actions */}
                <CustomFlexEnd gap="sm">
                    <CustomButton
                        actionType="modalConfirm"
                        onClick={() => {
                            const result = onSubmit()
                            mutation.mutate(result)
                        }}
                    />
                    <CustomButton
                        variant="outline"
                        actionType="cancel"
                        onClick={() => {
                            disc[1].close()
                        }}
                    />
                </CustomFlexEnd>
            </Paper>
        </CustomButtonModal>
    )
}
