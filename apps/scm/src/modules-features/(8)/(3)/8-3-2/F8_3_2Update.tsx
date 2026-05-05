import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Checkbox, Radio } from '@mantine/core';
import { useForm } from "@mantine/form";
import { IF8_3_2ListOfAttendees } from "./F8_3_2Read";
export default function IF8_3_2Create({ values }: { values: IF8_3_2ListOfAttendees }) {
    const form = useForm<IF8_3_2ListOfAttendees>({
        initialValues: {
            ...values
        }
    })
    return (
        <MyActionIconUpdate onSubmit={() => { }} modalSize={"100%"} form={form}  >
            <Radio.Group
                label="Lựa chọn"
                withAsterisk
            // Tạo bố cục ngang
            >
                <Radio value="instructor" label="Giảng viên trong trường" />
                <Radio value="representative" label="Đại biểu ngoài trường" />
            </Radio.Group>
            <MyTextInput label="Họ và tên" {...form.getInputProps("name")} />
            <MyTextInput label="Học hàm - Học vị" {...form.getInputProps("hocHamHocVi")} />
            <MyTextInput label="Đơn vị cộng tác" {...form.getInputProps("donViCongTac")} />
            <Checkbox label="Có bài viết tham dự" />
            <MyFileInput label="Đính kèm file tóm tắt/ bài viết" />
        </MyActionIconUpdate>
    )
}