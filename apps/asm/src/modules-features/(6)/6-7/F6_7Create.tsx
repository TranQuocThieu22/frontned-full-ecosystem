"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyDataTableSelect from '@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect'
import { FileInput, Group, MultiSelect, NumberInput, Select, SimpleGrid, Tabs, Textarea, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useListState } from "@mantine/hooks";
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput'
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'
import F6_7ReadUnitList from './F6_7ReadUnitList'
interface IPlan {
    id?: number;
    code?: string;
    date?: Date | undefined;
    name?: string;
    note?: string;
    type?: string;
    startDate?: Date | undefined
    endDate?: Date | undefined
    mail?: string;
    isMailSent?: string
    file?: File | null;
    receiver?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// REVIEW: 48272 F6_7Create

export default function F6_7Create() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<IPlan>({
        initialValues: {
            code: "",
            name: "",
            type: "",
            date: new Date(),
            startDate: new Date(),
            endDate: new Date(),
            mail: "",
            receiver: "",
            note: "",
        },
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
        <MyButtonCreate
            modalSize={"90%"}
            objectName='Chi tiết kế hoạch'
            form={form}
            onSubmit={
                () => {
                    console.log("thêm thành công: ", form.values);
                    // baseAxios.post("userNCKHs", form.values)
                }
            }>
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
                <MyTextInput label="Mã hợp đồng" {...form.getInputProps("code")} />
                <MyDateInput label="Ngày hợp đồng" {...form.getInputProps("date")} />
            </SimpleGrid>
            <Group grow align='end'>
                <Select
                    clearable
                    searchable
                    placeholder='Chọn hồ sơ'
                    label='Chọn hồ sơ'
                    data={[
                        {
                            value: "Thực hiện sửa chữa tài sản đợt 1 2024 ",
                            label: "Thực hiện sửa chữa tài sản đợt 1 2024"
                        },
                        {
                            value: "Thực hiện sửa chữa tài sản đợt 1 2025",
                            label: "Thực hiện sửa chữa tài sản đợt 1 2025"
                        },
                        {
                            value: "Thực hiện sửa chữa tài sản đợt 1 2026",
                            label: "Thực hiện sửa chữa tài sản đợt 1 2026"
                        },
                    ]}
                    {...form.getInputProps("type")}
                />
                <Text>Tổng giá trị: 65.000.000 đđ</Text>
            </Group>

            <MyTextInput label="Tên hợp đồng" {...form.getInputProps("note")} mb={7} />
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
                <MyDateInput label="Ngày bắt đầu" {...form.getInputProps("startDate")} />
                <MyDateInput label="Ngày kết thúc" {...form.getInputProps("endDate")} />
            </SimpleGrid>

            <F6_7ReadUnitList />
        </MyButtonCreate>
    )
}

