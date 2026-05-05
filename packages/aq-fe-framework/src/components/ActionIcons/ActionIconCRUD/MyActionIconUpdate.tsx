import { MyButton } from "@/components/Button/Button/MyButton"
import { MyFlexColumn } from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { MyReactMutationProps, useMyReactMutation } from "@/hooks"
import { MyApiResponse } from "@/shared/lib/createBaseApi"
import { useStore_Permission } from "@/stores"
import { UseFormReturnType } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { AxiosResponse } from "axios"
import { ComponentProps, useEffect } from "react"
import { MyActionIconModal } from "../ActionIconModal/MyActionIconModal"

interface IActionIconUpdate<IReq, IRes> extends Omit<ComponentProps<typeof MyActionIconModal>, "form" | "disclosure" | "onSubmit"> {
    resetFormWhenclose?: boolean
    onSubmit: (values: IReq) => Promise<AxiosResponse<MyApiResponse<IRes>>> | false | void
    onSuccess?: (...args: any[]) => void; // Custom callback for success handling
    onError?: (...args: any[]) => void; // Custom callback for error handling
    form: UseFormReturnType<IReq>;
    disclosure?: ReturnType<typeof useDisclosure>;
    useMyReactMutationProps?: Omit<MyReactMutationProps<Promise<AxiosResponse<MyApiResponse<IRes>, any>>, IRes>, "axiosFn">

}


/**
 * @deprecated Component này không xài nữa
 * Vui lòng dùng `MyButtonCreateUpdate` từ `core` thay thế.
 */
export function MyActionIconUpdate<IReq, IRes>({
    resetFormWhenclose,
    form,
    onSubmit,
    onSuccess,
    onError,
    children,
    useMyReactMutationProps,
    ...rest
}: IActionIconUpdate<IReq, IRes>) {
    const permissionStore = useStore_Permission()
    const disc = useDisclosure()
    const mutation = useMyReactMutation({
        mutationType: "update",
        axiosFn: (values: Promise<AxiosResponse<MyApiResponse<IRes>>>) => {
            return values
        },
        options: {
            onSuccess: () => {
                disc[1].close()
            },
            ...(onSuccess && {
                onSuccess: () => {
                    onSuccess();
                },
            }),
            ...(onError && {
                onError: () => {
                    onError();
                },
            }),
        },
        ...useMyReactMutationProps
    })
    useEffect(() => {
        if (!resetFormWhenclose) return
        if (disc[0] == true) return
        form.reset()
    }, [disc[0]])
    return (
        <MyActionIconModal
            hidden={
                process.env.NEXT_PUBLIC_IS_DEV == "1" ? false :
                    !permissionStore.state.currentPermissionPage?.isUpdate
            }
            disclosure={disc} crudType="update" {...rest}>
            <form onSubmit={form.onSubmit((values, event) => {
                event!.stopPropagation();
                const result = onSubmit(values)
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
            })}>
                <MyFlexColumn>
                    {children}
                    <MyButton
                        type="submit"
                        crudType="save"
                        loading={mutation.isPending}
                    />
                </MyFlexColumn>
            </form>
        </MyActionIconModal>
    )
}