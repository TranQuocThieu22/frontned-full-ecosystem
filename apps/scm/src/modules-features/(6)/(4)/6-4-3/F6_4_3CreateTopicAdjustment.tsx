'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { useForm } from "@mantine/form";

import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { I6_4_3TopicAdjustment } from "./F6_4_3ReadTopicAdjustment";

export default function F6_4_3CreateTopicAdjustment() {
    const form = useForm<I6_4_3TopicAdjustment>({
        initialValues: {
            code: "",
            topicName: "",
            groupName: "",
            leaderName: "",
            time: "",
            percentageComplete: "",
            contentAdjustment: "",
            leaderAdjustment: "",
            timeAdjustment: "",
            progressAdjustment: ""
        }
    })
    return (
        <MyButtonCreate objectName="Báo cáo tiến độ và kết quả thực hiện đề tài" form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyFlexRow>
                <MySelect label="Đề tài" data={['Chọn đề tài']} style={{ width: "30%" }} />
                <MyTextInput label="Tên nhóm nghiên cứu" defaultValue="Nhóm A KHTN" style={{ width: "30%" }} />
                <MyTextInput label="Trưởng nhóm " defaultValue="Nguyễn Văn A" style={{ width: "30%" }} />
            </MyFlexRow>
            <MyFlexRow>
                <MyDateInput label="Ngày gửi điều chỉnh" placeholder="  /   /" style={{ width: "30%" }} />
                <MyTextInput label="Đơn vị chủ trì " defaultValue="..." style={{ width: "30%" }} />
                <MyTextInput label="Thời gian thực hiện " defaultValue="..." style={{ width: "30%" }} />
            </MyFlexRow>
            <MyTextArea label="Nội dung điều chỉnh " />
            <MyTextInput label="Điều chỉnh về thời gian thực hiện " />
            <MyTextInput label="Điều chỉnh về chủ nghiệm đề tài " />
            <MyTextInput label="Điều chỉnh về nội dung đề tài " />
            <MyTextInput label="Điều chỉnh về tiến độ thực hiện" />
            <MyFileInput label="File biên bản" />
        </MyButtonCreate>
    )
}

