'use client'

import MyButtonRegister from "@/components/Buttons/ButtonCRUD/MyButtonRegister"
import MySelect from "@/components/Combobox/Select/MySelect"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow"
import { useForm } from "@mantine/form"
import { IResearchGroupTopicRegistration } from "./F6_2_1ReadResearchGroupTopicRegistration"

export default function F6_2_1RegisterResearchGroupTopicRegistration() {
    const form = useForm<IResearchGroupTopicRegistration>({
        initialValues: {
            code: "",
            topicName: "",
            field: "",
            groupName: "",
            leaderName: "",
            telephone: "",
            email: "",
            expense: 0,
            time: ""
        }
    })

    return (

        <MyButtonRegister objectName="" form={form} onSubmit={() => { }} modalSize={"100%"} >
            <MyTextInput label="Mã đề tài" />
            <MyTextInput label="Tên đề tài" />
            <MySelect label="Nhóm nghiên cứu" placeholder="Chọn chủ nhiệm" data={[]} />
            <MyFlexRow>
                <MyTextInput label="Họ tên Trưởng nhóm" defaultValue="Nguyễn Văn A" />
                <MyTextInput label="Số điện thoại" defaultValue="0986853845" />
                <MyTextInput label="Email" defaultValue="A@gmail.com" />
            </MyFlexRow>
            <MyTextInput label="Thời gian thực hiện" />
            <MyTextInput label="Hướng nghiên cứu" />
            <MyTextInput label="Phạm vi nghiên cứu" />
            <MyTextInput label="Mục tiêu nghiên cứu" />
            <MyTextInput label="Hướng ứng dụng" />
            <MyNumberInput label="Kinh phí dự kiến" />
            <MyFlexRow>
                <MySelect label="Lĩnh vực nghiên cứu" placeholder="Chọn lĩnh vực" data={[]} />
                <MySelect label="Loại hình nghiên cứu" placeholder="Chọn loại hình" data={[]} />
            </MyFlexRow>
            <MyFileInput label="Đính kèm file minh chứng" />
        </MyButtonRegister>
    )
}