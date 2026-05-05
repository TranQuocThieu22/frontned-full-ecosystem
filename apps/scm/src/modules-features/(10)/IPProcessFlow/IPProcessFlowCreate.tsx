'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyDateInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { I_IPProcessFlow } from "./IPProcessFlowLayout";

export default function IPProcessFlowCreate() {

	const form = useForm<I_IPProcessFlow>({

	})

	return (
		<MyButtonCreate
			title="Tạo quy trình"
			modalSize="50%"
			form={form} onSubmit={() => { }}
		>
			<MyTextInput label="Mã quy trình" {...form.getInputProps("code")} />
			<MyTextInput label="Tên quy trình" {...form.getInputProps("name")} />
			<MultiSelect
				label="Loại SHTT"
				data={[
					"Bằng sáng chế",
					"Giải pháp hữu ích",
					"Kiểu dáng công nghiệp",
					"Nhãn hiệu",
					"Bản quyền tác giả",
					"Quyền liên quan đến quyền tác giả",
					"Chỉ dẫn địa lý",
					"Tên thương mại",
					"Bí mật kinh doanh"
				]}
				{...form.getInputProps("type")}
			/>
			<MyTextInput label="Phiên bản" {...form.getInputProps("version")} />
			<MyDateInput label="Ngày tạo" {...form.getInputProps("createdAt")} />
			<MyTextArea label="Mô tả" {...form.getInputProps("description")} />
		</MyButtonCreate>
	)
}
