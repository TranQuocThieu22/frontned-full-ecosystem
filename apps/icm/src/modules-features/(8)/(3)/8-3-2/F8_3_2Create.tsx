'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { Button, Checkbox, Radio } from '@mantine/core';
import { useForm } from "@mantine/form";
import { IF8_3_2ListOfAttendees } from "./F8_3_2Read";
export default function IF8_3_2Create() {
    const form = useForm<IF8_3_2ListOfAttendees>({
        initialValues: {
            id: 0,
            code: "",
            name: "",
            hocHamHocVi: "",
            donViCongTac: "",

        }
    })
    return (
        <>
            <MyButtonCreate objectName="Thông báo giảng viên viết bài/ tham dự hội thảo" onSubmit={() => { }} modalSize={"100%"} form={form}  >
                <Radio.Group
                    label="Lựa chọn"
                    withAsterisk
                // Tạo bố cục ngang
                >
                    <MyFlexRow>
                        <Radio value="instructor" label="Giảng viên trong trường" />
                        <Radio value="representative" label="Đại biểu ngoài trường" />
                    </MyFlexRow>

                </Radio.Group>
                <MyTextInput label="Họ và tên" />
                <MyTextInput label="Học hàm - Học vị" />
                <MyTextInput label="Đơn vị cộng tác" />
                <Checkbox label="Có bài viết tham dự" />
                <MyFileInput label="Đính kèm file tóm tắt/ bài viết" />
            </MyButtonCreate>
            <Button>Import</Button>
        </>

    )
}