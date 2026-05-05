"use client"
import baseAxios from '@/api/config/baseAxios'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput'
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { Group, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
//REVIEW: quuoc thieu review 47511

interface IRoomType {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
}
interface IBranch {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
}
interface ICreateUserViewModel {
    id?: number;
    code?: string;
    name?: string;
    location?: number;
    block?: string;
    capacity?: number;
    testCapacity?: number;
    roomType?: IRoomType;
    roomTypeId?: number;
    branch?: IBranch;
    branchId?: number;

    // nguoiCapNhat?: string;
    // ngayCapNhat?: Date | undefined;
    // note?: string;
}


export default function F12_6Create() {
    const [fileData, setFileData] = useState<any[]>([]);
    const roomTypes = useQuery<IRoomType[]>({
        queryKey: [`roomTypesCreate`],
        queryFn: async () => {
            const response = await baseAxios.get("/roomType/getall");
            const result = response.data.data;
            return result
        },
    })
    const branchs = useQuery<IBranch[]>({
        queryKey: [`branchCreate`],
        queryFn: async () => {
            const response = await baseAxios.get("/branch/getall");
            const result = response.data.data;
            return result
        },
    })

    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            code: "",
            name: "",
            block: "",
            capacity: 0,
            testCapacity: 0,
            branchId: 0,
            roomTypeId: 0,
        },
        validate: {
            code: (value) => value
                ? /^[A-Za-z0-9][A-Za-z0-9-]+$/.test(value)
                    ? null
                    : "Chỉ được nhập ký tự thường, số , và dấu '-' "
                : "Không được để trống",
            name: (value) => value ? null : 'Không được để trống',
            // block: (value) => value ? null : 'Không được để trống',
            // capacity: (value) => value ? null : 'Không được để trống',
            // testCapacity: (value) => value ? null : 'Không được để trống',

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
    useEffect(() => {
        if (!roomTypes.data) {
            return
        }
        form.setFieldValue("roomTypeId", roomTypes.data?.[0]?.id)
    }, [roomTypes.data])
    useEffect(() => {
        if (!branchs.data) {
            return
        }
        form.setFieldValue("branchId", branchs.data?.[0]?.id)
    }, [branchs.data])
    return (
        <Group>
            <MyButtonCreate
                objectName='danh mục  phòng'
                form={form}
                onSubmit={
                    (value) => {
                        return baseAxios.post("/Address/create", value)
                    }
                }>
                <MyTextInput label="Mã phòng" {...form.getInputProps("code")} />
                <MyTextInput label="Tên phòng" {...form.getInputProps("name")} />
                {
                    branchs.data &&
                    <Select
                        clearable
                        placeholder='Chọn chi nhánh'
                        label='Chi nhánh'
                        data={branchs.data?.map((item) => ({
                            value: item.id?.toString()!,
                            label: item.name! == null ? "" : item.name!
                        }))}
                        value={form.values.branchId?.toString()}
                        defaultValue={branchs.data?.[0]?.id?.toString()}
                        onChange={(value: any) => form.setFieldValue("branchId", parseInt(value?.toString()!))}
                    />
                }
                <MyTextInput label="Dãy" {...form.getInputProps("block")} />
                <MyNumberInput label="Sức chứa học" {...form.getInputProps("capacity")} />
                <MyNumberInput label="Sức chứa thi" {...form.getInputProps("testCapacity")} />
                {roomTypes.data &&
                    <Select
                        clearable
                        placeholder='Chọn tính chất '
                        label='Tính chất '
                        data={roomTypes.data?.map((item) => ({
                            value: item.id?.toString()!,
                            label: item.name! == null ? "" : item.name!
                        }))}
                        value={form.values.roomTypeId?.toString()}
                        defaultValue={roomTypes.data?.[0]?.id?.toString()}
                        onChange={(value: any) => form.setFieldValue("roomTypeId", parseInt(value?.toString()!))}
                    />}
                <MyTextArea label="Ghi chú" {...form.getInputProps("note")}></MyTextArea>
            </MyButtonCreate>
        </Group>
    )
}

