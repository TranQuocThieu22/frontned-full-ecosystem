'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyNumberInput, MyTextInput } from "aq-fe-framework/components";
import { OtherScientificTypesResearch } from "./OtherScientificTypesResearchLayout";

export default function OtherScientificTypesResearchCreate() {

	const form = useForm<OtherScientificTypesResearch>({

	})

	return (
		<MyButtonCreate
			title="Tạo loại nhiệm vụ NCKH khác"
			form={form} onSubmit={() => { }}
		>
			<MyTextInput label="Mã loại nhiệm vụ" {...form.getInputProps("code")} />
			<MyTextInput label="Tên loại nhiệm vụ" {...form.getInputProps("name")} />
			<MyNumberInput label="Số giờ/ trang" {...form.getInputProps("hours")} />
			<MyNumberInput label="Số điểm" {...form.getInputProps("score")} />
			<Checkbox label="Tự kê khai"/>
			<Textarea label="Ghi chú" {...form.getInputProps("notes")} />
			<Checkbox label="Ngừng sử dụng"/>
		</MyButtonCreate>
	)
}
