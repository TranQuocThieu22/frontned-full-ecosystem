'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { useForm } from "@mantine/form";
import { I5_6_1_2MemberEvaluationForm } from "./F5_6_1_2ReadMemberEvaluationForm";


export default function F5_5_3CreateProjectAdjustment() {
    const form = useForm<I5_6_1_2MemberEvaluationForm>({
        initialValues: {
            id: 0,
            code: "",
            topicName: "",
            leaderName: "",
            reviewer: "",
            dateReview: "",
            point: 0,
            comment: "",
        },
    })

    return (
        <MyButtonCreate objectName="Phiếu chấm điểm đề tài nghiên cứu khoa học cấp trường" form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyFlexRow>
                <MySelect label="Đề tài" placeholder="Chọn đề tài" data={[]} />
                <MyTextInput label="Chủ nhiệm" defaultValue="Nguyễn Văn A" />
                <MyTextInput label="Học hàm - học vị" defaultValue="Tiến sĩ" />
            </MyFlexRow>
            <MyFlexRow>
                <MyTextInput label="Họ tên người đánh giá" />
                <MyDateInput label="Ngày đánh giá" />
            </MyFlexRow>
            <MyNumberInput label="Tổng điểm" />
            <MyFileInput label="File đánh giá" />
            <MyTextArea label="Ý kiến khác" />


        </MyButtonCreate>

    )
}