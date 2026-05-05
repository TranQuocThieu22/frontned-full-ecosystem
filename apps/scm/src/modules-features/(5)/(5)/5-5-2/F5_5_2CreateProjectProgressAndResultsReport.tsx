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
import { IF5_5_2ProjectProgressAndResultsReport } from "./F5_5_2ReadProjectProgressAndResultsReport";

export default function F5_5_2CreateProjectProgressAndResultsReport() {
    const form = useForm<IF5_5_2ProjectProgressAndResultsReport>({
        initialValues: {
            id: 0,
            code: "",
            topicName: "",
            leaderName: "",
            time: 0,
            percentComplete: "",
            expenses: 0,
        }
    })
    return (
        <MyButtonCreate objectName="Phiếu báo cáo tiến độ và kết quả thực hiện đề tài" onSubmit={() => { }} modalSize={"100%"} form={form} >
            <MyFlexRow>
                <MySelect label="Đề tài" placeholder="Chọn đề tài" data={[]} />
                <MyTextInput label="Chủ nhiệm" defaultValue="Nguyễn Văn A" />
                <MyTextInput label="Thời gian thực hiện" defaultValue="11 tháng" />
            </MyFlexRow>
            <MyFlexRow>
                <MyDateInput label="Ngày báo cáo" />
                <MyTextInput label="Đơn vị chủ trì" defaultValue="Khoa Công Nghệ Thông Tin" />
            </MyFlexRow>
            <MyFlexRow>
                <MyNumberInput label="Kinh phí được cấp" />
                <MyTextInput label="% hoàn thành" />
            </MyFlexRow>
            <MyTextInput label="Kiến nghị" />
            <MyTextArea label="Kế hoạch tiếp theo" />
            <MyFileInput label="File báo cáo" />
        </MyButtonCreate>
    )
}