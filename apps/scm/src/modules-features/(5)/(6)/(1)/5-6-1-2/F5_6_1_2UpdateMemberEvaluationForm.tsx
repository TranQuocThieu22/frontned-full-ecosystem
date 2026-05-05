'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { useForm } from "@mantine/form";
import { I5_6_1_2MemberEvaluationForm } from "./F5_6_1_2ReadMemberEvaluationForm";


export default function F5_5_3UpdateProjectAdjustment({ values }: { values: I5_6_1_2MemberEvaluationForm }) {
    const form = useForm<I5_6_1_2MemberEvaluationForm>({
        initialValues: {
            ...values,
        },
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyFlexRow>
                <MySelect label="Đề tài" placeholder="Chọn đề tài" data={[]} />
                <MyTextInput label="Chủ nhiệm" defaultValue="Nguyễn Văn A" />
                <MyTextInput label="Học hàm - học vị" defaultValue="Tiến sĩ" />
            </MyFlexRow>
            <MyFlexRow>
                <MyTextInput label="Họ tên người đánh giá"  {...form.getInputProps("reviewer")} />
                <MyDateInput label="Ngày đánh giá" />
            </MyFlexRow>
            <MyNumberInput label="Tổng điểm" {...form.getInputProps("point")} />
            <MyFileInput label="File đánh giá" />
            <MyTextArea label="Ý kiến khác" />


        </MyActionIconUpdate>

    )
}