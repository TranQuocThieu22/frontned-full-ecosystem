import { CustomButton } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonModal/CustomButtonModal";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Group, Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComponentProps, useState } from "react";
export interface CustomButtonDeleteListProps extends Omit<ComponentProps<typeof CustomButtonModal>, "disclosure"> {
    /** Callback khi bấm nút xóa trong modal */
    onSubmit: () => void;
    /** Callback khi gọi api xóa thành công */
    onSuccess?: () => void;
    /** Callback khi có lỗi xảy ra khi gọi api */
    onError?: () => void;
    /** `Bạn sắp xóa dữ liệu ${contextData || ""}. Hành động này 
     * không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?` */
    contextData?: string;
    /** Loading khi gọi api */
    loading?: boolean;
    /** `Bạn có chắc chắn muốn xóa [${count}] bản ghi đã chọn? 
     * Hành động này sẽ xóa vĩnh viễn các bản ghi này và không thể hoàn tác` */
    count?: number
}

export function CustomButtonDeleteList({
    onSubmit,
    onSuccess,
    onError,
    contextData,
    count,
    ...rest
}: CustomButtonDeleteListProps) {
    const queryClient = useQueryClient();
    const disc = useDisclosure();
    const loadingState = useState<boolean>()

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
    const mutation = useMutation({
        mutationFn: async () => await onSubmit(),
        onSuccess: () => {
            loadingState[1](false)
            queryClient.invalidateQueries();
            utils_notification_show({ crudType: "delete" });
            disc[1].close();
            if (onSuccess) {
                onSuccess()
            }
        },
        onError: () => {
            if (onError) {
                onError()
                return
            }
        },
    });

    function handleCLick() {
        loadingState[1](true)
        mutation.mutate();
    }
    return (
        <CustomButtonModal
            disclosure={disc}
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
                    `Bạn sắp xóa dữ liệu ${contextData || ""}. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?`
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
                    onClick={disc[1].close}
                />
            </Group>
        </CustomButtonModal>
    );
}
