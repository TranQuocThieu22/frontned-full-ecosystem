'use client'
import MySelect from "@/components/Combobox/Select/MySelect";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { useForm } from "@mantine/form";

import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { I6_5_1_2MemberScoringCard } from "./F6_5_1_2ReadMemberScoringCard";

export default function F6_5_1_2UpdateMemberScoringCard({ values }: { values: I6_5_1_2MemberScoringCard }) {
    const form = useForm<I6_5_1_2MemberScoringCard>({
        initialValues: {
            code: "",
            topicName: "",
            groupName: "",
            leaderName: "",
            reviewer: "",
            dateReview: "",
            point: 0,
            comment: ""
        }
    })
    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyFlexRow>
                <MySelect label="Đề tài" data={['Chọn đề tài thuộc hội đồng nghiệm thu']} style={{ width: "30%" }} />
                <MyTextInput label="Tên nhóm nghiên cứu" defaultValue="Nhóm A KHTN" style={{ width: "30%" }} />
                <MyTextInput label="Trưởng nhóm " defaultValue="Nguyễn Văn A" style={{ width: "30%" }} />
            </MyFlexRow>
            <MyFlexRow>
                <MyDateInput label="Họ tên người đánh giá" placeholder="  /   /" style={{ width: "30%" }} />
                <MyTextInput label="Ngày đánh giá " defaultValue="..." style={{ width: "30%" }} />
                <MyTextInput label="Tổng điểm" defaultValue="..." style={{ width: "30%" }} />
            </MyFlexRow>
            <MyTextInput label="Tổng điểm" />
            <MyTextArea label="Nội dung điều chỉnh " />
            <MyFileInput label="File đánh giá" />
        </MyActionIconUpdate>
    )
}

