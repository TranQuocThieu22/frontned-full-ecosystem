import { MyButton, MyButtonModal, MyButtonModalProps } from "@/core";
import { useMyReactMutation } from "@/hooks";
import { MyApiResponse } from "@/shared/lib/createBaseApi";
import { Group, Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AxiosResponse } from "axios";
import { useState } from "react";
interface IActionIconDelete<IRes> extends Omit<MyButtonModalProps, "disclosure"> {
    onSubmit: () => Promise<AxiosResponse<MyApiResponse<IRes>>> | void
    onSuccess?: () => void;
    onError?: () => void;
    contextData?: string;
    /**
     * @deprecated Vui lòng không sử dụng props này
     * Vui lòng dùng loading bên trong `actionIconProps` 
     */
    loading?: boolean
}

export function MyActionIconDelete<IRes>({
    onSubmit,
    onSuccess,
    onError,
    contextData,
    loading,
    ...rest
}: IActionIconDelete<IRes>) {
    const disc = useDisclosure();
    const loadingState = useState<boolean>()

    const mutation = useMyReactMutation({
        mutationType: "delete",
        axiosFn: () => {
            if (process.env.NEXT_PUBLIC_APP_PROTOTYPE == "1") {
                console.log("Xóa thành công (giả lập)");

                return Promise.resolve({
                    data: {
                        message: "Xóa thành công (giả lập)",
                        data: {} as IRes,
                        isSuccess: 1,
                    },
                    status: 200,
                    statusText: "OK",
                    headers: {},
                    config: {},
                } as unknown as AxiosResponse<MyApiResponse<IRes>>);
            }
            const result = onSubmit!();
            if (result === undefined) {
                return Promise.resolve({
                    data: {
                        message: "Xóa thành công (giả lập)",
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
                loadingState[1](false)
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
        }
    });

    function handleCLick() {
        loadingState[1](true)
        mutation.mutate(undefined);
    }
    return (
        <MyButtonModal
            disclosure={disc}
            isActionIcon
            {...rest}
            actionIconProps={{
                actionType: "delete",
                loading: loading ? loading : rest.actionIconProps?.loading,
                ...rest.actionIconProps
            }}
            modalProps={{
                title: "Xóa dữ liệu",
                ...rest.modalProps
            }}
        >
            <Highlight
                highlight={contextData || []}
                color="red.6"
                highlightStyles={{
                    fontWeight: 700,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                {`Bạn sắp xóa dữ liệu ${contextData || ""}. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?`}
            </Highlight>
            <Group grow>
                <MyButton
                    actionType="delete"
                    onClick={handleCLick}
                    loading={mutation.isPending}
                />
                <MyButton
                    actionType="cancel"
                    onClick={disc[1].close}
                />
            </Group>
        </MyButtonModal>
    );
}
