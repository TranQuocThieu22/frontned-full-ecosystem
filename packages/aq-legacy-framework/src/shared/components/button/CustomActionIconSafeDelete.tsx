import { useLegacyReactMutation } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactMutation";
import { CustomApiResponse } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import { Group, Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { ConstraintCheckingResponse } from "@aq-fe/aq-legacy-framework/shared/interfaces/SafeDeleteResponse/ConstraintCheckingResponse";
import { CustomSafeDeleteResponseModal } from "@aq-fe/aq-legacy-framework/shared/components/overlays/CustomSafeDeleteResponseModal";
import { CustomButton } from "./CustomButton/CustomButton";
import { CustomButtonModal, CustomButtonModalProps } from "./CustomButtonModal/CustomButtonModal";

export interface CustomActionIconSafeDeleteProps<IRes> extends Omit<CustomButtonModalProps, "disclosure"> {
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

export function CustomActionIconSafeDelete<IRes>({
    onSubmit,
    onSuccess,
    onError,
    contextData,
    loading,
    ...rest
}: CustomActionIconSafeDeleteProps<IRes>) {
    const confirmDisclosure = useDisclosure();
    const loadingState = useState<boolean>();
    const safeDeleteDisclosure = useDisclosure();
    const [blockedResult, setBlockedResult] = useState<ConstraintCheckingResponse | undefined>();
    const queryClient = useQueryClient();

    const mutation = useLegacyReactMutation({
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
                loadingState[1](false);
                confirmDisclosure[1].close();
            },
            ...(onSuccess && {
                onSuccess: () => {
                    onSuccess();
                },
            }),
            onError: (error: Error) => {
                let parsed: any = null;

                try {
                    parsed = JSON.parse(error.message);
                }
                catch {
                    parsed = null;
                }

                if (parsed?.data && "constraintCount" in parsed.data) {
                    const data = parsed.data as ConstraintCheckingResponse;

                    if (!data.canDelete) {
                        setBlockedResult(data);
                        confirmDisclosure[1].close();
                        safeDeleteDisclosure[1].open();
                        return;
                    }
                }

                confirmDisclosure[1].close();
                if (onError) onError();
            },
        },
        autoInvalidate: true,
    });

    function handleCLick() {
        loadingState[1](true);
        mutation.mutate(undefined);
    }

    function handleSafeDeleteConfirm() {
        safeDeleteDisclosure[1].close();
        queryClient.invalidateQueries();
        setBlockedResult(undefined);
    }

    return (
        <>
            {/* Original Confirm Modal */}
            <CustomButtonModal
                disclosure={confirmDisclosure}
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
                    highlight={contextData ?? []}
                    color="red.6"
                    highlightStyles={{
                        fontWeight: 700,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {`Bạn sắp xóa dữ liệu ${contextData ?? ""}. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?`}
                </Highlight>
                <Group grow>
                    <CustomButton
                        actionType="delete"
                        onClick={handleCLick}
                        loading={mutation.isPending}
                    />
                    <CustomButton
                        actionType="cancel"
                        onClick={confirmDisclosure[1].close}
                    />
                </Group>
            </CustomButtonModal>

            {/* Safe Delete Modal */}
            <CustomSafeDeleteResponseModal
                disclosure={safeDeleteDisclosure}
                successCount={0}
                blockedList={blockedResult ? [blockedResult] : []}
                onConfirm={handleSafeDeleteConfirm}
            />
        </>
    );
}
