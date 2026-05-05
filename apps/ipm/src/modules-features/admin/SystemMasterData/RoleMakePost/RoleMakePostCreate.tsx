'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyTextInput } from "aq-fe-framework/components";
import { RoleMakePost } from "./RoleMakePostLayout";

export default function RoleMakePostCreate() {

	const form = useForm<RoleMakePost>({

	})

	return (
		<MyButtonCreate
			title="Tạo vai trò thực hiện bài đăng"
			form={form} onSubmit={() => { }}
		>
			<MyTextInput label="Mã vai trò" {...form.getInputProps("code")} />
			<MyTextInput label="Tên vai trò" {...form.getInputProps("name")} />
			<Textarea label="Ghi chú" {...form.getInputProps("notes")} />
			<Checkbox label="Ngừng sử dụng"/>
		</MyButtonCreate>
	)
}
