"use client"
import baseAxios from '@/api/config/baseAxios'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate'
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput'
import { Group, NumberInput, Select, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface ICourseModuleViewModel {
    id?: number;
    code?: string;
    name?: string;
    roomTypeId?: number;
    roomType?: IRoomType;
    classPeriodNumber?: number;
    hours?: number;
    note?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
interface IRoomType {
    id: number;
    note?: string;
    name?: string;
    code?: string;
}
//FIXME: ĐỢI API ANH LÂM 
export default function F3_1CreateCourseModule() {
    const roomTypes = useQuery<IRoomType[]>({
        queryKey: [`roomTypesCreate`],
        queryFn: async () => {
            const response = await baseAxios.get("/roomType/getall");
            const result = response.data.data;
            return result
        },
    })
    const [fileData, setFileData] = useState<any[]>([]);
    const form = useForm<ICourseModuleViewModel>({
        initialValues: {
            code: "",
            name: "",
            classPeriodNumber: 0,
            hours: 0,
            roomTypeId: 0

        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            // classPeriodNumber: (value) => value ? null : 'Không được để trống',
            // hours: (value) => value == 0 ? null : 'Không được để trống',
            roomTypeId: (value) => value ? null : 'Không được để trống',

        }
        // validate: {
        //     code: isNotEmpty("Không được để trống"),
        //     name: isNotEmpty("Không được để trống"),
        //     totalLecture: isNotEmpty("Không được để trống"),
        //     totalHour: isNotEmpty("Không được để trống"),
        //     roomPropertyId: isNotEmpty("Không được để trống"),
        // }
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
    return (
        <Group>
            <MyButtonCreate
                modalSize={"lg"}
                objectName='môn học'
                form={form}
                onSubmit={
                    (value) => {
                        console.log("thêm thành công: ", value);
                        return baseAxios.post("/subject/create", value)
                    }
                }>
                <MyTextInput label="Mã môn học" {...form.getInputProps("code")} />
                <MyTextInput label="Tên môn học" {...form.getInputProps("name")} />
                <NumberInput
                    label="Số tiết"
                    placeholder="Nhập số tiết học"
                    {...form.getInputProps("classPeriodNumber")}
                />
                <NumberInput
                    label="Số giờ"
                    placeholder="Nhập số giờ"
                    {...form.getInputProps("hours")}
                />
                {roomTypes.data &&
                    <Select
                        // clearable
                        placeholder='Chọn tính chất phòng'
                        label='Tính chất phòng'
                        data={roomTypes.data?.map((item) => ({
                            value: item.id?.toString()!,
                            label: item.name! == null ? "" : item.name!
                        }))}
                        {...form.getInputProps("roomTypeId")}
                        value={form.values.roomTypeId?.toString()}
                        defaultValue={roomTypes.data?.[0]?.id?.toString()}
                        onChange={(value: any) => form.setFieldValue("roomTypeId", parseInt(value?.toString()!))}
                    />
                }
                <Textarea
                    label="Ghi chú"
                    placeholder="Nhập ghi chú"
                    minRows={4}
                    {...form.getInputProps("note")}
                />

            </MyButtonCreate>
        </Group>
    )
}

