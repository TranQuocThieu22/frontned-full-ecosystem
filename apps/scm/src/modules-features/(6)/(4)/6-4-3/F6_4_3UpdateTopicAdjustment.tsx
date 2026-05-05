'use client'
import MySelect from "@/components/Combobox/Select/MySelect";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { useForm } from "@mantine/form";


import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { I6_4_3TopicAdjustment } from "./F6_4_3ReadTopicAdjustment";

export default function F6_4_3UpdateTopicAdjustment({ values }: { values: I6_4_3TopicAdjustment }) {
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
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyFlexRow>
                <MySelect label="Đề tài" data={['Chọn đề tài']} />
                <MyTextInput label="Tên nhóm nghiên cứu" defaultValue="Nhóm A KHTN" />
                <MyTextInput label="Trưởng nhóm " defaultValue="Nguyễn Văn A" />
            </MyFlexRow>
            <MyFlexRow>
                <MyDateInput label="Ngày gửi điều chỉnh" placeholder="  /   /" />
                <MyTextInput label="Đơn vị chủ trì " defaultValue="..." />
                <MyTextInput label="Thời gian thực hiện " defaultValue="..." />
            </MyFlexRow>
            <MyTextArea label="Nội dung điều chỉnh " />
            <MyTextInput label="Điều chỉnh về thời gian thực hiện " />
            <MyTextInput label="Điều chỉnh về chủ nghiệm đề tài " />
            <MyTextInput label="Điều chỉnh về nội dung đề tài " />
            <MyTextInput label="Điều chỉnh về tiến độ thực hiện" />
            <MyFileInput label="File biên bản" />
        </MyActionIconUpdate>
    )
}

