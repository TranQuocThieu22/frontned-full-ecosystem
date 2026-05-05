"use client"
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import MyDataTableSelect from '@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect'
import { FileInput, Group, MultiSelect, NumberInput, Select, SimpleGrid, Tabs, Text } from '@mantine/core'
import { useForm, } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useListState } from "@mantine/hooks"
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate'
import { IDocument } from '@/interfaces/global-interface/IDocument'
import F6_7ReadUnitList from './F6_7ReadUnitList'
// REVIEW : 48272 F6_7Update
interface IPlan {
    id?: number;
    code?: string;
    date?: Date | string | null;
    name?: string;
    note?: string;
    type?: string;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    mail?: string;
    isMailSent?: boolean;
    file?: File | null;
    receiver?: string;
}

export default function F6_7Update({ data }: { data: IPlan }) {

    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<IPlan>({
        initialValues: {
            code: "HD251",
            name: "",
            type: "1",
            date: new Date("2025-01-22"),
            startDate: undefined,
            endDate: undefined,
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
        <MyActionIconUpdate
            modalSize="90%"
            form={form}
            onSubmit={() => {
                console.log("thêm thành công: ", form.values);
                // baseAxios.post("userNCKHs", form.values)
            }}
        >
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
                            value: "1",
                            label: "Thực hiện sửa chữa tài sản đợt 1 2024"
                        },
                        {
                            value: "2",
                            label: "Thực hiện sửa chữa tài sản đợt 1 2025"
                        },
                        {
                            value: "3",
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
        </MyActionIconUpdate>
    );
}