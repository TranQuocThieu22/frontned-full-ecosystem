import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { U0MyValidateEmail } from '@/utils/validateForm'
import { useForm } from '@mantine/form'


interface IDsQuyen {
    id?: number
    ma?: string,
    quyen?: string,
}
export default function F1_1UpdatePermisstion({ user }: { user: IDsQuyen }) {
   const form = useForm<IDsQuyen>({
            initialValues: {
               ...user
            },
            validate: {
               ma: (value) => U0MyValidateEmail(value),
               quyen: (value) => U0MyValidateEmail(value),
            }
        })
    
        return (
            <MyActionIconUpdate form={form} onSubmit={() => { }} >
                <MyTextInput label='Mã quyềnquyền' {...form.getInputProps("ma")} />
                <MyTextInput label='Tên quyền' {...form.getInputProps("quyen")} />
            </MyActionIconUpdate>
        )
    }