'use client'
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { I6_4_2ProgressAndResultsReport } from "./F6_4_2ReadProgressAndResultsReport";

export default function F6_4_2UpdateProgressAndResultsReport({ values }: { values: I6_4_2ProgressAndResultsReport }) {
    const form = useForm<I6_4_2ProgressAndResultsReport>({
        initialValues: {
            id: 0,
            code: "",
            topicName: "",
            groupName: "",
            leaderName: "",
            time: "",
            percentageComplete: "",
            expenditures: 0
        }
    })
    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyFlexRow>
                <MySelect label="Đề tài" data={['Chọn đề tài']} {...form.getInputProps("code")} />
                <MyTextInput label="Tên nhóm nghiên cứu" defaultValue="Nhóm A KHTN" />
                <MyTextInput label="Trưởng nhóm" defaultValue="Nguyễn Văn A" />
            </MyFlexRow>
            <MyFlexRow>
                <MyDateInput label="Ngày báo cáo" placeholder="  /   /" />
                <MyTextInput label="Đơn vị chủ trì" placeholder="....." />
                <MyTextInput label="Thời gian thực hiện" placeholder="....." {...form.getInputProps("time")} />
            </MyFlexRow>
            <MyFlexRow>
                <MyTextInput label="Kinh phí được cấp" />
                <MyTextInput label="% đã hoàn thành" {...form.getInputProps("percentageComplete")} />
            </MyFlexRow>
            <MyFlexRow>
                <MyTextInput label="Kinh phí đã quyết đoán" />
                <MyTextInput label="Kinh phí đã chi" {...form.getInputProps("expenditures")} />
            </MyFlexRow>
            <MyTextInput label="Kiến nghị" />
            <MyTextArea label="Kế hoạch tiếp theo" />
            <MyFileInput label="File báo cáo" />
        </MyActionIconUpdate>
    )
}
