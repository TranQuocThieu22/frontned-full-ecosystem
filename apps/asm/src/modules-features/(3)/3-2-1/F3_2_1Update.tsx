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
import F3_2_1BiddingUnitList from './F3_2_1BiddingUnitList'

interface ICreateContractViewModel {
    id?: number;
    code?: string;
    contractDate?: Date | undefined;
    name?: string;
    planId?: number;
    startDate?: Date | undefined
    endDate?: Date | undefined
}

export default function F3_2_1Update({ contractValues }: { contractValues: ICreateContractViewModel }) {

    const [fileData, setFileData] = useState<any[]>([]);

    const form = useForm<ICreateContractViewModel>({
        initialValues: {
            ...contractValues
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
                <MyDateInput label="Ngày hợp đồng" {...form.getInputProps("contractDate")} />
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
                    defaultValue={form.values.planId?.toString()}
                    onChange={(value: any) => form.setFieldValue("planId", parseInt(value?.toString()!))}
                />
                <Text>Tổng chi phí: 1.265.000.000 đ</Text>
            </Group>

            <MyTextInput label="Tên hợp đồng" {...form.getInputProps("name")} mb={7} />
            <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
                <MyDateInput label="Ngày bắt đầu" {...form.getInputProps("startDate")} />
                <MyDateInput label="Ngày kết thúc" {...form.getInputProps("endDate")} />
            </SimpleGrid>

            <F3_2_1BiddingUnitList />
        </MyActionIconUpdate>
    );
}