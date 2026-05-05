"use client"
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { utils_notification_show } from "@/utils/notification";
import { Button, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComponentProps, useState } from "react";
import { MyButtonModal } from "../ButtonModal/MyButtonModal";

interface I extends Omit<ComponentProps<typeof MyButtonModal>, "disclosure"> {
    onSubmit: () => void;
    onSuccess?: () => void; // Custom callback for success handling
    onError?: () => void; // Custom callback for error handling
    deleteKey?: string
}

export default function MyButtonDelete({
    onSubmit,
    onSuccess,
    onError,
    deleteKey,
    ...rest
}: I) {
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
            utils_notification_show({ crudType: "delete" });
            setLoading(false)
            disc[1].close()
            if (onSuccess) onSuccess();
        },
        onError: () => {
            if (onError) onError();
        },
    });

    return (
        <MyButtonModal disclosure={disc} crudType="delete" {...rest}>
            Bạn sắp xóa dữ liệu{deleteKey && ` "${deleteKey}"`}. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?
            <SimpleGrid cols={2}>
                <MyButton
                    crudType="delete"
                    onClick={() => {
                        setLoading(true)
                        mutation.mutate();
                    }}
                    loading={loading}
                >
                    Xác nhận xóa
                </MyButton>
                <Button color="gray" leftSection={<IconX />} onClick={() => {
                    disc[1].close()
                }}>
                    Hủy thao tác
                </Button>
            </SimpleGrid>
        </MyButtonModal>
    );
}
