'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import useM_Course_CourseRegistration_UpdateCheck from "@/hooks/mutation-hooks/Course/useM_Course_CourseRegistrationCheck";
import { utils_notification_show } from "@/utils/notification";
import { Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { IBaseEntity } from 'aq-fe-framework/interfaces'

interface I extends IBaseEntity {
    note?: string,
    isCheck?: boolean
}

export default function F_s5dibenvwp_Check({ values }: { values: I }) {
    const disc = useDisclosure()
    const queryClient = useQueryClient()
    const mutation = useM_Course_CourseRegistration_UpdateCheck({
        options: {
            onSuccess: (result) => {
                if (result.data.isSuccess == 1) {
                    queryClient.refetchQueries({ queryKey: ["useQ_Course_GetStudent"] })
                    utils_notification_show({ crudType: "update" })
                    disc[1].close()
                    return
                }
            }
        }
    })
    const form = useForm<I>({
        initialValues: {
            ...values,
            isCheck: values.isCheck ?? false,
            note: values.note ?? "",
        }
    })

    return (
        <MyButtonModal disclosure={disc} label="Kiểm tra" title="Kiểm tra hồ sơ đăng ký" leftSection={undefined}>
            <form onSubmit={form.onSubmit(values => {
                mutation.mutate([values])
            })}>
                <MyFlexColumn>
                    <Switch label="Hợp lệ" {...form.getInputProps("isCheck")} checked={!!form.values.isCheck} />
                    <MyTextArea label="Nhận xét" {...form.getInputProps("note")} />
                    <MyCheckbox label="Gửi mail thông báo" />
                    <MyButton crudType="save" />
                </MyFlexColumn>
            </form>
        </MyButtonModal>
    )
}
