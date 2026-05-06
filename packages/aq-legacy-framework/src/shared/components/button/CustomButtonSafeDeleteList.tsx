import { CustomButton } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonModal/CustomButtonModal";
import { useLegacyReactMutation } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactMutation";
import { CustomApiResponse } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import { Group, Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ComponentProps, useState } from "react";
import { ConstraintCheckingResponse } from "@aq-fe/aq-legacy-framework/shared/interfaces/SafeDeleteResponse/ConstraintCheckingResponse";
import { SafeDeleteListResponse } from "@aq-fe/aq-legacy-framework/shared/interfaces/SafeDeleteResponse/SafeDeleteListResponse";
import { CustomSafeDeleteResponseModal } from "@aq-fe/aq-legacy-framework/shared/components/overlays/CustomSafeDeleteResponseModal";

export interface CustomButtonSafeDeleteListProps extends Omit<ComponentProps<typeof CustomButtonModal>, "disclosure"> {
    /** Callback khi bấm nút xóa trong modal */
    onSubmit: () => Promise<AxiosResponse<CustomApiResponse<any>>> | any;
    /** Callback khi gọi api xóa thành công */
    onSuccess?: () => void;
    /** Callback khi có lỗi xảy ra khi gọi api */
    onError?: () => void;
    /** `Bạn sắp xóa dữ liệu ${contextData ?? ""}. Hành động này 
     * không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?` */
    contextData?: string;
    /** Loading khi gọi api */
    loading?: boolean;
    /** `Bạn có chắc chắn muốn xóa [${count}] bản ghi đã chọn? 
     * Hành động này sẽ xóa vĩnh viễn các bản ghi này và không thể hoàn tác` */
    count?: number
}

export function CustomButtonSafeDeleteList({
    onSubmit,
    onSuccess,
    onError,
    contextData,
    count,
    loading,
    ...rest
}: CustomButtonSafeDeleteListProps) {
    const queryClient = useQueryClient();
    const loadingState = useState<boolean>()
    const safeDeleteDisclosure = useDisclosure();
    const confirmDisclosure = useDisclosure();

    const [successCount, setSuccessCount] = useState(0);
    const [blockedList, setBlockedList] = useState<ConstraintCheckingResponse[]>([]);

    function isDisable() {
        // Nếu có count thì ưu tiên check count
        if (count !== undefined) {
            return count === 0;
        }
        // Nếu không có count thì check contextData
        if (contextData !== undefined) {
            return contextData.length === 0;
        }
        // Nếu cả 2 đều undefined thì disable
        return true;
    }

    const mutation = useLegacyReactMutation({
        mutationType: "delete",
        axiosFn: () => onSubmit(),
        options: {
            onSuccess: () => {
                loadingState[1](false);
                confirmDisclosure[1].close();
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (err: Error) => {
                loadingState[1](false);

                let parsed: any = null;

                try {
                    parsed = JSON.parse(err.message);
                } catch {
                    parsed = null;
                }

                if (parsed?.data && "blockedCount" in parsed.data) {
                    const data = parsed.data as SafeDeleteListResponse;

                    setSuccessCount(data.deletedCount ?? 0);
                    setBlockedList(data.blockedResults ?? []);
                    confirmDisclosure[1].close();
                    safeDeleteDisclosure[1].open();
                } else {
                    confirmDisclosure[1].close();
                }

                if (onError) onError();
            },
        },
        autoInvalidate: true,
    });

    function handleCLick() {
        loadingState[1](true)
        mutation.mutate();
    }

    function handleSafeDeleteConfirm() {
        safeDeleteDisclosure[1].close();
        queryClient.invalidateQueries();
        setSuccessCount(0);
        setBlockedList([]);
    }

    return (
        <>
            {/* Original Confirm Modal */}
            <CustomButtonModal
                disclosure={confirmDisclosure}
                modalProps={{
                    title: "Xóa dữ liệu hàng loạt"
                }}
                {...rest}
                buttonProps={{
                    actionType: "delete",
                    disabled: isDisable(),
                    ...rest.buttonProps
                }}
            >
                <Highlight
                    highlight={count ? [String(count)] : (contextData ? [contextData] : [])}
                    color="red.6"
                    highlightStyles={{
                        fontWeight: 700,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {count ?
                        `Bạn có chắc chắn muốn xóa [${count}] bản ghi đã chọn? Hành động này sẽ xóa vĩnh viễn các bản ghi này và không thể hoàn tác` :
                        `Bạn sắp xóa dữ liệu ${contextData ?? ""}. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?`
                    }
                </Highlight>
                <Group grow>
                    <CustomButton
                        actionType="delete"
                        onClick={handleCLick}
                        loading={loadingState[0]}
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
                successCount={successCount}
                blockedList={blockedList}
                onConfirm={handleSafeDeleteConfirm}
            />
        </>
    );
}
