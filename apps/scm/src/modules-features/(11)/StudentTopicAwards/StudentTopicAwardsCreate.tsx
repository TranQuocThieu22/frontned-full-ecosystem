'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyNumberInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { StudentTopicAward } from "./StudentTopicAwardsLayout";

export default function StudentTopicAwardsCreate() {

	const form = useForm<StudentTopicAward>({

	})

	return (
		<MyButtonCreate
			title="Tạo loại giải thưởng đề tài sinh viên"
			form={form} onSubmit={() => { }}
		>
			<MyTextInput label="Mã loại giải thưởng" {...form.getInputProps("code")} />
			<MyTextInput label="Tên loại giải thưởng" {...form.getInputProps("name")} />
			<MySelect defaultValue={"1 - Giải nhất"} data={["1 - Giải nhất", "2 - Giải nhì", "3 - Giải ba", "4 - Giải khuyến khích"]} label="Xếp hạng" {...form.getInputProps("rating")} />
			<MyNumberInput label="Số giờ" {...form.getInputProps("hours")} />
			<MyNumberInput label="Số điểm" {...form.getInputProps("score")} />
			<Textarea label="Ghi chú" {...form.getInputProps("notes")} />
			<Checkbox label="Ngừng sử dụng" />
		</MyButtonCreate>
	)
}
