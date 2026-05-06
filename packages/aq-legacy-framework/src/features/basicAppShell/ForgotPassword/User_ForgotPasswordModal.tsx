// User_ForgotPassword.tsx
import { Button, Modal, PasswordInput, Stack } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import useForgotPassword from "./useForgotPassword"

interface FormProps {
    currentPassWord: string
    newPassWord: string
    confirmNewPassWord: string
}

const validationRules = {
    currentPassWord: (value: string) => (!!value ? null : "Không được để trống"),
    newPassWord: (value: string) => (!!value ? null : "Không được để trống"),
    confirmNewPassWord: (value: string, values: FormProps) =>
        value === values.newPassWord ? null : "Xác nhận mật khẩu không chính xác",
}

export default function User_ForgotPasswordModal({
    disc
}: {
    disc: ReturnType<typeof useDisclosure>
}) {
    const { changePassWord, loading } = useForgotPassword()
    const form = useForm<FormProps>({
        mode: "uncontrolled",
        validate: validationRules,
    })

    const handleSubmit = (values: FormProps) => {
        changePassWord(
            {
                currentPassWord: values.currentPassWord,
                newPassWord: values.newPassWord,
            },
            {
                onSuccess: () => {
                    form.reset()
                    disc[1].close()
                },
            }
        )
    }

    return (
        <Modal
            title={"Đổi mật khẩu"}
            opened={disc[0]}
            onClose={disc[1].close}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <PasswordInput label="Mật khẩu hiện tại" placeholder="Nhập mật khẩu hiện tại" {...form.getInputProps("currentPassWord")} />
                    <PasswordInput label="Mật khẩu mới" placeholder="Nhập mật khẩu mới" {...form.getInputProps("newPassWord")} />
                    <PasswordInput label="Xác nhận mật khẩu mới" placeholder="Nhập xác nhận mật khẩu mới" {...form.getInputProps("confirmNewPassWord")} />
                    <Button loading={loading} type="submit">Đổi mật khẩu</Button>
                </Stack>
            </form>
        </Modal>
    )
}
