'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyTextInput } from "aq-fe-framework/components";
import { RoleImplementTopic } from "./RoleImplementTopicLayout";

export default function RoleImplementTopicCreate() {

	const form = useForm<RoleImplementTopic>({

	})

	return (
		<MyButtonCreate
			title="Tạo vai trò thực hiện đề tài"
			form={form} onSubmit={() => { }}
		>
			<MyTextInput label="Mã vai trò" {...form.getInputProps("code")} />
			<MyTextInput label="Tên vai trò" {...form.getInputProps("name")} />
			<Textarea label="Ghi chú" {...form.getInputProps("notes")} />
			<Checkbox label="Ngừng sử dụng"/>
		</MyButtonCreate>
	)
}
