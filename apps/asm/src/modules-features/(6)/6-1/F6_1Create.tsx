"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyDataTableSelect from '@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect'
import { FileInput, Group, MultiSelect, NumberInput, Select, SimpleGrid, Tabs, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useListState } from "@mantine/hooks";
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput'
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'
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

// REVIEW: 48272 F6_1Create

export default function F6_1Create() {
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
                <MyTextInput label="Mã kế hoạch" {...form.getInputProps("code")} />
                <MyDateInput label="Ngày kế hoạch" {...form.getInputProps("date")} />
            </SimpleGrid>
            <TextInput
                label="Tên kế hoạch"
                placeholder="Nhập tên kế hoạch"
                {...form.getInputProps("name")} />
            <Select
                clearable
                searchable
                placeholder='Loại kế hoạch'
                label='Loại kế hoạch'
                data={[
                    {
                        value: "Sửa chữa",
                        label: "Sửa chữa"
                    },
                    {
                        value: "Bảo trì",
                        label: "Bảo trì"
                    },
                    {
                        value: "Nâng cấp",
                        label: "Nâng cấp"
                    },
                ]}
                {...form.getInputProps("type")}
            />
            <MyTextArea label="Nội dung" {...form.getInputProps("note")} mb={7} />
            <Select
                clearable
                searchable
                placeholder='Người nhận'
                label='Chọn người nhận'
                data={[
                    {
                        value: "Phạm Minh Lâm ",
                        label: "Phạm Minh Lâm "
                    },
                    {
                        value: "Nguyễn Hữu Luân",
                        label: "Nguyễn Hữu Luân"
                    }
                ]}
                {...form.getInputProps("receiver")}
            />
            <MyFileInput label="File minh chứng"{...form.getInputProps("file")} />
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
                <MyDateInput label="Ngày bắt đầu" {...form.getInputProps("startDate")} />
                <MyDateInput label="Ngày kết thúc" {...form.getInputProps("endDate")} />
            </SimpleGrid>


        </MyButtonCreate>
    )
}

