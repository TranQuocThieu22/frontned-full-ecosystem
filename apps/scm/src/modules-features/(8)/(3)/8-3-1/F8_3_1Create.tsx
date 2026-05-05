'use client'
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, Fieldset } from "@mantine/core";

export default function F8_3_1Create() {
    return (
        <Fieldset legend="Thông báo giảng viên viết bài tham dự hội thảo">
            <MyFlexColumn>
                <MyTextInput label="Tiêu đề thông báo" />
                <MyTextInput label="Danh sách người nhận" placeholder="Danh sách đối tượng cần thông báo" />
                <MyTextArea label="Nội dung thông báo" />
                <MyFileInput label="Đính kèm file minh chứng" />
                <Button>Gửi thông báo</Button>
            </MyFlexColumn>

        </Fieldset>
    )
}