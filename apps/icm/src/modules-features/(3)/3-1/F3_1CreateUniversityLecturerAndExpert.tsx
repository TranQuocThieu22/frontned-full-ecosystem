"use client"
import AQButtonCreateByImportFile from '@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { U0MyValidateEmail, U0MyValidateEmpty } from '@/utils/validateForm'
import { Group } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'

interface ICreateUserViewModel {
    code?: string;
    email?: string;
    fullName?: string;
    birthDate?: Date | undefined;
    highestDegree?: string;
    highestScientificTitle?: string;
    woringPlace?: string;
    isExternal?: boolean;
}

export default function F3_1CreateUniversityLecturerAndExpert() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            code: "",
            email: "",
            fullName: "",
            birthDate: undefined,
            highestDegree: "",
            highestScientificTitle: "",
            woringPlace: "",
            isExternal: false,
        },
        validate: {
            code: U0MyValidateEmpty(),
            email: (value) => U0MyValidateEmail(value),
            fullName: U0MyValidateEmpty(),
            birthDate: U0MyValidateEmpty(),
            highestDegree: U0MyValidateEmpty(),
            highestScientificTitle: U0MyValidateEmpty(),
            woringPlace: U0MyValidateEmpty(),
        }
    })

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    useEffect(() => {
        form_multiple.setValues({ importedData: fileData })
    }, [fileData])

    return (
        <Group>
            <AQButtonCreateByImportFile
                setImportedData={setFileData}
                objectName="giảng viên/chuyên viên"
                form={form_multiple}
                onSubmit={() => {
                    //todo
                    console.log("form_multiple", form_multiple.values)
                    console.log("thêm danh sách thành công")
                }} >
                s
            </AQButtonCreateByImportFile>
            <MyButtonCreate
                objectName='giảng viên/chuyên viên'
                form={form}
                onSubmit={
                    () => {
                        console.log("thêm thành công: ", form.values);
                        // baseAxios.post("userNCKHs", form.values)
                    }
                }>
                <MyTextInput label="Mã giảng viên" {...form.getInputProps("code")} />
                <MyTextInput label="Email" {...form.getInputProps("email")} />
                <MyTextInput label="Họ và tên" {...form.getInputProps("fullName")} />
                <DateInput
                    label="Ngày sinh"
                    placeholder="Nhập thông tin"
                    {...form.getInputProps("birthDate")}
                />
                <MyTextInput label="Học hàm" {...form.getInputProps("highestDegree")} />
                <MyTextInput label="Học vị" {...form.getInputProps("highestScientificTitle")} />
                <MyTextInput label="Đơn vị công tác" {...form.getInputProps("woringPlace")} />
            </MyButtonCreate>
        </Group>
    )
}

