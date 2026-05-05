'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { useForm } from "@mantine/form";
import { MyTextInput } from "aq-fe-framework/components";
import { Partner } from "./PartnerLayout";

export default function PartnerCreate() {

	const form = useForm<Partner>({

	})

	return (
		<MyButtonCreate
			modalSize="50%"
			title="Tạo đối tác"
			form={form} onSubmit={() => { }}
		>
			<MyTextInput label="Mã đối tác" {...form.getInputProps("code")} />
			<MyTextInput label="Tên đối tác" {...form.getInputProps("name")} />
			<MySelect
				defaultValue={"Trường đại học"}
				data={["Trường đại học", "Doanh nghiệp"]}
				label="Loại hình đối tác"
				{...form.getInputProps("type")}
			/>
			<MyTextInput label="Quốc gia" {...form.getInputProps("region")} />
			<MySelect
				defaultValue={"Y sinh"}
				data={["Y sinh", "Công nghệ thông tin", "Năng lượng tái tạo"]}
				label="Lĩnh vực hợp tác"
				{...form.getInputProps("cooperationType")}
			/>
			<MyTextInput label="Thông tin liên hệ" {...form.getInputProps("contactInfo")} />
			<MyTextArea label="Ghi chú" {...form.getInputProps("notes")} />
		</MyButtonCreate>
	)
}
