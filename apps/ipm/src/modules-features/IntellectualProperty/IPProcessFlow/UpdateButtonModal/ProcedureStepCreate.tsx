'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { useForm } from "@mantine/form";
import { MyTextInput } from "aq-fe-framework/components";
import { I_ProcedureStep } from "./ProcedureStepUpdateButton";

export default function ProcedureStepCreate() {

	const form = useForm<I_ProcedureStep>({

	})

	return (
		<MyButtonCreate
			title="Tạo bước"
			modalSize="50%"
			form={form} onSubmit={() => { }}
		>
			<MyTextInput label="Mã bước" {...form.getInputProps("code")} />
            <MyTextInput label="Tên bước" {...form.getInputProps("name")} />
            <MyTextInput label="Mô tả công việc" {...form.getInputProps("description")} />
            <MyTextInput label="Thời gian dự kiến" {...form.getInputProps("estimatedTime")} />
            <MyTextInput label="Vai trò phụ trách" {...form.getInputProps("role")} />
            <MyTextInput label="Điều kiện hoàn thành" {...form.getInputProps("completionCondition")} />
            <MyTextInput label="Tài liệu cần" {...form.getInputProps("generatedDocument")} />
		</MyButtonCreate>
	)
}
