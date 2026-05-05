'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IProjectMonitoringResultsSummary } from "./F5_5_5ReadProjectMonitoringResultsSummary";

export default function F5_5_5UpdateProjectMonitoringResultsSummary({ values }: { values: IProjectMonitoringResultsSummary }) {
    const form = useForm<IProjectMonitoringResultsSummary>({
        initialValues: {
            ...values,
        }
    });
    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <h3>Chỉnh sửa thông tin</h3>
            <MyTextInput label="Mã đề tài" {...form.getInputProps("code")} />
            <MyTextInput label="Tên đề tài" {...form.getInputProps("topicName")} />
            <MyTextInput label="Chủ nhiệm" {...form.getInputProps("leaderName")} />
            <MyTextInput label="Số điện thoại chủ nhiệm" {...form.getInputProps("leaderTel")} />
            <MyTextInput label="Thời gian bắt đầu" {...form.getInputProps("beginTime")} />
            <MyTextInput label="Thời gian kết thúc" {...form.getInputProps("endTime")} />
            <MyNumberInput label="Kinh phí" {...form.getInputProps("expense")} />
            <MyTextInput label="Trạng thái báo cáo" {...form.getInputProps("statusReport")} />
            <Checkbox label="Đến ngày báo cáo" />
            <MyTextInput label="Duyệt" {...form.getInputProps("vote")} />
            <MyTextInput label="Nhận xét" {...form.getInputProps("comment")} />
            <MyTextInput label="Trạng thái thực hiện" {...form.getInputProps("statusAct")} />
        </MyActionIconUpdate>

    )
}