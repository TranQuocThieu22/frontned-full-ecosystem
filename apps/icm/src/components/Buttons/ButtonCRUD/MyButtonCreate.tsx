import { MyButton } from "@/components/Buttons/Button/MyButton"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { U0MyShowNotification } from "@/utils/notification"
import { UseFormReturnType } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ComponentProps, ReactNode } from "react"
import { MyButtonModal } from "../ButtonModal/MyButtonModal"

interface IMyButtonCreate<T> extends Omit<ComponentProps<typeof MyButtonModal>, "disclosure" | "form" | "onSubmit"> {
    onSubmit: (values: T) => void
    onSuccess?: () => void;
    onError?: () => void;
    form: UseFormReturnType<T>;
    successNotification?: string;
    submitButton?: ReactNode
}

export default function MyButtonCreate<T>({
    form,
    onSubmit,
    onSuccess,
    onError,
    submitButton,
    successNotification,
    children,
    ...rest
}: IMyButtonCreate<T>) {
    const disc = useDisclosure();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (values: T) => {
            return await onSubmit(values);
        },
        onSuccess: () => {
            disc[1].close();
            queryClient.invalidateQueries();
            if (successNotification) {
                notifications.show({
                    color: "green",
                    message: successNotification
                })
            } else {
                U0MyShowNotification({ crudType: "create" });
            }

            form.reset();
            if (onSuccess) onSuccess();
        },
        onError: () => {
            if (onError) onError();
        },
    });

    return (
        <MyButtonModal disclosure={disc} crudType="create" {...rest}>
            <form onSubmit={form.onSubmit((values) => {
                mutation.mutate(values);
            })}>
                <MyFlexColumn>
                    {children}
                    {submitButton ? submitButton : <MyButton type="submit" crudType="create" />}
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    );
}