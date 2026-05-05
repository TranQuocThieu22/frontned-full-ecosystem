'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { useForm } from "@mantine/form";
import { I5_5_3ProjectAdjustment } from "./F5_5_3ReadProjectAdjustment";

export default function F5_5_3CreateProjectAdjustment() {
    const form = useForm<I5_5_3ProjectAdjustment>({
        initialValues: {
            id: 0,
            code: "",
            topicName: "",
            leaderName: "",
            time: "",
            percentComplete: 0,
            adjustContent: "",
            adjustLeader: "",
            adjustTime: "",
            adjustProcess: "",
        }
    })

    return (
        <MyButtonCreate objectName="Báo cáo tiến độ và kết quả thực hiện đề tài" form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyFlexRow>
                <MySelect label="Đề tài" placeholder="Chọn đề tài" data={[]} />
                <MyTextInput label="Chủ nhiệm" defaultValue="Nguyễn Văn A" />
                <MyTextInput label="Thời gian thực hiện" defaultValue="11 tháng" />
            </MyFlexRow>
            <MyFlexRow>
                <MyDateInput label="Ngày báo cáo" />
                <MyTextInput label="Đơn vị chủ trì" defaultValue="Khoa công nghệ thông tin" />
            </MyFlexRow>
            <MyTextArea label="Nội dung điều chỉnh" />
            <MyTextInput label="Điều chỉnh về thời gian thực hiện" />
            <MyTextInput label="Điều chỉnh về chủ nhiệm đề tài" />
            <MyTextInput label="Điều chỉnh về nội dung đề tài" />
            <MyTextInput label="Điều chỉnh về tiến độ thực hiện" />
            <MyFileInput label="File điều chỉnh" />
        </MyButtonCreate>

    )
}