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
import F4_5ReadAccountList from './F4_5ReadAccountList'
import F4_5ReadStakeholder from './F4_5ReadStakeholder'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate'
import { DateInput } from '@mantine/dates'
// REVIEW: 48246 F4_5Update

interface IStockCheck {
    id?: number;
    code?: string //biên bản kiểm kê
    date?: Date | undefined
    note?: string,
    price?: number
    sendDate?: Date | undefined;
    notificationTitle?: string
    content?: string
    receiver?: string[]
    file?: File | null;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}


export default function F4_5Update({ data }: { data: IStockCheck }) {
    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<IStockCheck>({
        initialValues: {
            // code: "",
            // date: new Date(),
            // note: "",

            //đang fix kiểu này để demo
            code: "GG0253",
            date: new Date(),
            note: "Ghi chú",
            price: 12000000,
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
        <MyActionIconUpdate
            modalSize={"90%"}
            form={form}
            onSubmit={
                () => {
                    console.log("thêm thành công: ", form.values);
                    // baseAxios.post("userNCKHs", form.values)
                }
            }>
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
                <MyTextInput label="Số chứng từ" {...form.getInputProps("code")} />
                <DateInput placeholder='Nhập ngày chứng từ' label="Ngày chứng từ" {...form.getInputProps("date")} />
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
        </MyActionIconUpdate>
    )
}

