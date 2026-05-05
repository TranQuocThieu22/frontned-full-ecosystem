import { MyReactMutationProps, useMyReactMutation } from "@/hooks"
import { MyApiResponse } from "@/shared/lib/createBaseApi"
import { Modal, ModalProps, ScrollArea, ScrollAreaAutosizeProps, Space, useMantineColorScheme } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { AxiosResponse } from "axios"
import { ReactNode, useEffect } from "react"
import { MyFlexColumn } from "../../layout/MyFlexColumn"
import { MyActionIcon, MyActionIconProps } from "../MyActionIcon/MyActionIcon"
import { MyButton, MyButtonProps } from "../MyButton/MyButton"

// Update
export interface MyButtonCreateUpdateProps<IReq, IRes> {
    /** Props của modal hiển thị */
    modalProps?: Omit<ModalProps, "opened" | "onClose">
    actionIconProps?: MyActionIconProps,
    buttonProps?: MyButtonProps,
    submitButtonProps?: MyButtonProps
    scrollAreaAutosizeProps?: ScrollAreaAutosizeProps
    isUpdate?: boolean
    onSubmit: (values: IReq, isUpdate?: boolean) => Promise<AxiosResponse<MyApiResponse<IRes>>> | false | void
    ignoreDefaultOnSuccess?: boolean;
    ignoreDefaultOnError?: boolean;
    form: UseFormReturnType<IReq>;
    closeModalWhenSubmit?: boolean
    resetFormWhenSubmit?: boolean
    disclosure?: ReturnType<typeof useDisclosure>;
    children?: ReactNode
    useMyReactMutationProps?: Omit<MyReactMutationProps<Promise<AxiosResponse<MyApiResponse<IRes>, any>>, IRes>, "axiosFn">
    onSuccess?: (...args: any[]) => void;
    onError?: (...args: any[]) => void;
    initValues?: IReq
}
// Deploy không ăn
export function MyButtonCreateUpdate<IReq, IRes>({
    modalProps,
    actionIconProps,
    buttonProps,
    submitButtonProps,
    form,
    onSubmit,
    onSuccess,
    onError,
    ignoreDefaultOnError,
    ignoreDefaultOnSuccess,
    closeModalWhenSubmit = true,
    resetFormWhenSubmit = true,
    children,
    disclosure: externalDisclosure,
    isUpdate = false,
    scrollAreaAutosizeProps,
    useMyReactMutationProps,

    initValues
}: MyButtonCreateUpdateProps<IReq, IRes>) {
    const theme = useMantineColorScheme();
    const defaultDisclosure = useDisclosure();
    const disclosure = externalDisclosure ?? defaultDisclosure;
    const mutation = useMyReactMutation({
        axiosFn: (values: Promise<AxiosResponse<MyApiResponse<IRes>>>) => {
            return values
        },
        mutationType: isUpdate ? "update" : "create",
        ...useMyReactMutationProps,
        options: {
            ...useMyReactMutationProps?.options,
            onError: (error, variables, context) => {
                if (!ignoreDefaultOnError) {
                    let parsed: MyApiResponse<IRes> | null;
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
                }
                onError?.(error, variables, context)
                useMyReactMutationProps?.options?.onError?.(error, variables, context)
            },
            onSuccess: (...args) => {
                if (!ignoreDefaultOnSuccess) {
                    if (closeModalWhenSubmit) disclosure[1].close();
                    if (resetFormWhenSubmit) form.reset();
                }
                onSuccess?.(args)
                useMyReactMutationProps?.options?.onSuccess?.(...args)
            },
        },
    });
    useEffect(() => {
        if (!initValues) return
        if (disclosure[0]) {
            if (isUpdate && initValues) form.setValues(initValues);
            else form.reset();
        }
    }, [disclosure[0]]);
    return (
        <>
            {isUpdate == true ?
                <MyActionIcon
                    actionType="update"
                    onClick={disclosure[1].open}
                    {...actionIconProps}
                />
                :
                <MyButton
                    actionType="create"
                    onClick={disclosure[1].open}
                    {...buttonProps}
                />
            }
            <Modal
                title={isUpdate ? "Sửa dữ liệu" : "Thêm dữ liệu"}
                opened={disclosure[0]}
                onClose={disclosure[1].close}
                styles={{
                    content: {
                        backgroundColor: theme.colorScheme === "dark"
                            ? "var(--mantine-color-dark-8)"
                            : "var(--mantine-color-gray-1)",
                    },
                }}
                {...modalProps}
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
                            } as AxiosResponse<MyApiResponse<IRes>>);
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
                        <MyFlexColumn p={'md'}>
                            {children}
                        </MyFlexColumn>
                    </ScrollArea>
                    <Space />
                    <MyButton fullWidth actionType="save" loading={mutation.isPending} {...submitButtonProps} />
                </form>
            </Modal>
        </>
    )


}

