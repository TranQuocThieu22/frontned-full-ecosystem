'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { useForm } from "@mantine/form";
import { I5_5_3ProjectAdjustment } from "./F5_5_3ReadProjectAdjustment";

export default function F5_5_3UpdateProjectAdjustment({ values }: { values: I5_5_3ProjectAdjustment }) {
    const form = useForm<I5_5_3ProjectAdjustment>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyFlexRow>
                <MySelect label="Đề tài" placeholder="Chọn đề tài" data={[]} />
                <MyTextInput label="Chủ nhiệm" defaultValue="Nguyễn Văn A" />
                <MyTextInput label="Thời gian thực hiện" defaultValue="11 tháng" />
            </MyFlexRow>
            <MyFlexRow>
                <MyDateInput label="Ngày báo cáo" {...form.getInputProps("time")} />
                <MyTextInput label="Đơn vị chủ trì" defaultValue="Khoa công nghệ thông tin" />
            </MyFlexRow>
            <MyTextArea label="Nội dung điều chỉnh" {...form.getInputProps("adjustContent")} />
            <MyTextInput label="Điều chỉnh về thời gian thực hiện" />
            <MyTextInput label="Điều chỉnh về chủ nhiệm đề tài" />
            <MyTextInput label="Điều chỉnh về nội dung đề tài" />
            <MyTextInput label="Điều chỉnh về tiến độ thực hiện" />
            <MyFileInput label="File điều chỉnh" />
        </MyActionIconUpdate>

    )
}