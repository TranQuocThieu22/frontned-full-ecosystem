'use client'
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyTextInput } from "aq-fe-framework/components";
import { I_ProcedureStep } from "./ProcedureStepUpdateButton";

export default function ProcedureStepUpdate({ values }: { values: I_ProcedureStep }) {
    const form = useForm<I_ProcedureStep>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate
            title="Cập nhật bước"
            form={form}
            onSubmit={() => { }}
            modalSize="50%"
        >
            <MyTextInput label="Mã bước" {...form.getInputProps("code")} />
            <MyTextInput label="Tên bước" {...form.getInputProps("name")} />
            <MyTextInput label="Mô tả công việc" {...form.getInputProps("description")} />
            <MyTextInput label="Thời gian dự kiến" {...form.getInputProps("estimatedTime")}/>
            <MyTextInput label="Vai trò phụ trách" {...form.getInputProps("role")} />
            <MyTextInput label="Điều kiện hoàn thành" {...form.getInputProps("completionCondition")} />
            <MyTextInput label="Tài liệu cần" {...form.getInputProps("generatedDocument")} />
        </MyActionIconUpdate>
    )
}
