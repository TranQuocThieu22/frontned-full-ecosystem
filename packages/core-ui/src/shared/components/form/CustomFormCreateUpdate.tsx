import { ModalProps, ScrollArea, ScrollAreaAutosizeProps, Space } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { AxiosResponse } from "axios";
import { ReactNode } from "react";
import { CustomReactMutationProps, useCustomReactMutation } from "../../hooks/useCustomReactMutation";
import { CustomApiResponse } from "../../libs/createBaseApi";
import { CustomActionIconProps } from "../button/CustomActionIcon/CustomActionIcon";
import { CustomButton, CustomButtonProps } from "../button/CustomButton/CustomButton";
import { applyReadOnlyToChildren } from "@aq-fe/core-ui/shared/libs/applyReadOnlyToChildren";
import { CustomFlexColumn } from "../layout/CustomFlexColumn";

type MutationSuccess<IRes> = (
    data: IRes,
    variables: Promise<AxiosResponse<CustomApiResponse<IRes>>>,
    context: unknown
) => void;

type MutationError<IRes> = (
    error: Error,
    variables: Promise<AxiosResponse<CustomApiResponse<IRes>>>,
    context: unknown
) => void;
interface CustomFormCreateUpdateProps<IReq, IRes> {
    modalProps?: Omit<ModalProps, "opened" | "onClose">
    form: UseFormReturnType<IReq>;
    onSubmit: (values: IReq, isUpdate?: boolean) => Promise<AxiosResponse<CustomApiResponse<IRes>>> | false | void
    isUpdate?: boolean,
    scrollAreaAutosizeProps?: ScrollAreaAutosizeProps
    useCustomReactMutationProps?: Omit<CustomReactMutationProps<Promise<AxiosResponse<CustomApiResponse<IRes>, any>>, IRes>, "axiosFn">
    closeModalWhenSubmit?: boolean
    resetFormWhenSubmit?: boolean,
    onSuccess?: MutationSuccess<IRes>
    onError?: MutationError<IRes>
    actionIconProps?: CustomActionIconProps,
    submitButtonProps?: CustomButtonProps
    children?: ReactNode
    readOnlyAllInput?: boolean
}
export default function CustomFormCreateUpdate<IReq, IRes>({
    modalProps,
    form,
    onSubmit,
    isUpdate,
    scrollAreaAutosizeProps,
    useCustomReactMutationProps,
    resetFormWhenSubmit,
    onSuccess,
    onError,
    actionIconProps,
    submitButtonProps,
    children,
    readOnlyAllInput
}: CustomFormCreateUpdateProps<IReq, IRes>) {
    const mutation = useCustomReactMutation({
        axiosFn: (values: Promise<AxiosResponse<CustomApiResponse<IRes>>>) => {
            return values
        },
        mutationType: isUpdate ? "update" : "create",
        ...useCustomReactMutationProps,
        options: {
            ...useCustomReactMutationProps?.options,
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
                useCustomReactMutationProps?.options?.onError?.(error, variables, context)
            },
            onSuccess: (data, variables, context) => {
                if (resetFormWhenSubmit) form.reset();
                onSuccess?.(data, variables, context)
                useCustomReactMutationProps?.options?.onSuccess?.(data, variables, context)
            },
        },
    });
    return (
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
    )
}
