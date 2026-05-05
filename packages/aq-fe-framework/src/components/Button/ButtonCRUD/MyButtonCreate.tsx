import { MyFlexColumn } from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useMyReactMutation } from "@/hooks"
import { MyApiResponse } from "@/shared/lib/createBaseApi"
import { useStore_Permission } from "@/stores"
import { UseFormReturnType } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { AxiosResponse } from "axios"
import { ComponentProps } from "react"
import { MyButton } from "../Button/MyButton"
import { MyButtonModal } from "../ButtonModal/MyButtonModal"

interface IMyButtonCreate<IReq, IRes> extends Omit<ComponentProps<typeof MyButtonModal>, "disclosure" | "form" | "onSubmit"> {
    onSubmit: (values: IReq) => Promise<AxiosResponse<MyApiResponse<IRes>>> | void // Cho phép truyền void vao component
    onSuccess?: () => void;
    onError?: () => void;
    form: UseFormReturnType<IReq>;
    notCloseModalWhenSubmit?: boolean
    notResetFormWhenSubmit?: boolean
    disclosure?: ReturnType<typeof useDisclosure>;
}
/**
 * @deprecated Component này không xài nữa nha mấy ní
 * Vui lòng dùng `MyButtonCreateUpdate` từ `core` thay thế.
 */
export function MyButtonCreate<IReq, IRes>({
    form,
    onSubmit,
    onSuccess,
    onError,
    notCloseModalWhenSubmit = false,
    notResetFormWhenSubmit = false,
    children,
    disclosure: externalDisclosure,
    ...rest
}: IMyButtonCreate<IReq, IRes>) {
    const permissionStore = useStore_Permission()

    const defaultDisclosure = useDisclosure();
    const disclosure = externalDisclosure ?? defaultDisclosure;
    const mutation = useMyReactMutation({
        axiosFn: (values: IReq) => {
            const result = onSubmit!(values);
            if (result === undefined) {
                return Promise.resolve({
                    data: {
                        message: "Tạo thành công (giả lập)",
                        data: {} as IRes,
                        isSuccess: 1,
                    },
                    status: 200,
                    statusText: "OK",
                    headers: {},
                    config: {},
                } as unknown as AxiosResponse<MyApiResponse<IRes>>);
            }
            return result;
        },
        options: {
            onSuccess: () => {
                disclosure[1].close()
                if (notCloseModalWhenSubmit == false) {
                    disclosure[1].close();
                }
                if (notResetFormWhenSubmit == false) {
                    form.reset();
                }
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
        }
    });

    return (
        <MyButtonModal
            hidden={!permissionStore.state.currentPermissionPage?.isCreate}
            disclosure={disclosure}
            crudType="create"
            {...rest}>
            <form onSubmit={form.onSubmit((values) => {
                mutation.mutate(values);
            })}>
                <MyFlexColumn>
                    {children}
                    <MyButton type="submit" crudType="save" loading={mutation.isPending} />
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    );
}