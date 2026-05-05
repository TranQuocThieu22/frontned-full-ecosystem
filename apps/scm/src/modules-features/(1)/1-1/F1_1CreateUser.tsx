"use client"
import baseAxios from '@/api/baseAxios'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { U0MyValidateEmail, U0MyValidateEmpty } from '@/utils/validateForm'
import { useForm } from '@mantine/form'
import { I1_1User } from './F1_1ReadUser'


export default function F1_1CreateUser() {
    const form = useForm<I1_1User>({
        initialValues: {
            email: "",
            fullName: "",
            userName: "",
        },
        validate: {
            email: (value) => U0MyValidateEmail(value),
            fullName: U0MyValidateEmpty(),
            userName: U0MyValidateEmpty()
        }
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => baseAxios.post("userNCKHs", form.values)} objectName='người dùng'>
            <MyTextInput label='Tên tài khoản' {...form.getInputProps("userName")} />
            <MyTextInput label='Họ và tên' {...form.getInputProps("fullName")} />
            <MyTextInput label='Email' {...form.getInputProps("email")} />
        </MyButtonCreate>
    )
}


