'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { useForm } from "@mantine/form";
import { IF5_5_2ProjectProgressAndResultsReport } from "./F5_5_2ReadProjectProgressAndResultsReport";

export default function F5_5_2UpdateProjectProgressAndResultsReport({ values }: { values: IF5_5_2ProjectProgressAndResultsReport }) {
    const form = useForm<IF5_5_2ProjectProgressAndResultsReport>({
        initialValues: {
            ...values,
        }
    });
    return (
        <MyActionIconUpdate onSubmit={() => { }} modalSize={"100%"} form={form} >
            <MyFlexRow>
                <MySelect label="Đề tài" placeholder="Chọn đề tài" data={[]} />
                <MyTextInput label="Chủ nhiệm" defaultValue="Nguyễn Văn A" />
                <MyTextInput label="Thời gian thực hiện" defaultValue="11 tháng" />
            </MyFlexRow>
            <MyFlexRow>
                <MyNumberInput label="Ngày báo cáo" {...form.getInputProps("time")} />
                <MyTextInput label="Đơn vị chủ trì" defaultValue="Khoa Công Nghệ Thông Tin" />
            </MyFlexRow>
            <MyFlexRow>
                <MyNumberInput label="Kinh phí được cấp" {...form.getInputProps("expenses")} />
                <MyTextInput label="% hoàn thành" {...form.getInputProps("percentComplete")} />
            </MyFlexRow>
            <MyTextInput label="Kiến nghị" />
            <MyTextArea label="Kế hoạch tiếp theo" />
            <MyFileInput label="File báo cáo" />
        </MyActionIconUpdate>
    )
}