import { Group, Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComponentProps, useState } from "react";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";

interface ICustomButtonSync extends Omit<ComponentProps<typeof CustomButtonModal>, "disclosure"> {
    /** Callback khi bấm nút xóa trong modal */
    onSubmit: () => void;
    /** Callback khi gọi api sync thành công */
    onSuccess?: () => void;
    /** Callback khi có lỗi xảy ra khi gọi api */
    onError?: () => void;
    /** Loading khi gọi api */
    loading?: boolean;
    count?: number
}

export default function CustomButtonModalSync(
    {
        onSubmit,
        onSuccess,
        onError,
        count,
        ...rest
    }: ICustomButtonSync) {
    const queryClient = useQueryClient();
    const loadingState = useState<boolean>()
    const disc = useDisclosure();

    const mutation = useMutation({
        mutationFn: async () => onSubmit(),
        onSuccess: () => {
            loadingState[1](false)
            queryClient.invalidateQueries();
            utils_notification_show({ crudType: "update" });
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
                title: "Xác nhận đồng bộ dữ liệu"
            }}
            buttonProps={{
                actionType: "sync",
                ...rest.buttonProps
            }}
        >
            <Highlight
                highlight={[String(count)]}
                color="red.6"
                highlightStyles={{
                    fontWeight: 700,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                {
                    `Bạn có chắc chắn muốn đồng bộ dữ liệu, tác vụ này sẽ thêm mới [${count ?? 0}] bản ghi ? Các dữ liệu trước đó sẽ không bị ảnh hưởng`
                }
            </Highlight>
            <Group grow>
                <CustomButton
                    actionType="sync"
                    onClick={handleCLick}
                    loading={loadingState[0]}
                />
                <CustomButton
                    actionType="cancel"
                    onClick={disc[1].close}
                />
            </Group>
        </CustomButtonModal>
    )
}
