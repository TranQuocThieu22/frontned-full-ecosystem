"use client"
import baseAxios from '@/api/baseAxios'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { U0MyValidateEmail } from '@/utils/validateForm'
import { useForm } from '@mantine/form'

interface I {
    id?: number
    userName?: string,
    code?: string
    fullName?: string,
    email?: string,
    password?: string,
    phoneNumber?: string
}
export default function F1_1Create() {
    const form = useForm<I>({
        initialValues: {
            fullName: "",
            code: "",
            userName: "",
            password: "",
            email: "",
            phoneNumber: "",
        },
        validate: {
            email: (value) => U0MyValidateEmail(value),
        }
    })

    return (
        <MyButtonCreate form={form} onSubmit={async (values) => {
            return await baseAxios.post("/Account/create",
                {
                    ...values,
                    PasswordHash: "",
                    id: 0,
                    address: "",
                    concurrencyStamp: "",
                    isBlocked: false,
                    isEnabled: true,
                    workingUnitId: null,
                    AQModuleId: 3
                })
        }} objectName='người dùng'>
            <MyTextInput label='Mã tài khoản' {...form.getInputProps("code")} />
            <MyTextInput label='Tên tài khoản' {...form.getInputProps("userName")} />
            <MyTextInput label='Mật khẩu' {...form.getInputProps("password")} />
            <MyTextInput label='Họ và tên' {...form.getInputProps("fullName")} />
            <MyTextInput label='Email' {...form.getInputProps("email")} />
            <MyTextInput label='Số điện thoại' {...form.getInputProps("phoneNumber")} />
        </MyButtonCreate>
    )
}


