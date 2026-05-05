import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { U0MyValidateEmail } from '@/utils/validateForm'
import { useForm } from '@mantine/form'

interface IDsQuyen {
    id?: number
    ma?: string,
    quyen?: string,
}
export default function F1_1CreatePermission() {
 const form = useForm<IDsQuyen>({
         initialValues: {
             ma: "",
             quyen: "",
         },
         validate: {
            ma: (value) => U0MyValidateEmail(value),
            quyen: (value) => U0MyValidateEmail(value),
         }
     })
 
     return (
         <MyButtonCreate form={form} onSubmit={() => { }} objectName='người dùng'>
             <MyTextInput label='Mã quyền' {...form.getInputProps("ma")} />
             <MyTextInput label='Tên quyền' {...form.getInputProps("quyen")} />
         </MyButtonCreate>
     )
}
