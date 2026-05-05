import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ISubmitButtonPropsForCreatePage {
    returnAfterCreate: boolean;
    onSuccess?: () => void; // Custom callback for success handling
    onError?: () => void; // Custom callback for error handling
    form: ReturnType<typeof useForm>;
}

export function useSubmitButtonForCreatePage({ returnAfterCreate, onSuccess, onError, form }: ISubmitButtonPropsForCreatePage) {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            // todo
            // baseAxios.post("researchGrqqoupProfiles", form.values)
            console.log("form.values", form.values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            notifications.show({
                message: "Tạo thành công"
            });
            form.reset();
            if (onSuccess) onSuccess();
            if (returnAfterCreate) {
                router.back();
            }
        },
        onError: () => {
            if (onError) onError();
        },
    });

    const handleSubmit = useCallback(() => {
        mutation.mutate();
    }, [mutation]);

    return {
        handleSubmit,
    };
}