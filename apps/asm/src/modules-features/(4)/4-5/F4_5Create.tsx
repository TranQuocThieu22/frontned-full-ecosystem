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
import F4_4ReadAccountList from '../4-4/F4_4ReadAccountList'
import F4_4ReadStakeholder from '../4-4/F4_4ReadStakeholder'
import F4_5ReadAccountList from './F4_5ReadAccountList'
import F4_5ReadStakeholder from './F4_5ReadStakeholder'
interface IStockCheck {
    id?: number;
    code?: string //biên bản kiểm kê
    date?: Date | undefined
    note?: string
    price?: number
    sendDate?: Date | undefined;
    notificationTitle?: string
    content?: string
    receiver?: string[]
    file?: File | null;

    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// REVIEW: 48246 F4_5Create

export default function F4_5Create() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<IStockCheck>({
        initialValues: {
            code: "",
            date: undefined,
            note: "",
            price: 0,
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
                <MyTextInput label="Số chứng từ" {...form.getInputProps("code")} />
                <MyDateInput label="Ngày chứng từ" {...form.getInputProps("date")} />
                <NumberInput label="Giá trị thanh lý" {...form.getInputProps("price")} />

            </SimpleGrid>
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} mb={7} />
            <Tabs variant="pills" defaultValue="DsTaiSanThanhLy">
                <Tabs.List>
                    <Tabs.Tab value="DsTaiSanThanhLy">Danh sách tài sản thanh lý</Tabs.Tab>
                    <Tabs.Tab value="thanhPhanThamGia">Thành phần tham gia</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="DsTaiSanThanhLy">
                    <F4_5ReadAccountList />
                </Tabs.Panel>
                <Tabs.Panel value="thanhPhanThamGia">
                    <F4_5ReadStakeholder />

                </Tabs.Panel>

            </Tabs>

        </MyButtonCreate>
    )
}

