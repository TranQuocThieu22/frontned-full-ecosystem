import { MyButton } from "@/components/Buttons/Button/MyButton"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { utils_notification_show } from "@/utils/notification"
import { UseFormReturnType } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ComponentProps, ReactNode } from "react"
import { MyActionIconModal } from "../ActionIconModal/MyActionIconModal"

interface IActionIconUpdate<T> extends Omit<ComponentProps<typeof MyActionIconModal>, "form" | "disclosure" | "onSubmit"> {
    onSubmit: (values: T) => void | Promise<void>;
    onSuccess?: () => void; // Custom callback for success handling
    onError?: () => void; // Custom callback for error handling
    form: UseFormReturnType<T>;
    submitButton?: ReactNode
}

export default function MyActionIconUpdate<T>({ form, submitButton, onSubmit, onSuccess, onError, children, ...rest }: IActionIconUpdate<T>) {
    const disc = useDisclosure()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (values: T) => {
            await onSubmit(values);
        },
        onSuccess: () => {
            queryClient.invalidateQueries()
            utils_notification_show({ crudType: "update" });
            disc[1].close();
            if (onSuccess) onSuccess();
        },
        onError: () => {
            if (onError) onError();
        },
    })
    return (
        <MyActionIconModal disclosure={disc} crudType="update" {...rest}>
            <form onSubmit={form.onSubmit((values) => {
                mutation.mutate(values);
            })}>
                <MyFlexColumn>
                    {children}
                    {submitButton ? submitButton : <MyButton type="submit" crudType="update" />}
                </MyFlexColumn>
            </form>
        </MyActionIconModal>
    )
}