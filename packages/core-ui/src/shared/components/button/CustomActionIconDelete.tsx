import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { Group, Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { CustomButton } from "./CustomButton/CustomButton";
import { CustomButtonModal, CustomButtonModalProps } from "./CustomButtonModal/CustomButtonModal";
export interface CustomActionIconDeleteProps<IRes> extends Omit<CustomButtonModalProps, "disclosure"> {
    onSubmit: () => Promise<AxiosResponse<CustomApiResponse<IRes>>> | void
    onSuccess?: () => void;
    onError?: () => void;
    contextData?: string;
    /**
     * @deprecated Vui lòng không sử dụng props này
     * Vui lòng dùng loading bên trong `actionIconProps` 
     */
    loading?: boolean
}

export function CustomActionIconDelete<IRes>({
    onSubmit,
    onSuccess,
    onError,
    contextData,
    loading,
    ...rest
}: CustomActionIconDeleteProps<IRes>) {
    const disc = useDisclosure();
    const loadingState = useState<boolean>()

    const mutation = useCustomReactMutation({
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
                } as unknown as AxiosResponse<CustomApiResponse<IRes>>);
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
                } as unknown as AxiosResponse<CustomApiResponse<IRes>>);
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
        <CustomButtonModal
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
                <CustomButton
                    actionType="delete"
                    onClick={handleCLick}
                    loading={mutation.isPending}
                />
                <CustomButton
                    actionType="cancel"
                    onClick={disc[1].close}
                />
            </Group>
        </CustomButtonModal>
    );
}
