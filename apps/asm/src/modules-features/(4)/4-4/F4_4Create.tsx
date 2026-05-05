"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyDataTableSelect from '@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect'
import { FileInput, Group, MultiSelect, NumberInput, Select, SimpleGrid, Tabs, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useListState } from "@mantine/hooks";
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput'
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'
import F4_4ReadAccountList from './F4_4ReadAccountList'
import F4_4ReadStakeholder from './F4_4ReadStakeholder'
// REVIEW: 48245 F4_4Create
interface IStockCheck {
    id?: number;
    code?: string //biên bản kiểm kê
    date?: Date | undefined
    note?: string
    sendDate?: Date | undefined;
    notificationTitle?: string
    content?: string
    receiver?: string[]
    file?: File | null;

    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}


export default function F4_4Create() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<IStockCheck>({
        initialValues: {
            code: "",
            date: new Date(),
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
            objectName='Kiểm kê tài sản cố định'
            form={form}
            onSubmit={
                () => {
                    console.log("thêm thành công: ", form.values);
                    // baseAxios.post("userNCKHs", form.values)
                }
            }>
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
                <MyTextInput label="Biên bản kiểm kê" {...form.getInputProps("code")} />
                <MyDateInput label="Ngày biên bản" {...form.getInputProps("date")} />
            </SimpleGrid>
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} mb={7} />
            <Tabs variant="pills" defaultValue="KiemKe">
                <Tabs.List>
                    <Tabs.Tab value="KiemKe">Kiểm kê</Tabs.Tab>
                    <Tabs.Tab value="thanhPhanThamGia">Thành phần tham gia</Tabs.Tab>
                    <Tabs.Tab value="ketQuaXuLy">Kết quả xử lý</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="KiemKe">

                    <F4_4ReadAccountList />
                </Tabs.Panel>
                <Tabs.Panel value="thanhPhanThamGia">
                    <F4_4ReadStakeholder />

                </Tabs.Panel>
                <Tabs.Panel value="ketQuaXuLy">
                    <MyTextArea minRows={8} label="Nội dung yêu cầu xử lý" {...form.getInputProps("note")} />

                </Tabs.Panel>
            </Tabs>

        </MyButtonCreate>
    )
}

