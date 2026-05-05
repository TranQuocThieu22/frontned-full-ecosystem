import { CustomReactMutationProps, useCustomReactMutation } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactMutation"
import { CustomAPIResponse } from "@aq-fe/aq-core-framework/shared/interfaces/CustomAPIResponse"
import { CustomActionIconProps } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon"
import { CustomButton, CustomButtonProps } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton"
import { CustomButtonModal, CustomButtonModalProps } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal"
import { CustomModalProps } from "@aq-fe/core-ui/shared/components/overlays/CustomModal"
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType"
import { Space, Stack } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useDisclosure, UseDisclosureReturnValue } from "@mantine/hooks"
import { AxiosResponse } from "axios"
import { ReactNode } from "react"


export interface CustomButtonCreateUpdateProps<IReq, IRes> extends SafeOmitType<CustomButtonModalProps, "disclosure"> {
    customModalProps?: SafeOmitType<CustomModalProps, "disclosure">
    actionIconProps?: CustomActionIconProps,
    buttonProps?: CustomButtonProps,
    submitButtonProps?: CustomButtonProps
    isUpdate?: boolean
    onSubmit: (values: IReq, isUpdate?: boolean) => Promise<AxiosResponse<CustomAPIResponse<IRes>>> | false | void
    form: UseFormReturnType<IReq>;
    children?: ReactNode
    customReactMutationProps?: Partial<CustomReactMutationProps<IRes, Promise<AxiosResponse<CustomAPIResponse<IRes>>>>>
    disclosure?: UseDisclosureReturnValue
}

export function CustomButtonCreateUpdate<IReq, IRes>({
    customModalProps,
    actionIconProps,
    buttonProps,
    submitButtonProps,
    form,
    onSubmit,
    children,
    isUpdate = false,
    customReactMutationProps,
    disclosure: externalDisclosure,
    ...rest
}: CustomButtonCreateUpdateProps<IReq, IRes>) {
    const disclosure = externalDisclosure ?? useDisclosure();
    const mutation = useCustomReactMutation({
        mutationType: isUpdate ? "update" : "create",
        serviceFn: (axiosPromise: Promise<AxiosResponse<CustomAPIResponse<IRes>>>) => axiosPromise,
        onSuccess: (data, variables, context) => {
            disclosure[1].close();
            form.reset();
            if (customReactMutationProps?.onSuccess) {
                customReactMutationProps.onSuccess(data, variables, context);
            }
        },
        onError: (error, variables, context) => {
            customReactMutationProps?.onError?.(error, variables, context);
        },
    });

    return (
        <CustomButtonModal
            isActionIcon={isUpdate}
            actionIconProps={{
                actionType: "update",
                ...actionIconProps,
            }}
            buttonProps={{
                actionType: "create",
                ...buttonProps,
            }}
            modalProps={{
                title: isUpdate ? "Sửa dữ liệu" : "Thêm dữ liệu",
                ...customModalProps,
            }}
            disclosure={disclosure}
            {...rest}
        >
            <form
                onSubmit={form.onSubmit((values, event) => {
                    event!.stopPropagation();
                    const result = onSubmit(values, isUpdate);
                    let axiosPromise

                    if (result == false) return
                    if (result == undefined) {
                        axiosPromise = Promise.resolve({
                            data: {}
                        } as AxiosResponse<CustomAPIResponse<IRes>>);
                    } else {
                        axiosPromise = result
                    }
                    mutation.mutate(axiosPromise);
                })}
            >
                <Stack>
                    {children}
                </Stack>
                <Space my={"md"} />
                <CustomButton
                    hidden={actionIconProps?.actionType === "view"}
                    fullWidth
                    actionType={"save"}
                    loading={mutation.isPending}
                    type="submit"
                    {...submitButtonProps}
                />
            </form>
        </CustomButtonModal>
    );
}
