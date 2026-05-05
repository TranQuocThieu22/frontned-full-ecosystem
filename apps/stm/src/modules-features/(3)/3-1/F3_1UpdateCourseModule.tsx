import baseAxios from "@/api/config/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { NumberInput, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";

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
export default function F3_1UpdateCourseModule({ courseModuleValues }: { courseModuleValues: ICourseModuleViewModel }) {
    const roomTypes = useQuery<IRoomType[]>({
        queryKey: [`roomTypesUpdate`],
        queryFn: async () => {
            const response = await baseAxios.get("/roomType/getall");
            const result = response.data.data;
            console.log(result);

            return result
        },
    })
    const form = useForm<ICourseModuleViewModel>({
        initialValues: {
            ...courseModuleValues,
            note: ""
        },
    })


    return (
        <MyActionIconUpdate modalSize={"lg"}
            form={form}
            onSubmit={async (value) => {
                console.log("chỉnh sửa thành công: ", form.values);
                return baseAxios.post("/subject/update", value)

            }}
        >
            <MyTextInput disabled label="Mã môn học" {...form.getInputProps("code")} />
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
                    clearable
                    placeholder='Chọn tính chất phòng'
                    label='Tính chất phòng'
                    data={roomTypes.data?.map((item) => ({
                        value: item.id?.toString()!,
                        label: item.name!
                    }))}
                    value={form.values.roomTypeId?.toString()}
                    defaultValue={form.values.roomTypeId?.toString()}
                    onChange={(value: any) => form.setFieldValue("roomTypeId", parseInt(value?.toString()!))}
                />}
            <Textarea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                minRows={4}
                {...form.getInputProps("note")}
            />
        </MyActionIconUpdate>

    )
}