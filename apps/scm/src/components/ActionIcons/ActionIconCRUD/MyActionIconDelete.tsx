'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { U0MyShowNotification } from "@/utils/notification";
import { Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComponentProps, useState } from "react";
import { MyActionIconModal } from "../ActionIconModal/MyActionIconModal";
interface IActionIconDelete extends Omit<ComponentProps<typeof MyActionIconModal>, "disclosure"> {
    onSubmit: () => void;
    onSuccess?: () => void; // Custom callback for success handling
    onError?: () => void; // Custom callback for error handling
    contextData?: string
}

export default function MyActionIconDelete({
    onSubmit,
    contextData,
    onSuccess,
    onError,
    ...rest
}: IActionIconDelete) {
    const queryClient = useQueryClient()
    const disc = useDisclosure();
    const [loading, setLoading] = useState(false)

    // Mutation hook for delete operation
    const mutation = useMutation({
        mutationFn: async () => {
            await onSubmit();
        },
        onSuccess: () => {
            queryClient.invalidateQueries()
            U0MyShowNotification({ crudType: "delete" });
            setLoading(false)
            disc[1].close()
            if (onSuccess) onSuccess();
        },
        onError: () => {
            if (onError) onError();
        },
    });

    return (
        <MyActionIconModal disclosure={disc} crudType="delete" {...rest}>
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
            <MyButton
                crudType="delete"
                onClick={() => {
                    setLoading(true)
                    mutation.mutate();
                }}
                loading={loading}
            />
        </MyActionIconModal>
    );
}
