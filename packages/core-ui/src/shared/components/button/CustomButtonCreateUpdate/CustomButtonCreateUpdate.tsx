
import { CustomReactMutationProps, useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation"
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi"
import { ModalProps, ScrollArea, ScrollAreaAutosizeProps, Space, useMantineColorScheme } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { AxiosResponse } from "axios"
import React, { ReactNode } from "react"
import { CustomFlexColumn } from "../../layout/CustomFlexColumn"
import { CustomActionIconProps } from "../CustomActionIcon/CustomActionIcon"
import { CustomButton, CustomButtonProps } from "../CustomButton/CustomButton"
import { CustomButtonModal } from "../CustomButtonModal/CustomButtonModal"

export function applyReadOnlyToChildren(children: ReactNode, readOnlyState?: boolean): ReactNode {
    return React.Children.map(children, (child) => {
        if (!child || typeof child !== "object") return child;
        if (!("props" in child)) return child;

        const element: any = child;
        const props = element.props;

        const newProps: any = { ...props };

        // --- RULE 1: Nếu input tự đặt readOnly → tôn trọng, KHÔNG override
        if (!("readOnly" in props)) {
            newProps.readOnly = readOnlyState;     // chỉ auto-apply nếu không có readOnly trong props
        }

        // --- RULE 2: Đệ quy vào children lồng nhau ---
        if (props.children) {
            newProps.children = applyReadOnlyToChildren(props.children, readOnlyState);
        }

        return React.cloneElement(element, newProps);
    });
}


export interface CustomButtonCreateUpdateProps<IReq, IRes> {
    modalProps?: Omit<ModalProps, "opened" | "onClose">
    actionIconProps?: CustomActionIconProps,
    buttonProps?: CustomButtonProps,
    submitButtonProps?: CustomButtonProps
    scrollAreaAutosizeProps?: ScrollAreaAutosizeProps
    isUpdate?: boolean
    onSubmit: (values: IReq, isUpdate?: boolean) => Promise<AxiosResponse<CustomApiResponse<IRes>>> | false | void
    form: UseFormReturnType<IReq>;
    closeModalWhenSubmit?: boolean
    resetFormWhenSubmit?: boolean
    disclosure?: ReturnType<typeof useDisclosure>;
    children?: ReactNode
    useCustomReactMutationProps?: Omit<CustomReactMutationProps<Promise<AxiosResponse<CustomApiResponse<IRes>, any>>, IRes>, "axiosFn">
    onSuccess?: (...args: any[]) => void;
    onError?: (...args: any[]) => void;
    readOnlyAllInput?: boolean
}
export function CustomButtonCreateUpdate<IReq, IRes>({
    modalProps,
    actionIconProps,
    buttonProps,
    submitButtonProps,
    form,
    onSubmit,
    onSuccess,
    onError,
    closeModalWhenSubmit = true,
    resetFormWhenSubmit = true,
    children,
    disclosure: externalDisclosure,
    isUpdate = false,
    scrollAreaAutosizeProps,
    useCustomReactMutationProps: useMyReactMutationProps,
    readOnlyAllInput,
}: CustomButtonCreateUpdateProps<IReq, IRes>) {
    const theme = useMantineColorScheme();
    const defaultDisclosure = useDisclosure();
    const disclosure = externalDisclosure ?? defaultDisclosure;
    const mutation = useCustomReactMutation({
        axiosFn: (values: Promise<AxiosResponse<CustomApiResponse<IRes>>>) => {
            return values
        },
        mutationType: isUpdate ? "update" : "create",
        ...useMyReactMutationProps,
        options: {
            ...useMyReactMutationProps?.options,
            onError: (error, variables, context) => {
                let parsed: CustomApiResponse<IRes> | null;
                try {
                    parsed = JSON.parse(error.message);
                } catch {
                    parsed = null;
                }
                if (parsed?.data) {
                    Object.entries(parsed.data).forEach(([field, message]) => {
                        form.setFieldError(field.charAt(0).toLowerCase() + field.slice(1), message as string);
                    });
                    // Hiển thị notification tổng hợp
                    const errorMessages = Object.values(parsed.data).join(", ");
                    notifications.show({
                        title: "Không thể lưu dữ liệu",
                        message: errorMessages,
                        color: "red",
                    });
                    return;
                }
                onError?.(error, variables, context)
                useMyReactMutationProps?.options?.onError?.(error, variables, context)
            },
            onSuccess: (...args) => {
                if (closeModalWhenSubmit) disclosure[1].close();
                if (resetFormWhenSubmit) form.reset();
                onSuccess?.(args)
                useMyReactMutationProps?.options?.onSuccess?.(...args)
            },
        },
    });
    return (
        <CustomButtonModal
            isActionIcon={isUpdate}
            actionIconProps={{
                actionType: "update",
                ...actionIconProps
            }}
            buttonProps={{
                actionType: "create",
                ...buttonProps
            }}
            modalProps={{
                title: isUpdate ? "Sửa dữ liệu" : "Thêm dữ liệu",
                styles: {
                    content: {
                        backgroundColor: theme.colorScheme === "dark"
                            ? "var(--mantine-color-dark-8)"
                            : "var(--mantine-color-gray-1)",
                    },
                },
                ...modalProps
            }}
            disclosure={disclosure}
        >
            <form
                onSubmit={form.onSubmit((values, event) => {
                    event!.stopPropagation();
                    const result = onSubmit(values, isUpdate)
                    let axiosPromise

                    if (result == false) return
                    if (result == undefined) {
                        axiosPromise = Promise.resolve({
                            data: {
                                message: "Tạo thành công (giả lập)",
                                data: {} as IRes,
                                isSuccess: 1,
                            },
                            status: 200,
                            statusText: "OK",
                            headers: {},
                            config: {},
                        } as AxiosResponse<CustomApiResponse<IRes>>);
                    } else {
                        axiosPromise = result
                    }
                    mutation.mutate(axiosPromise);
                })}
            >
                <ScrollArea
                    h={modalProps?.fullScreen ? "calc(100vh - 140px)" : "auto"}
                    {...scrollAreaAutosizeProps}
                >
                    <CustomFlexColumn p={'md'}>
                        {applyReadOnlyToChildren(children, readOnlyAllInput)}
                    </CustomFlexColumn>
                </ScrollArea>
                <Space />
                <CustomButton
                    hidden={actionIconProps?.actionType == "view"} // Nếu actionType là view thì ẩn nút lưu
                    fullWidth
                    actionType={actionIconProps?.actionType == "sendMail" ? "sendMail" : "save"}
                    loading={mutation.isPending}
                    type="submit"
                    {...submitButtonProps}
                />
            </form>
        </CustomButtonModal>
    )


}

