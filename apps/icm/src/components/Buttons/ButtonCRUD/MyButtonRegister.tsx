import { MyButton } from "@/components/Buttons/Button/MyButton"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { U0MyShowNotification } from "@/utils/notification"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ComponentProps } from "react"
import { MyButtonModal } from "../ButtonModal/MyButtonModal"

interface IMyButtonRegister extends Omit<ComponentProps<typeof MyButtonModal>, "disclosure" | "form"> {
    onSubmit: () => void,
    onSuccess?: () => void; // Custom callback for success handling
    onError?: () => void; // Custom callback for error handling
    form: ReturnType<typeof useForm>;
}

export default function MyButtonRegister({ form, onSubmit, onSuccess, onError, children, ...rest }: IMyButtonRegister) {
    const disc = useDisclosure()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async () => {
            return await onSubmit()
        },
        onSuccess: () => {
            queryClient.invalidateQueries()
            U0MyShowNotification({ crudType: "register" });
            disc[1].close();
            form.reset()
            if (onSuccess) onSuccess();
        },
        onError: () => {
            if (onError) onError();
        },
    })
    return (
        <MyButtonModal disclosure={disc} crudType="register"  {...rest}>
            <form onSubmit={form.onSubmit((values) => {
                mutation.mutate()
            })}>
                <MyFlexColumn>
                    {children}
                    <MyButton type="submit" crudType="register" />
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    )
}